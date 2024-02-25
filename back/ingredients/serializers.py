from rest_framework import serializers

from recipe.models import Ingredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ("id", "name", "category", "sort")


class IngredientQuerySerializer(serializers.Serializer):
    """Сериализатор параметров запроса."""

    name = serializers.CharField(required=False)
