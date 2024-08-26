from django.conf import settings as django_settings
from django.core.validators import (
    MaxLengthValidator,
    MaxValueValidator,
    MinLengthValidator,
    MinValueValidator,
)
from django.db import models

from common.models import CustomBaseModel
from common.utils import normilize_text_fields
from common.validators import AcceptedSymbolsValidator


class Category(CustomBaseModel):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Категория",
        default="Без категории",
        validators=[
            MinLengthValidator(django_settings.MIN_TITLE_LENGTH),
            AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS),
        ],
    )
    description = models.TextField(
        null=True,
        blank=True,
        verbose_name="Описание",
        validators=[
            MinLengthValidator(django_settings.MIN_DESCR_LENGTH),
            MaxLengthValidator(django_settings.MAX_DESCR_LENGTH),
            AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS),
        ],
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def clean(self):
        normilize_text_fields(self)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Category, self).save(*args, **kwargs)


class Ingredient(CustomBaseModel):
    name = models.CharField(
        max_length=django_settings.MAX_TITLE_LENGTH,
        verbose_name="Название",
        validators=[
            MinLengthValidator(django_settings.MIN_TITLE_LENGTH),
            AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS),
        ],
    )
    category = models.ForeignKey(
        Category,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Категория",
        related_name="ingredients",
    )
    sort = models.PositiveSmallIntegerField(
        null=True,
        verbose_name="Порядок",
        validators=[MinValueValidator(1), MaxValueValidator(3)],
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Ингредиент"
        verbose_name_plural = "Ингредиенты"
        constraints = [
            models.UniqueConstraint(
                fields=["name", "category"], name="unique_ingredient"
            )
        ]
        ordering = ["name"]
