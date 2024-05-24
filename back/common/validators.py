from django.conf import settings as django_settings
from django.core.exceptions import ValidationError


def validate_accepted_symbols(value):
    invalid_symbols = set()
    for i in value:
        if i not in django_settings.ACCEPTED_SYMBOLS:
            invalid_symbols.add(i)
    if invalid_symbols:
        raise ValidationError(
            f"Поле содержит недопустимые символы: {' '.join(invalid_symbols)}"
        )
