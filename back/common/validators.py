from django.conf import settings as django_settings
from django.core.exceptions import ValidationError


def validate_accepted_symbols(field, value):
    for i in value:
        if i not in django_settings.ACCEPTED_SYMBOLS:
            raise ValidationError(f'Поле {field} содержит недопустимые символы')
    return value
