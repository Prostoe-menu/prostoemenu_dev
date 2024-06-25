from common.validators import AcceptedSymbolsValidator
from django.conf import settings as django_settings
from rest_framework import serializers


class IngredientQueryInputSerializer(serializers.Serializer):
    """Сериализатор параметров запроса."""

    name = serializers.CharField(
        required=False,
        min_length=django_settings.MIN_TEXT_FIELD_SEARCH_LENGTH,
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)],
    )
