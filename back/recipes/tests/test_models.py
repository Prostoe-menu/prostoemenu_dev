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
            cover_path="mediafiles/media/default_photo.jpg",
        )

    def test_step_number_cannot_be_less_than_1(self):
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=0,
                description="Step 0 description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_step_number_cannot_be_more_than_20(self):
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=21,
                description="Step description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_step_number_is_from_1_to_20(self):
        valid_numbers = [1, 10, 20]
        for number in valid_numbers:
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=number,
                description="Step description",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_description_cannot_be_shorter_then_10(self):
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="descripti",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_description_cannot_be_longer_then_500(self):
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="".join(
                    [
                        random.choice(django_settings.ACCEPTED_SYMBOLS)
                        for i in range(501)
                    ]
                ),
                image="mediafiles/media/default_photo.jpg",
            )

    def test_step_number_cannot_be_duplicated(self):
        RecipeStep.objects.create(
            recipe=Recipe.objects.get(pk=1),
            step_number=1,
            description="step description",
            image="mediafiles/media/default_photo.jpg",
        )
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="step description 2",
                image="mediafiles/media/default_photo.jpg",
            )

    def test_only_accepted_symbols_in_step_descriprion(self):
        with self.assertRaises(ValidationError):
            RecipeStep.objects.create(
                recipe=Recipe.objects.get(pk=1),
                step_number=1,
                description="step description with invalid symbol _ ",
                image="mediafiles/media/default_photo.jpg",
            )
