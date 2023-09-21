from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework.decorators import APIView
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (Profile,
                     ActivationCode)
from .permission import IsOwnerProfileOrReadOnly
from .serializers import UserProfileSerializer
from .scripts import (generate_activation_code,
                      send_email)

User = get_user_model()


class UserProfileListCreateView(ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsOwnerProfileOrReadOnly, IsAuthenticated]


class UserActivationAPIView(APIView):
    """
    Проверка кода активации, введенного пользователем.
    param1: username - логин пользователя
    param2: activ_code - код активации
    return: статус запроса, словарь с результатами проверки кода активации
    """

    def check_code(self, user_object, entered_code_value):
        activation_code_value = user_object.activ_code.code
        date_code_created = user_object.activ_code.datetime_created
        time_diff = timezone.now() - date_code_created
        context = {
            'code_is_correct': True,
            'code_not_expired': False,
            'code_releases_exceeded': False,
        }

        if entered_code_value == activation_code_value:
            expiration_time = 24 * 3600  # 24 hours

            # code is correct, not expired
            if time_diff.total_seconds() < expiration_time:
                context['code_not_expired'] = True
                return context

            code_generated_times = user_object.activ_code.code_generated_num
            # code is correct, expired, can release code again
            if code_generated_times < 3:
                return context

            # code releases exceeded
            context['code_releases_exceeded'] = True
            return context

        # code is incorrect
        context['code_is_correct'] = False
        return context

    def post(self, request):
        user_object = get_object_or_404(User.objects.select_related(), username=request.data.get('username'))
        check_result = self.check_code(user_object, entered_code_value=request.data.get('activ_code'))

        if check_result['code_is_correct']:
            if not check_result['code_not_expired']:
                # code is correct, expired, code releases exceed -> delete user
                if check_result['code_releases_exceeded']:
                    user_object.delete()
                    check_result.clear()
                    check_result['message'] = 'User deleted'
                    return Response(check_result, status=status.HTTP_400_BAD_REQUEST)

                # code is correct, expired, code releases not exceeded -> renew activation code
                activ_code_object = user_object.activ_code
                new_code = generate_activation_code()
                activ_code_object.code = new_code
                send_email(user_object, new_code)
                activ_code_object.code_generated_num += 1
                activ_code_object.save()
                check_result.clear()
                check_result['message'] = 'Activation code reissued'
                return Response(check_result, status=status.HTTP_400_BAD_REQUEST)

            # code is correct, not expired -> activate user
            user_object.is_active = True
            user_object.save()
            activ_code_object = user_object.activ_code
            activ_code_object.delete()
            check_result.clear()
            check_result['message'] = 'User activated'
            return Response(check_result, status=status.HTTP_200_OK)

        # code is incorrect
        check_result.clear()
        check_result['message'] = 'Code is incorrect'
        return Response(check_result, status=status.HTTP_400_BAD_REQUEST)
