from django.conf import settings as django_settings
from django.core.exceptions import ValidationError


def validate_accepted_symbols(value):
    invalid_symbols = set(value) - django_settings.ACCEPTED_SYMBOLS
    if invalid_symbols:
        raise ValidationError(
            f"Поле содержит недопустимые символы: {''.join(invalid_symbols)}"
        )
