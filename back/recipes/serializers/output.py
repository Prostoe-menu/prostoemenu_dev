from rest_framework import serializers


class RecipeStepOutSerializer(serializers.Serializer):
    step_number = serializers.IntegerField()
    description = serializers.CharField()
    image = serializers.ImageField()


class RecipeIngredientOutSerializer(serializers.Serializer):
    id = serializers.IntegerField(source="ingredient.id")
    name = serializers.CharField(source="ingredient.name")
    volume = serializers.IntegerField()
    measure = serializers.CharField(source="measure.abbreviation")


class RecipeOutputSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    cover_path = serializers.ImageField(use_url=True)
    complexity = serializers.IntegerField()
    cooking_time = serializers.IntegerField()
    oven_time = serializers.IntegerField()
    quantity = serializers.IntegerField()
    ingredients = RecipeIngredientOutSerializer(many=True)
    steps = RecipeStepOutSerializer(many=True)
