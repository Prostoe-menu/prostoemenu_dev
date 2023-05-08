from django.utils import timezone
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
            context = {'success': False, 'message': 'User does not exist', 'user_pk': None}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

        activation_code = ActivationCode.objects.get(user=user_pk).code
        code_created = ActivationCode.objects.get(user=user_pk).datetime_created

        time_diff = timezone.now() - code_created

        if entered_code == activation_code:
            if time_diff.total_seconds() < 86400:
                context = {'success': True, 'message': 'Activation code is correct', 'user_pk': user_pk}
                return Response(context, status=status.HTTP_200_OK)
            else:
                context = {'success': False, 'message': 'Activation code is expired', 'user_pk': user_pk}
                return Response(context, status=status.HTTP_400_BAD_REQUEST)
        else:
            context = {'success': False, 'message': 'Activation code is incorrect', 'user_pk': user_pk}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
