from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.test import TestCase

from common.utils import generate_text
from recipes.models import Category, Recipe, RecipeStep


class RecipeStepTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Category.objects.create(
            name="Основные блюда",
            description="Описание категории рецептов Основные блюда",
        )

        Recipe.objects.create(
            title="Омлет по-берлински",
            description="Описание омлета по-берлински",
            cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            quantity=django_settings.MIN_PORTION_QUANTITY,
            complexity=django_settings.MIN_RECIPE_COMPLEXITY,
            author=None,
            cover_path="mediafiles/media/tiny_image.png",
            category=Category.objects.get(pk=1),
        )

    def setUp(self):
        self.recipe_step_data = {
            "recipe": Recipe.objects.get(pk=1),
            "step_number": django_settings.MIN_STEP_NUMBER,
            "description": "Valid step description",
            "image": "mediafiles/media/tiny_image.png",
        }

    def test_step_number_cannot_be_less_than_MIN_STEP_NUMBER(self):
        with self.assertRaises(ValidationError):
            invalid_step_number = django_settings.MIN_STEP_NUMBER - 1
            self.recipe_step_data["step_number"] = invalid_step_number
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_step_number_cannot_be_more_than_MAX_STEP_NUMBER(self):
        with self.assertRaises(ValidationError):
            invalid_step_number = django_settings.MAX_STEP_NUMBER + 1
            self.recipe_step_data["step_number"] = invalid_step_number
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_create_step_with_valid_number(self):
        valid_numbers = [
            django_settings.MIN_STEP_NUMBER,
            django_settings.MIN_STEP_NUMBER + 1,
            django_settings.MAX_STEP_NUMBER,
        ]
        for valid_number in valid_numbers:
            self.recipe_step_data["step_number"] = valid_number
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_description_cannot_be_shorter_than_MIN_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            invalid_descr = generate_text(
                django_settings.MIN_DESCR_LENGTH - 1,
                django_settings.ACCEPTED_SYMBOLS,
            )
            self.recipe_step_data["description"] = invalid_descr
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_description_cannot_be_longer_than_MAX_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            invalid_descr = generate_text(
                django_settings.MAX_DESCR_LENGTH + 1,
                django_settings.ACCEPTED_SYMBOLS,
            )
            self.recipe_step_data["description"] = invalid_descr
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_step_number_cannot_be_duplicated(self):
        RecipeStep.objects.create(**self.recipe_step_data)
        with self.assertRaises(ValidationError):
            self.recipe_step_data["description"] = "Another valid step description."
            self.recipe_step_data["image"] = "mediafiles/media/another_photo.jpg"
            RecipeStep.objects.create(**self.recipe_step_data)

    def test_only_accepted_symbols_in_step_descriprion(self):
        with self.assertRaises(ValidationError):
            valid_descr = "valid step description"
            invalid_symbol = "~"
            invalid_descr = valid_descr + invalid_symbol
            self.recipe_step_data["description"] = invalid_descr
            RecipeStep.objects.create(**self.recipe_step_data)
