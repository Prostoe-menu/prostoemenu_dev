from rest_framework import serializers
from .models import Profile, ActivationCode
#from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'pk',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
        )


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


class ActivationCodeSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ActivationCode
        fields = (
            'user',
            'code',
        )
