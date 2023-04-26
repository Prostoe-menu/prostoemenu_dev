from rest_framework import serializers
from .models import Profile, ActivationCode
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    #username = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = '__all__'
        lookup_field = 'username'
        # fields = (
        #     'user',
        #     'username',
        #     'first_name',
        #     'last_name',
        #     'email',
        #     'is_active',
        # )


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
