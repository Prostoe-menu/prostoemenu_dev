from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.serializers import UserCreateSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


class UserCreate(APIView):
    def post(self, request, format='json'):
        if request.data.get('password') != request.data['password_repeat']:
            return Response('Пароли не совпадают', status=status.HTTP_400_BAD_REQUEST)
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserList(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        users = User.objects.all().values()
        return Response({'users': users})


class Logout(APIView):

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)
