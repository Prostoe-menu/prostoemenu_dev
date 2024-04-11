from django.conf import settings as django_settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import (
    MaxLengthValidator,
    MaxValueValidator,
    MinLengthValidator,
    MinValueValidator,
)
from django.db import models

from common.models import CustomBaseModel
from common.utils import normilize_text_fields
from common.validators import validate_accepted_symbols
from ingredients.models import Ingredient
from measurements.models import Measurement

User = get_user_model()


class Recipe(CustomBaseModel):
    title = models.CharField(
        max_length=100,
        verbose_name="Название",
        validators=[
            MinLengthValidator(django_settings.MIN_TITLE_LENGTH),
            validate_accepted_symbols,
        ],
    )
    description = models.TextField(
        null=True,
        verbose_name="Описание",
        validators=[
            MinLengthValidator(django_settings.MIN_DESCR_LENGTH),
            MaxLengthValidator(django_settings.MAX_DESCR_LENGTH),
            validate_accepted_symbols,
        ],
    )
    cooking_time = models.PositiveSmallIntegerField(
        verbose_name="Общее время готовки",
        validators=[
            MinValueValidator(django_settings.MIN_COOKING_AND_OVEN_TIME),
            MaxValueValidator(django_settings.MAX_COOKING_AND_OVEN_TIME),
        ],
    )
    oven_time = models.PositiveSmallIntegerField(
        verbose_name="Время активной готовки",
        validators=[
            MinValueValidator(django_settings.MIN_COOKING_AND_OVEN_TIME),
            MaxValueValidator(django_settings.MAX_COOKING_AND_OVEN_TIME),
        ],
    )
    quantity = models.PositiveSmallIntegerField(
        verbose_name="Количество порций",
        validators=[
            MinValueValidator(django_settings.MIN_PORTION_QUANTITY),
            MaxValueValidator(django_settings.MAX_PORTION_QUANTITY),
        ],
    )
    complexity = models.PositiveSmallIntegerField(
        verbose_name="Сложность готовки",
        validators=[MinValueValidator(1), MaxValueValidator(3)],
    )
    author = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Автор",
        related_name="recipes",
    )
    cover_path = models.ImageField(upload_to="media", verbose_name="Главное фото")

    class Meta:
        verbose_name = "Рецепт"
        verbose_name_plural = "Рецепты"
        ordering = ["-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["title", "description"], name="unique_recipe"
            )
        ]

    def __str__(self):
        return self.title

    def clean(self):
        normilize_text_fields(self)
        if self.cooking_time < self.oven_time:
            raise ValidationError(
                "Общее время готовки не может быть меньше времени активной готовки"
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Recipe, self).save(*args, **kwargs)


class RecipeStep(CustomBaseModel):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="steps")
    step_number = models.PositiveSmallIntegerField(
        verbose_name="Номер шага",
        validators=[MinValueValidator(1), MaxValueValidator(20)],
    )
    description = models.TextField(
        verbose_name="Описание шага",
        validators=[
            MinLengthValidator(django_settings.MIN_DESCR_LENGTH),
            MaxLengthValidator(django_settings.MAX_DESCR_LENGTH),
            validate_accepted_symbols,
        ],
    )
    image = models.ImageField(
        null=True, upload_to="recipes", verbose_name="Изображение"
    )

    class Meta:
        verbose_name = "Шаг"
        verbose_name_plural = "Шаги"
        constraints = [
            models.UniqueConstraint(
                fields=["recipe", "step_number"], name="unique_step_in_recipe"
            )
        ]

    def clean(self):
        normilize_text_fields(self)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(RecipeStep, self).save(*args, **kwargs)


class RecipeIngredient(CustomBaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE, related_name="recipes"
    )
    volume = models.DecimalField(
        max_digits=4,
        decimal_places=2,
        verbose_name="Количество",
        validators=[MinValueValidator(0.01)],
    )
    measure = models.ForeignKey(
        Measurement, on_delete=models.CASCADE, verbose_name="Единица измерения"
    )

    class Meta:
        verbose_name = "Ингредиент в рецепте"
        verbose_name_plural = "Ингредиенты в рецептах"
        constraints = [
            models.UniqueConstraint(
                fields=["recipe", "ingredient"], name="unique_ingredient_in_recipe"
            )
        ]
