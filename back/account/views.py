from requests import Response
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Profile, ActivationCode
from .serializers import UserProfileSerializer, UserSerializer
from .permission import IsOwnerProfileOrReadOnly
from django.contrib.auth import get_user_model

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
  #  lookup_field = 'username'
  #   def update(self):
  #       # instance = self.get_object()
  #       # serializer = self.get_serializer(instance, data=request.data, partial=True)
  #       User.objects.raw('UPDATE auth_user SET is_active = True WHERE username = "brandon"')
  #       return Response(status.HTTP_200_OK)
  #       # if serializer.is_valid():
  #       #     instance['is_active'] = True
  #       #     User.objects.raw('UPDATE auth_user SET is_active = True WHERE username = "brandon"')
  #       #     #serializer.save()
  #       #     return Response({"message": "User activated"})
  #       # else:
  #       #     return Response({"message": "failed", "details": serializer.errors})
  #       # username = request.query_params.get('username')
  #       # User.objects.raw('UPDATE auth_user SET is_active = True WHERE username = {username}')
  #
  #       # code = self.request.data["code"]
  #       # user_id = User.objects.filter(username=username)
  #       # print('User_id', {user_id})
