from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

from recipe.models.ingredient import Ingredient
from recipe.models.measurement import Measurement
from recipe.models.tag import Tag

User = get_user_model()


class RecipeIngredients(models.Model):
    recipe = models.ForeignKey(
        'Recipe',
        on_delete=models.CASCADE,
        verbose_name='Рецепт')
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        verbose_name='Ингредиент',
        related_name='ingredient')
    amount = models.PositiveIntegerField(
        validators=[MinValueValidator(1)],
        verbose_name='Количество')
    measure = models.ForeignKey(
        Measurement,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name='Единица измерения')


class RecipeTags(models.Model):
    recipe = models.ForeignKey(
        'Recipe',
        on_delete=models.CASCADE,
        verbose_name='Рецепт')
    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE,
        verbose_name='Тэг')


class Recipe(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Рецепт')
    description = models.TextField(
        verbose_name='Описание')
    cooking_time = models.IntegerField(
        verbose_name='Время готовки, мин.')
    oven_time = models.IntegerField(
        verbose_name='Время готовки у плиты, мин.',
        default=0)
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Дата создания')
    update_at= models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления')
    is_visible = models.BooleanField(
        default=False, verbose_name='Видимость')
    is_moderated = models.BooleanField(
        default=False, verbose_name='Прошло модерацию')
    complexity = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1),MaxValueValidator(3)],
        verbose_name='Сложность готовки')
    author = models.ForeignKey(
        User,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name='Автор',
        related_name='recipes')
    ingredient = models.ManyToManyField(
        Ingredient,
        through='RecipeIngredients',
        related_name='ingredients',
        verbose_name='Ингредиенты')
    tag = models.ManyToManyField(
        Tag,
        through='RecipeTags',
        related_name='tags')
    steps = models.JSONField(
        default=dict,
        null=False,
        verbose_name='Шаги приготовления')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Рецепт'
        verbose_name_plural = 'Рецепты'
        ordering = ["created_at"]