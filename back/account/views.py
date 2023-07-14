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

    def post(self, request):

        username = request.POST.get('username')
        entered_code_value = request.POST.get('activ_code')

        #user_pk = get_object_or_404(User, username=username).pk

        try:
            user_pk = User.objects.get(username=username).pk
        except:
            context = {
                'success': False,
                'message': 'User does not exist',
                'user_pk': None}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        activation_code_pk = ActivationCode.objects.get(user=user_pk).pk
        activation_code_value = ActivationCode.objects.get(user=user_pk).code
        date_code_created = ActivationCode.objects.get(user=user_pk).datetime_created
        time_diff = timezone.now() - date_code_created

        if entered_code_value == activation_code_value:
            expiration_time = 24 * 3600  # 24 hours
            if time_diff.total_seconds() < expiration_time:
                context = {
                    'success': True,
                    'message': 'Activation code is correct',
                    'user_pk': user_pk,
                }
                return Response(context, status=status.HTTP_200_OK)

            # activation code correct and expired
            else:
                code_generated_times = ActivationCode.objects.get(user=user_pk).code_generated_num
                if code_generated_times < 3:
                    new_activation_code = generate_activation_code()

                    context = {
                        'success': False,
                        'message': 'Activation code is expired',
                        'user_pk': user_pk,
                        'code_generated_times': code_generated_times + 1,
                        'activation_code_pk': activation_code_pk,
                        'new_activation_code': new_activation_code,
                    }
                    return Response(context, status=status.HTTP_400_BAD_REQUEST)

                # activation code releases exceed
                else:
                    context = {
                        'success': False,
                        'message': 'Number of activation code releases is exceeded. User deleted.',
                        'user_pk': user_pk
                    }
                    return Response(context, status=status.HTTP_400_BAD_REQUEST)


        else:
            context = {
                'success': False,
                'message': 'Activation code is incorrect',
                'user_pk': user_pk
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user_object = get_object_or_404(User, username=request.data.get('username'))
        user_object.is_active = False
        user_object.save()
        user = UserSerializer(user_object)
        return Response(user.data)




class ActivationCodeUpdateView(UpdateAPIView):
    queryset = ActivationCode.objects.all()
    serializer_class = ActivationCodeSerializer
