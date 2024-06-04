from rest_framework import serializers

from common.validators import validate_accepted_symbols


class IngredientQueryInputSerializer(serializers.Serializer):
    """Сериализатор параметров запроса."""

    name = serializers.CharField(
        required=False, min_length=3, validators=[validate_accepted_symbols]
    )
