from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from ingredients.models import Ingredient
from measurements.models import Measurement


class RecipeInredientInputSerializer(serializers.Serializer):
    ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())
    measure = serializers.PrimaryKeyRelatedField(queryset=Measurement.objects.all())
    volume = serializers.IntegerField(min_value=1)


class RecipeStepInputSerializer(serializers.Serializer):
    step_number = serializers.IntegerField(min_value=1)
    description = serializers.CharField()
    image = Base64ImageField(allow_null=True)


class RecipeInputSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=100)
    description = serializers.CharField()
    cover_path = Base64ImageField()
    complexity = serializers.IntegerField(min_value=1, max_value=3)
    cooking_time = serializers.IntegerField(min_value=1)
    oven_time = serializers.IntegerField(min_value=1)
    quantity = serializers.IntegerField(min_value=1)
    ingredients = RecipeInredientInputSerializer(many=True)
    steps = RecipeStepInputSerializer(many=True)
