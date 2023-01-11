from rest_framework import serializers
from django import forms
from recipes.models import Recipe, Ingredients, Category, Nation


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('id', 'name')
        model = Ingredients


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Recipe


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        fields = "__all__"
        model = Category


class NationSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Nation
