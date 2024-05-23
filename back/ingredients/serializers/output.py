from rest_framework import serializers


class IngredientOutputSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    category = serializers.CharField()
    sort = serializers.IntegerField()
