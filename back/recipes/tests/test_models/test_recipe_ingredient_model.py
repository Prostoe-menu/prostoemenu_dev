from decimal import Decimal

from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.test import TestCase

import ingredients.models
import recipes.models
from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Recipe, RecipeIngredient


class RecipeIngredientTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        recipe_category = recipes.models.Category.objects.create(
            name="Основные блюда",
            description="Описание категории рецептов Основные блюда",
        )
        ingr_category = ingredients.models.Category.objects.create(
            name="Молочные продукты", description="Описание категории Молочные продукты"
        )
        Ingredient.objects.create(name="Молоко", category=ingr_category, sort=10)
        Measurement.objects.create(name="стакан", abbreviation="ст.")
        Recipe.objects.create(
            title="Омлет по-берлински",
            description="Описание омлета по-берлински",
            cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            quantity=django_settings.MIN_PORTION_QUANTITY,
            complexity=django_settings.MIN_RECIPE_COMPLEXITY,
            author=None,
            cover_path="mediafiles/media/default_photo.jpg",
            category=recipe_category,
        )

    def test_ingredient_volume_cannot_be_less_than_MIN_INGREDIENT_VOLUME(self):
        with self.assertRaises(ValidationError):
            invalid_volume = django_settings.MIN_INGREDIENT_VOLUME - Decimal("0.01")
            RecipeIngredient.objects.create(
                recipe=Recipe.objects.get(pk=1),
                ingredient=Ingredient.objects.get(pk=1),
                volume=invalid_volume,
                measure=Measurement.objects.get(pk=1),
            )
