from django.conf import settings as django_settings
from django.core.exceptions import ValidationError

from rest_framework import serializers


def validate_accepted_symbols(value):
    for i in value:
        if i not in django_settings.ACCEPTED_SYMBOLS:
            raise ValidationError(f"Поле содержит недопустимые символы: {i}")

    return value


# def validate_min_title_lenght(value):
#     if len(value) < django_settings.MIN_TITLE_LENGTH:
#         return serializers.ValidationError(
#             f"Title cannot be shorter than {django_settings.MIN_TITLE_LENGTH} symbols."
#         )
#     return value