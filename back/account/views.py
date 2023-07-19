from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import status

from rest_framework.decorators import APIView
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import (Profile,
                     ActivationCode)
from .permission import IsOwnerProfileOrReadOnly
from .serializers import (UserProfileSerializer,
                          UserSerializer,
                          ActivationCodeSerializer)
from .scripts import generate_activation_code

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


class UserActivationView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CheckCode(APIView):
    """
    Проверка кода активации, введенного пользователем.
    param1: username - логин пользователя
    param2: activ_code - код активации
    return: статус запроса, словарь с данными
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
                    'success': True,
                    'message': 'Code is correct',
                    'user_pk': user_pk,
                }
                return context
            # code is correct, expired
            else:
                code_generated_times = user_related_object.activ_code.code_generated_num
                # can release code again
                if code_generated_times < 3:
                    context = {
                        'success': False,
                        'message': 'Code is expired',
                        'user_pk': user_pk,
                        'code_generated_times': code_generated_times,
                        'activation_code_pk': activation_code_pk,
                    }
                    return context

                # code releases exceeded
                else:
                    context = {
                        'success': False,
                        'message': 'Code releases exceeded',
                        'user_pk': user_pk
                    }
                    return context

        # code is incorrect
        else:
            context = {
                'success': False,
                'message': 'Code is incorrect',
                'user_pk': user_pk
            }
            return context

    def patch(self, request):
        user_object = get_object_or_404(User, username=request.data.get('username'))
        check_result = self.check_code(user_pk=user_object.pk, entered_code_value=request.data.get('activ_code'))

        # code is correct
        if check_result['message'] == 'Code is correct':
            user_object.is_active = True
            user_object.save()
            user = UserSerializer(user_object)
            return Response(user.data)

        # code is expired, renew activation code
        elif check_result['message'] == 'Code is expired':
            activ_code_object = get_object_or_404(ActivationCode, pk=check_result['activation_code_pk'])
            activ_code_object.code = generate_activation_code()
            activ_code_object.code_generated_num += 1
            activ_code_object.save()
            activ_code = ActivationCodeSerializer(activ_code_object)
            return Response(activ_code.data)

        # code releases exceed, delete user
        elif check_result['message'] == 'Code releases exceeded':
            user_object.delete()
            check_result['message'] = 'User deleted'
            return Response(check_result, status=status.HTTP_400_BAD_REQUEST)

        # code is incorrect
        elif check_result['message'] == 'Code is incorrect':
            return Response(check_result, status=status.HTTP_400_BAD_REQUEST)


class ActivationCodeUpdateView(UpdateAPIView):
    queryset = ActivationCode.objects.all()
    serializer_class = ActivationCodeSerializer
