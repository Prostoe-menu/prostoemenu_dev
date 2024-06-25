from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class AcceptedSymbolsValidator:
    def __init__(self, accepted_symbols):
        self.accepted_symbols = set(accepted_symbols)

    def __call__(self, value):
        invalid_symbols = set(value) - self.accepted_symbols
        if invalid_symbols:
            raise ValidationError(
                f"Поле содержит недопустимые символы: {' '.join(i for i in invalid_symbols)}"
            )


def validate_accepted_symbols(value):
    invalid_symbols = set(value) - set(django_settings.ACCEPTED_SYMBOLS)
    if invalid_symbols:
        raise ValidationError(
            f"Поле содержит недопустимые символы: {''.join(invalid_symbols)}"
        )
