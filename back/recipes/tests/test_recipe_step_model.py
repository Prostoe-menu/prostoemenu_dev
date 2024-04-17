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
