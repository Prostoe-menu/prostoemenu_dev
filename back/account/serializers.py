from rest_framework import serializers
from .models import Profile


class userProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = (
            'gender',
            'birth_date',
            'region',
            'city',
            'photo',
        )
