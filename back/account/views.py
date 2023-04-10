from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import UserProfileSerializer
from .permission import IsOwnerProfileOrReadOnly


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
