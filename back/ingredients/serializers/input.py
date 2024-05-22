from rest_framework import serializers


class IngredientQueryInputSerializer(serializers.Serializer):
    """Сериализатор параметров запроса."""

    name = serializers.CharField(required=False)
