from rest_framework import serializers
from .models import Profile


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = (
            'user',
            'gender',
            'birth_date',
            'region',
            'city',
            'photo',
        )
