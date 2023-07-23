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

    # permission_classes = [IsAuthenticated]
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

    def check_code(self, user_pk, entered_code_value):
        user_related_object = User.objects.select_related('activ_code').get(id=user_pk)
        activation_code_pk = user_related_object.activ_code.pk
        activation_code_value = user_related_object.activ_code.code
        date_code_created = user_related_object.activ_code.datetime_created
        time_diff = timezone.now() - date_code_created

        if entered_code_value == activation_code_value:
            expiration_time = 24 * 3600  # 24 hours

            # code is correct, not expired
            if time_diff.total_seconds() < expiration_time:
                context = {
                    'message': 'Code is correct',
                    'activation_code_pk': activation_code_pk,
                }
                return context

            # code is correct, expired
            code_generated_times = user_related_object.activ_code.code_generated_num

            # can release code again
            if code_generated_times < 3:
                context = {
                    'message': 'Code is expired',
                    'activation_code_pk': activation_code_pk,
                }
                return context

            # code releases exceeded
            context = {
                'message': 'Code releases exceeded',
            }
            return context

        # code is incorrect
        context = {
            'message': 'Code is incorrect',
        }
        return context

    def patch(self, request):
        user_object = get_object_or_404(User, username=request.data.get('username'))
        check_result = self.check_code(user_pk=user_object.pk, entered_code_value=request.data.get('activ_code'))

        # code is correct
        if check_result['message'] == 'Code is correct':
            user_object.is_active = True
            user_object.save()
            activ_code_object = ActivationCode.objects.get(pk=check_result['activation_code_pk'])
            activ_code_object.delete()
            check_result['message'] += '. User activated'
            return Response(check_result, status=status.HTTP_200_OK)

        # code is expired, renew activation code
        elif check_result['message'] == 'Code is expired':
            activ_code_object = ActivationCode.objects.get(pk=check_result['activation_code_pk'])
            new_code = generate_activation_code()
            activ_code_object.code = new_code
            send_email(user_object, new_code)
            activ_code_object.code_generated_num += 1
            activ_code_object.save()
            check_result['message'] += '. Reissued.'
            return Response(check_result, status=status.HTTP_400_BAD_REQUEST)

        # code releases exceed, delete user
        elif check_result['message'] == 'Code releases exceeded':
            user_object.delete()
            check_result['message'] += '. User deleted.'
            return Response(check_result, status=status.HTTP_400_BAD_REQUEST)

        # code is incorrect
        elif check_result['message'] == 'Code is incorrect':
            return Response(check_result, status=status.HTTP_400_BAD_REQUEST)
