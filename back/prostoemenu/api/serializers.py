from rest_framework import serializers
from recipe.models import *

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('name', 'description', 'quantity', 'complexity')


class RecipeAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('name', 'description', 'cooking_time', 'quantity', 'complexity', 'info')


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('name',)
