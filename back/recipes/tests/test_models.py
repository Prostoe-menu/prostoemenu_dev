from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.test import TestCase

from common.utils import generate_text
from recipes.models import Recipe, RecipeStep


class RecipeStepTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Recipe.objects.create(
            title="Омлет по-берлински",
            description="Описание омлета по-берлински",
            cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            quantity=django_settings.MIN_PORTION_QUANTITY,
            complexity=django_settings.MIN_RECIPE_COMPLEXITY,
            author=None,
            cover_path="mediafiles/media/default_photo.jpg",
        )

    def test_step_number_cannot_be_less_than_MIN_STEP_NUMBER(self):
        with self.assertRaises(ValidationError):
            invalid_step_number = django_settings.MIN_STEP_NUMBER - 1
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=invalid_step_number,
                description="Step description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_step_number_cannot_be_more_than_MAX_STEP_NUMBER(self):
        with self.assertRaises(ValidationError):
            invalid_step_number = django_settings.MAX_STEP_NUMBER + 1
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=invalid_step_number,
                description="Step description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_create_step_with_valid_number(self):
        valid_numbers = [
            django_settings.MIN_STEP_NUMBER,
            django_settings.MIN_STEP_NUMBER + 1,
            django_settings.MAX_STEP_NUMBER,
        ]
        for valid_number in valid_numbers:
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=valid_number,
                description="Step description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_description_cannot_be_shorter_than_MIN_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            too_short_description = generate_text(
                django_settings.MIN_DESCR_LENGTH - 1,
                django_settings.ACCEPTED_SYMBOLS,
            )

            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=django_settings.MIN_STEP_NUMBER,
                description=too_short_description,
                image="mediafiles/media/default_photo.jpg",
            )

    def test_description_cannot_be_longer_than_MAX_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            too_long_description = generate_text(
                django_settings.MAX_DESCR_LENGTH + 1,
                django_settings.ACCEPTED_SYMBOLS,
            )

            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=django_settings.MIN_STEP_NUMBER,
                description=too_long_description,
                image="mediafiles/media/default_photo.jpg",
            )

    def test_step_number_cannot_be_duplicated(self):
        RecipeStep.objects.create(
            recipe=Recipe.objects.get(pk=1),
            step_number=django_settings.MIN_STEP_NUMBER,
            description="Step description",
            image="mediafiles/media/default_photo.jpg",
        )
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=django_settings.MIN_STEP_NUMBER,
                description="Step description 2",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_only_accepted_symbols_in_step_descriprion(self):
        with self.assertRaises(ValidationError):
            valid_descr = "valid step description"
            invalid_symbol = "~"
            invalid_descr = valid_descr + invalid_symbol

            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=django_settings.MIN_STEP_NUMBER,
                description=invalid_descr,
                image="mediafiles/media/default_photo.jpg",
            )


class RecipeTest(TestCase):
    def test_recipe_title_cannot_be_shorter_than_MIN_TITLE_LENGTH(self):
        with self.assertRaises(ValidationError):
            Recipe.objects.create(
                title="A",
                description="some recipe description",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_recipe_title_contains_only_ACCEPTED_SYMBOLS(self):
        with self.assertRaises(ValidationError):
            valid_title = "Омлет по-берлински"
            invalid_symbol = "~"
            invalid_title = valid_title + invalid_symbol
            Recipe.objects.create(
                title=invalid_title,
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_recipe_description_cannot_be_shorter_than_MIN_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            too_short_description = generate_text(
                django_settings.MIN_DESCR_LENGTH - 1, django_settings.ACCEPTED_SYMBOLS
            )

            Recipe.objects.create(
                title="Омлет по-берлински",
                description=too_short_description,
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_recipe_description_cannot_be_longer_than_MAX_DESCR_LENGTH(self):
        with self.assertRaises(ValidationError):
            too_long_description = generate_text(
                django_settings.MAX_DESCR_LENGTH + 1, django_settings.ACCEPTED_SYMBOLS
            )
            Recipe.objects.create(
                title="Омлет по-берлински",
                description=too_long_description,
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_recipe_description_contains_only_ACCEPTED_SYMBOLS(self):
        with self.assertRaises(ValidationError):
            valid_descr = generate_text(
                django_settings.MAX_DESCR_LENGTH - 1, django_settings.ACCEPTED_SYMBOLS
            )
            invalid_symbol = "~"
            invalid_descr = valid_descr + invalid_symbol

            Recipe.objects.create(
                title="Омлет по-берлински",
                description=invalid_descr,
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_cooking_time_cannot_be_less_than_oven_time(self):
        with self.assertRaises(ValidationError):
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME + 1,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_quantity_cannot_be_less_than_MIN_PORTION_QUANTITY(self):
        with self.assertRaises(ValidationError):
            invalid_quantity = django_settings.MIN_PORTION_QUANTITY - 1
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=invalid_quantity,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_quantity_cannot_be_more_than_MAX_PORTION_QUANTITY(self):
        with self.assertRaises(ValidationError):
            invalid_quantity = django_settings.MAX_PORTION_QUANTITY + 1
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=invalid_quantity,
                complexity=django_settings.MIN_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_complexity_cannot_be_less_than_MIN_RECIPE_COMPLEXITY(self):
        with self.assertRaises(ValidationError):
            invalid_complexity = django_settings.MIN_RECIPE_COMPLEXITY - 1
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=invalid_complexity,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_complexity_cannot_be_more_than_MAX_RECIPE_COMPLEXITY(self):
        with self.assertRaises(ValidationError):
            invalid_complexity = django_settings.MAX_RECIPE_COMPLEXITY + 1
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MIN_PORTION_QUANTITY,
                complexity=invalid_complexity,
                author=None,
                cover_path="mediafiles/media/default_photo.jpg",
            )

    def test_combination_of_title_and_description_cannot_be_duplicated(self):
        Recipe.objects.create(
            title="Омлет по-берлински",
            description="Описание омлета по-берлински",
            cooking_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            oven_time=django_settings.MIN_COOKING_AND_OVEN_TIME,
            quantity=django_settings.MIN_PORTION_QUANTITY,
            complexity=django_settings.MIN_RECIPE_COMPLEXITY,
            author=None,
            cover_path="mediafiles/media/default_photo.jpg",
        )

        with self.assertRaises(ValidationError):
            Recipe.objects.create(
                title="Омлет по-берлински",
                description="Описание омлета по-берлински",
                cooking_time=django_settings.MAX_COOKING_AND_OVEN_TIME,
                oven_time=django_settings.MAX_COOKING_AND_OVEN_TIME,
                quantity=django_settings.MAX_PORTION_QUANTITY,
                complexity=django_settings.MAX_RECIPE_COMPLEXITY,
                author=None,
                cover_path="mediafiles/media/another_default_photo.jpg",
            )