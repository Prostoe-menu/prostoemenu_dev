import random

from django.conf import settings as django_settings
from django.core.exceptions import ValidationError
from django.test import TestCase

from recipes.models import Recipe, RecipeStep


class RecipeStepTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Recipe.objects.create(
            title="Омлет по-берлински",
            description="Описание омлета по-берлински",
            cooking_time=10,
            oven_time=10,
            quantity=2,
            complexity=1,
            author=None,
            cover_path="data/default_photo.jpg",
        )

    def test_step_number_cannot_be_less_than_1(self):
        print("test_step_number_cannot_be_less_than_1")
        with self.assertRaises(ValidationError):
            recipe_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=0,
                description="Step 0 description",
                image="data/default_photo.jpg",
            )

            recipe_step.full_clean()

    def test_step_number_cannot_be_more_than_20(self):
        print("test_step_number_cannot_be_more_than_20")
        with self.assertRaises(ValidationError):
            recipe_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=21,
                description="Step description",
                image="data/default_photo.jpg",
            )

            recipe_step.full_clean()

    def test_step_number_is_from_1_to_20(self):
        print("test_step_number_is_from_1_to_20")
        valid_numbers = [1, 10, 20]
        for number in valid_numbers:
            recipe_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=number,
                description="Step description",
                image="data/default_photo.jpg",
            )

            recipe_step.full_clean()

    def test_description_cannot_be_shorter_then_10(self):
        print("test_description_cannot_be_shorter_then_10")
        with self.assertRaises(ValidationError):
            recipe_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="descripti",
                image="data/default_photo.jpg",
            )

            recipe_step.full_clean()

    def test_description_cannot_be_longer_then_500(self):
        print("test_description_cannot_be_longer_then_500")
        with self.assertRaises(ValidationError):
            recipe_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="".join(
                    [
                        random.choice(django_settings.ACCEPTED_SYMBOLS)
                        for i in range(501)
                    ]
                ),
                image="data/default_photo.jpg",
            )

            recipe_step.full_clean()

    def test_step_numbers_cannot_be_duplicated(self):
        print("test_step_numbers_cannot_be_duplicated")
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="step description",
                image="data/default_photo.jpg",
            )

            same_number_step = RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="step description 2",
                image="data/default_photo.jpg",
            )

            same_number_step.full_clean()
