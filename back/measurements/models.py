from django.core.validators import MinLengthValidator
from django.db import models

from common.models import CustomBaseModel
from common.validators import AcceptedSymbolsValidator
from django.conf import settings as django_settings


class Measurement(CustomBaseModel):
    name = models.CharField(
        max_length=30,
        unique=True,
        verbose_name="Название",
        validators=[
            MinLengthValidator(django_settings.MIN_TITLE_LENGTH),
            AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)
        ],
    )
    abbreviation = models.CharField(
        max_length=30,
        verbose_name="Аббревиатура",
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)],
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Единица измерения"
        verbose_name_plural = "Единицы измерения"
        ordering = ["name"]
