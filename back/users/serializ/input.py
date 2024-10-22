from django.conf import settings as django_settings
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField

User = get_user_model()


class CustomUserCreateInputSerializer(UserCreateSerializer):

    gender = serializers.ChoiceField(
        required=False,
        choices=django_settings.GENDER_CHOICES
#        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)],
    )
    birth_date = serializers.DateField(
        required=False,
#        validators=[]
        )
    avatar = Base64ImageField()
    is_verified = serializers.BooleanField(default=False)


    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = UserCreateSerializer.Meta.fields + ['gender', 'birth_date', 'avatar', 'is_verified']
