from django.conf import settings as django_settings
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from common.validators import AcceptedSymbolsValidator
from users.validators import UserAgeValidator

User = get_user_model()


class CustomUserCreateInputSerializer(UserCreateSerializer):
    first_name = serializers.CharField(
        required=False,
        allow_null=True,
        max_length=django_settings.MAX_NAME_LENGTH,
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)]
    )
    last_name = serializers.CharField(
        required=False,
        allow_null=True,
        max_length=django_settings.MAX_NAME_LENGTH,
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)]
    )
    gender = serializers.ChoiceField(
        required=False, allow_blank=True, choices=django_settings.GENDER_CHOICES
    )
    birth_date = serializers.DateField(
        required=False, allow_null=True, validators=[UserAgeValidator()]
    )
    avatar = Base64ImageField(required=False)
    is_verified = serializers.BooleanField(default=False)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = UserCreateSerializer.Meta.fields + (
            "first_name",
            "last_name",
            "gender",
            "birth_date",
            "avatar",
            "is_verified",
        )
