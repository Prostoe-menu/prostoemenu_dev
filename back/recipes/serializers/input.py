from collections import Counter

from django.conf import settings as django_settings
from django.contrib.auth import get_user_model
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from common.validators import validate_accepted_symbols
from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Category, Recipe

User = get_user_model()


class RecipeInredientInputSerializer(serializers.Serializer):
    ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())
    measure = serializers.PrimaryKeyRelatedField(queryset=Measurement.objects.all())
    volume = serializers.DecimalField(
        default=1.00,
        max_digits=6,
        decimal_places=2,
        min_value=django_settings.MIN_INGREDIENT_VOLUME,
    )


class RecipeStepInputSerializer(serializers.Serializer):
    step_number = serializers.IntegerField(
        min_value=django_settings.MIN_STEP_NUMBER,
        max_value=django_settings.MAX_STEP_NUMBER,
    )
    description = serializers.CharField(
        min_length=django_settings.MIN_DESCR_LENGTH,
        max_length=django_settings.MAX_DESCR_LENGTH,
        validators=[validate_accepted_symbols],
    )
    image = Base64ImageField(required=False)


class RecipeInputSerializer(serializers.Serializer):
    title = serializers.CharField(
        min_length=django_settings.MIN_TITLE_LENGTH,
        max_length=django_settings.MAX_TITLE_LENGTH,
        validators=[validate_accepted_symbols],
    )
    description = serializers.CharField(
        allow_blank=True,
        min_length=django_settings.MIN_DESCR_LENGTH,
        max_length=django_settings.MAX_DESCR_LENGTH,
        validators=[validate_accepted_symbols],
    )
    cooking_time = serializers.IntegerField(
        min_value=django_settings.MIN_COOKING_AND_OVEN_TIME,
        max_value=django_settings.MAX_COOKING_AND_OVEN_TIME,
    )
    oven_time = serializers.IntegerField(
        min_value=django_settings.MIN_COOKING_AND_OVEN_TIME,
        max_value=django_settings.MAX_COOKING_AND_OVEN_TIME,
    )
    quantity = serializers.IntegerField(
        min_value=django_settings.MIN_PORTION_QUANTITY,
        max_value=django_settings.MAX_PORTION_QUANTITY,
    )
    complexity = serializers.IntegerField(
        min_value=django_settings.MIN_RECIPE_COMPLEXITY,
        max_value=django_settings.MAX_RECIPE_COMPLEXITY,
    )
    cover_path = Base64ImageField()
    author = serializers.PrimaryKeyRelatedField(
        required=False, queryset=User.objects.all()
    )
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    ingredients = RecipeInredientInputSerializer(many=True)
    steps = RecipeStepInputSerializer(many=True)

    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=Recipe.objects.all(), fields=["title", "description"]
            ),
        ]

    def validate(self, request_data):
        if request_data["cooking_time"] < request_data["oven_time"]:
            raise serializers.ValidationError(
                "Общее время готовки не может быть меньше времени активной готовки"
            )

        ingr_counter = Counter(
            [item["ingredient"] for item in request_data["ingredients"]]
        )
        ingr_duplicated = [key for key, value in ingr_counter.items() if value > 1]
        if ingr_duplicated:
            raise serializers.ValidationError(
                f"Ingredients cannot be duplicated: {', '.join([i.name for i in ingr_duplicated])}"
            )

        step_counter = Counter([item["step_number"] for item in request_data["steps"]])
        step_num_duplicated = [key for key, value in step_counter.items() if value > 1]

        if step_num_duplicated:
            raise serializers.ValidationError(
                f"Step numbers cannot be duplicated: {', '.join([str(i) for i in step_num_duplicated])}"
            )

        return request_data
