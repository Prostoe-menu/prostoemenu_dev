import datetime

from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class UserAgeValidator:
    def __init__(self):
        self.max_user_age = django_settings.MAX_USER_AGE

    def __call__(self, value):
        if (
            datetime.date.today() - datetime.timedelta(days=365 * self.max_user_age)
            > value
        ):
            raise ValidationError(
                f"Возраст пользователя не может быть более {self.max_user_age} лет"
            )
