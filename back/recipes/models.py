from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


from common.models import CustomBaseModel
from ingredients.models import Ingredient
from measurements.models import Measurement

User = get_user_model()


class Recipe(CustomBaseModel):
    title = models.CharField(max_length=100, verbose_name="Название", unique=True)
    description = models.TextField(null=True, verbose_name="Описание")
    cooking_time = models.PositiveSmallIntegerField(
        null=False,
        verbose_name="Общее время готовки",
        validators=[MinValueValidator(1), MaxValueValidator(5999)]
    )
    oven_time = models.PositiveSmallIntegerField(
        null=False,
        verbose_name="Время активной готовки",
        validators=[MinValueValidator(1), MaxValueValidator(5999)]
    )
    quantity = models.PositiveSmallIntegerField(
        null=False,
        verbose_name="Количество порций",
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    complexity = models.PositiveSmallIntegerField(
        null=False,
        verbose_name="Сложность готовки",
        validators=[MinValueValidator(1), MaxValueValidator(3)]
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

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Рецепт"
        verbose_name_plural = "Рецепты"
        ordering = ["-created_at"]



class RecipeStep(CustomBaseModel):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="steps")
    step_number = models.PositiveSmallIntegerField(verbose_name="Номер шага")
    description = models.TextField(verbose_name="Описание шага")
    image = models.ImageField(upload_to="recipes", verbose_name="Изображение")

    class Meta:
        verbose_name = "Шаг"
        verbose_name_plural = "Шаги"


class RecipeIngredient(CustomBaseModel):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="ingredients"
    )
    ingredient = models.ForeignKey(
        Ingredient, on_delete=models.CASCADE, related_name="recipes"
    )
    volume = models.PositiveSmallIntegerField(verbose_name="Количество")
    measure = models.ForeignKey(
        Measurement, on_delete=models.CASCADE, verbose_name="Единица измерения"
    )

    class Meta:
        verbose_name = "Ингредиент в рецепте"
        verbose_name_plural = "Ингредиенты в рецептах"
