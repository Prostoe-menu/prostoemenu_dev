import datetime

from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


@deconstructible
class UserAgeValidator:
    def __init__(self):
        self.max_user_age = django_settings.MAX_USER_AGE
        self.min_user_age = django_settings.MIN_USER_AGE


    def validate_birthdate_in_future(self, value):
        if datetime.date.today() < value:
            raise ValidationError(
                f"Ошибка! Дата рождения еще не наступила: {value}"
            )

    def validate_max_age(self, value):
        if (
            datetime.date.today() - datetime.timedelta(days=365 * self.max_user_age)
            > value
        ):
            raise ValidationError(
                f"Возраст пользователя не может быть более {self.max_user_age} лет"
            )
        return True


    def validate_min_age(self, value):
        if datetime.date.today() - datetime.timedelta(days=365 * self.min_user_age) < value:
            raise ValidationError(
                f"Возраст пользователя не может быть менее {self.min_user_age} лет"
            )

        return True


    def __call__(self, value):
        self.validate_birthdate_in_future(value)
        self.validate_max_age(value)
        self.validate_min_age(value)




