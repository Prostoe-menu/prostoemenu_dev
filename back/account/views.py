from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile, ActivationCode
from .serializers import UserProfileSerializer, UserSerializer
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
            context = {'result': False, 'message': 'User does not exist', 'user_pk': None}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        activation_code = ActivationCode.objects.get(user=user_pk).code
        if entered_code == activation_code:
            context = {'result': True, 'message': 'Code is correct', 'user_pk': user_pk}
            return Response(context, status=status.HTTP_200_OK)
        else:
            context = {'result': False, 'message': 'Code is incorrect', 'user_pk': None}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
