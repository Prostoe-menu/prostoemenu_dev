from rest_framework import serializers

from ingredients.models import Ingredient


# class IngredientOutputSerializer(serializers.Serializer):
    # id = serializers.IntegerField()
    # name = serializers.CharField()
    # category = serializers.CharField()
    # sort = serializers.IntegerField()

class IngredientOutputSerializer(serializers.Serializer):
    class Meta:
        fields = ["name", "category", "sort"]

