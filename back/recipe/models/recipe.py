from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from recipe.models.basemodel import Basemodel

User = get_user_model()


class Recipe(Basemodel):
    """Модель рецепта."""

    name = models.CharField(max_length=100, verbose_name="Рецепт")
    description = models.TextField(verbose_name="Описание")
    cooking_time = models.PositiveSmallIntegerField(verbose_name="Время готовки, мин.")
    oven_time = models.IntegerField(
        verbose_name="Время готовки у плиты, мин.", default=0
    )
    complexity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(3)],
        verbose_name="Сложность готовки",
    )
    ingredients = models.JSONField(default=dict, null=False, verbose_name="Ингредиенты")
    steps = models.JSONField(
        default=dict, null=False, verbose_name="Шаги приготовления"
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Рецепт"
        verbose_name_plural = "Рецепты"
        ordering = ["created_at"]
