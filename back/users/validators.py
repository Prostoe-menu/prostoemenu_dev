from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible
import datetime
from django.conf import settings as django_settings

@deconstructible
class UserAgeValidator:
    def __init__(self):
        self.max_user_age = 120
        print("инициализирован useragevalidator")

    def __call__(self, value):

        if datetime.date.today() - datetime.timedelta(days=365*self.max_user_age) > value:
            raise ValidationError(
                f"Возраст пользователя не может быть более {self.max_user_age} лет"
            )


@deconstructible
class GenderValidator:
    def __init__(self):
        self.genders = (django_settings.MALE_ABBR, django_settings.FEMALE_ABBR)
        print("инициализирован gendervalidator")

    def __call__(self, value):
        if len(value) > max(len(django_settings.MALE_ABBR), len(django_settings.FEMALE_ABBR)):
            raise ValidationError(
                f"Поле 'пол' содержит не более {django_settings.GENDER_ABBR_LENGTH} символа"
            )
        if value not in self.genders:
            raise ValidationError(
                f"Недопустимое значение поля 'пол': {value}"
            )