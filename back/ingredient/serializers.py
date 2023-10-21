from recipe.models import Ingredient
from rest_framework import serializers


class IngredientSerializerAllFields(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'sort')
