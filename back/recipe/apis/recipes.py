from drf_spectacular.utils import extend_schema
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from recipe.selectors import get_object, recipe_list
from recipe.services import recipe_create
from recipe.utils import inline_serializer


class RecipeCreateApi(APIView):
    """
    Класс для представления эндпоинта по созданию рецепта.
    Методы:
        post: вернет ответ со статусом результата.
    """

    class InputSerializer(serializers.Serializer):
        """Сериализатор входящих данных."""

        name = serializers.CharField(required=True)
        description = serializers.CharField(required=True)
        cooking_time = serializers.IntegerField(required=True, min_value=1)
        oven_time = serializers.IntegerField(required=True, min_value=1)
        complexity = serializers.IntegerField(required=True, min_value=1)
        ingredients = inline_serializer(
            fields={
                "ingredient_id": serializers.IntegerField(),
                "measurement_id": serializers.IntegerField(),
                "amount": serializers.FloatField(min_value=0),
            },
            many=True,
        )
        steps = inline_serializer(
            fields={
                "step_number": serializers.IntegerField(),
                "description": serializers.CharField(),
            },
            many=True,
        )

        class Meta:
            ref_name = "RecipeCreate"
    
    
    class OutputSerializer(serializers.Serializer):
        """Сериализатор выходящих данных."""
        
        id = serializers.ReadOnlyField()
        name = serializers.CharField()
        description = serializers.CharField()
        cooking_time = serializers.IntegerField()
        oven_time = serializers.IntegerField()
        complexity = serializers.IntegerField()
        ingredients = serializers.JSONField()
        steps = serializers.JSONField()
        
        class Meta:
            ref_name = "RecipeCreate"

    @extend_schema(
        operation_id="recipe_create",
        summary="Создать рецепт.",
        description="Эндпоинт создания рецепта.",
        tags=("Recipes",),
        request=InputSerializer,
        responses={201: OutputSerializer},
    )
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipe = recipe_create(serializer.validated_data)
        response = self.OutputSerializer(recipe).data
        return Response(status=status.HTTP_201_CREATED, data=response)


class RecipeListApi(APIView):
    """
    Класс для представления эндпоинта по получению списка рецептов.
    Методы:
        get: Вернет список всех рецептов.
    """
    
    class OutputSerializer(serializers.Serializer):
        name = serializers.CharField()
        description = serializers.CharField()
        cooking_time = serializers.IntegerField()
        oven_time = serializers.IntegerField()
        complexity = serializers.IntegerField()
        ingredients = serializers.JSONField()
        steps = serializers.JSONField()
        
        class Meta:
            ref_name = "RecipeList"
    
    @extend_schema(
        operation_id="recipes_list",
        summary="Список всех рецептов.",
        description="Эндпоинт получения списка всех рецептов.",
        tags=("Recipes",),
        responses={200: OutputSerializer},
    )
    def get(self, request):
        recipes = recipe_list()
        data = self.OutputSerializer(recipes, many=True).data
        return Response(data)
