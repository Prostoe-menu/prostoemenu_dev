from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from common.models import CustomBaseModel


class Ingredient(CustomBaseModel):
    name = models.CharField(max_length=100, verbose_name="Название")
    category = models.CharField(
        max_length=100, verbose_name="Категория", default="Без категории"
    )
    sort = models.PositiveSmallIntegerField(
        null=True,
        verbose_name="Порядок",
        validators=[MinValueValidator(1), MaxValueValidator(3)]
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
