from django.utils import timezone
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile, ActivationCode
from .scripts import generate_activation_code
from .serializers import UserProfileSerializer, UserSerializer, ActivationCodeSerializer
from .permission import IsOwnerProfileOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework.decorators import APIView

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
    def get(self, request):
        username = request.query_params.get('username')
        entered_code = request.query_params.get('activ_code')

        try:
            user_pk = User.objects.get(username=username).pk
        except:
            context = {'success': False, 'message': 'User does not exist', 'user_pk': None}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
        activation_code_pk = ActivationCode.objects.get(user=user_pk).pk
        activation_code = ActivationCode.objects.get(user=user_pk).code
        code_created = ActivationCode.objects.get(user=user_pk).datetime_created
        time_diff = timezone.now() - code_created

        if entered_code == activation_code:
            if time_diff.total_seconds() < 86400:
                context = {
                    'success': True,
                    'message': 'Activation code is correct',
                    'user_pk': user_pk,
                }
                return Response(context, status=status.HTTP_200_OK)
            else:
                new_activation_code = generate_activation_code()

                context = {
                    'success': False,
                    'message': 'Activation code is expired',
                    'user_pk': user_pk,
                    'activation_code_pk': activation_code_pk,
                    'new_activation_code': new_activation_code,
                }
                return Response(context, status=status.HTTP_400_BAD_REQUEST)
        else:
            context = {
                'success': False,
                'message': 'Activation code is incorrect',
                'user_pk': user_pk}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)


class ActivationCodeUpdateView(UpdateAPIView):
    queryset = ActivationCode.objects.all()
    serializer_class = ActivationCodeSerializer

# class ActivationCodeUpdateView(APIView):
#     queryset = ActivationCode.objects.all()
#     serializer_class = ActivationCodeSerializer
#
#     def partial_update(self, request, *args, **kwargs):
#         code_object = self.get_object()
#         code_object.code = generate_activation_code()
#         code_object.save()
#
#         serializer = self.get_serializer(code_object)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
#
#         return Response(serializer.data)


#
#     def get_object(self, pk):
#         return ActivationCode.objects.get(pk=pk)
#
#     def patch(self, request):
#         activ_code_object = self.get_object(request.pk)
#         new_data = {
#             'code': generate_activation_code(),
#             'datetime_created': timezone.now(),
#         }
#        # serializer = ActivationCodeSerializer(activ_code_object, data=request.data, partial=True)
#         serializer = ActivationCodeSerializer(activ_code_object, data=new_data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         context = {'success': False, 'message': 'Something wrong', 'user_pk': pk}
#         return Response(context, status=status.HTTP_400_BAD_REQUEST)
