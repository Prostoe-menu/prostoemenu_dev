from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from ingredients.models import Ingredient
from ingredients.serializers.output import IngredientOutputSerializer
from measurements.models import Measurement
from measurements.serializers.output import MeasurementOutputSerializer
from recipes.models import Recipe, Category, RecipeStep, RecipeIngredient

from django.conf import settings as django_settings
#from common.validators import validate_min_title_lenght


# class RecipeInredientInputSerializer(serializers.Serializer):
#     ingredient = serializers.PrimaryKeyRelatedField(queryset=Ingredient.objects.all())
#     measure = serializers.PrimaryKeyRelatedField(queryset=Measurement.objects.all())
#     volume = serializers.IntegerField(min_value=1)

class RecipeInredientInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredient
        fields = ["ingredient", "volume", "measure"]


# class RecipeStepInputSerializer(serializers.Serializer):
#     step_number = serializers.IntegerField(min_value=1)
#     description = serializers.CharField()
#     image = Base64ImageField(allow_null=True)


class RecipeStepInputSerializer(serializers.ModelSerializer):
    image = Base64ImageField(allow_null=True)
    class Meta:
        model = RecipeStep
        fields = ["step_number", "description", "image"]


# class RecipeInputSerializer(serializers.Serializer):
# title = serializers.CharField(max_length=10)
# description = serializers.CharField()
# cover_path = Base64ImageField()
# complexity = serializers.IntegerField(min_value=1, max_value=3)
# cooking_time = serializers.IntegerField(min_value=1)
# oven_time = serializers.IntegerField(min_value=1)
# quantity = serializers.IntegerField(min_value=1)
# category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
# ingredients = RecipeInredientInputSerializer(many=True)
# steps = RecipeStepInputSerializer(many=True)


class RecipeInputSerializer(serializers.ModelSerializer):
    steps = RecipeStepInputSerializer(many=True)
    ingredients = RecipeInredientInputSerializer(many=True)
 #   title = serializers.CharField(validators=[validate_min_title_lenght])
    cover_path = Base64ImageField()

    class Meta:
        model = Recipe
        fields = [
            "title",
            "description",
            "cooking_time",
            "oven_time",
            "quantity",
            "complexity",
            "category",
            "cover_path",
            "steps",
            "ingredients"
        ]

