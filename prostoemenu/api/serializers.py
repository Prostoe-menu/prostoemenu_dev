from rest_framework import serializers
from django import forms
from recipes.models import Recipe, Ingredients


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'name')
        model = Ingredients


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id',
                  'title',
                  'description',
                  'image',
                  'ingredients',
                  'cooking_method',
                  'cooking_time',
                  'is_published')
        model = Recipe
