from drf_spectacular.openapi import OpenApiParameter
from drf_spectacular.utils import extend_schema
from loguru import logger
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView

from recipe.models import Ingredient, Measurement
from recipe.selectors import get_object, ingredient_list, measurement_list
from recipe.services import recipe_create
from recipe.utils import inline_serializer


class IngredientListApi(APIView):
    """
    Класс для представления эндпоинта по получению списка ингредиентов.
    Методы:
        get: Вернет список всех ингредиентов.
    Допустимые параметры запроса:
        name: Поиск ингредиента по суффиксу.
    """

    class OutputSerializer(serializers.Serializer):
        """Сериализатор выходящих данных."""

        id = serializers.IntegerField()
        name = serializers.CharField()

        class Meta:
            ref_name = "IngredientList"

    class FilterSerializer(serializers.Serializer):
        """Сериализатор параметров запроса."""

        name = serializers.CharField(required=False)

        class Meta:
            ref_name = "IngredientFilter"

    @extend_schema(
        operation_id="ingredients_list",
        summary="Список всех ингредиентов.",
        description="Эндпоинт получения списка всех ингредиентов с возможностью поиска "
        "по суффиксу.",
        tags=("Ingredients",),
        parameters=[
            OpenApiParameter(
                name="name",
                description="Поиск ингредиента по суффиксу.",
                type=str,
                location=OpenApiParameter.QUERY,
                required=False,
            )
        ],
        responses={200: OutputSerializer},
    )
    def get(self, request):
        logger.debug(request.query_params)
        filter_serializer = self.FilterSerializer(data=request.query_params)
        logger.debug(filter_serializer)
        filter_serializer.is_valid(raise_exception=True)
        ingredients = ingredient_list(filters=filter_serializer.validated_data)
        data = self.OutputSerializer(ingredients, many=True).data
        return Response(data)


class IngredientDetailApi(APIView):
    """
    Класс для представления эндпоинта по получению ингредиента.
    Методы:
        get: Вернет конкретный ингредиент.
    Допустимые параметры пути:
        id: ID необходимого ингредиента.
    """

    class OutputSerializer(serializers.Serializer):
        """Сериализатор выходящих данных."""

        id = serializers.IntegerField()
        name = serializers.CharField()

        class Meta:
            ref_name = "IngredientDetail"

    @extend_schema(
        operation_id="ingredient_detail",
        summary="Получить ингредиент по ID.",
        description="Эндпоинт получения ингредиента по ID.",
        tags=("Ingredients",),
        parameters=[
            OpenApiParameter(
                name="id",
                description="ID ингредиента.",
                type=int,
                location=OpenApiParameter.PATH,
                required=True,
            )
        ],
        responses={200: OutputSerializer},
    )
    def get(self, request, id=None):
        ingredient = get_object(Ingredient, id=id)
        data = self.OutputSerializer(ingredient).data
        return Response(data)


class MeasurementListApi(APIView):
    """
    Класс для представления эндпоинта по получению списка мер измерений.
    Методы:
        get: Вернет список всех мер измерений.
    """

    class OutputSerializer(serializers.Serializer):
        """Сериализатор выходящих данных."""

        id = serializers.IntegerField()
        name = serializers.CharField()
        abbreviation = serializers.CharField()

        class Meta:
            ref_name = "MeasurementList"

    @extend_schema(
        operation_id="measurement_list",
        summary="Список всех мер измерений.",
        description="Эндпоинт получения списка всех мер измерений.",
        tags=("Measurements",),
        responses={200: OutputSerializer},
    )
    def get(self, request):
        measurements = measurement_list()
        data = self.OutputSerializer(measurements, many=True).data
        return Response(data)


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
        cooking_time = serializers.IntegerField(required=True)
        oven_time = serializers.IntegerField(required=True)
        complexity = serializers.IntegerField(required=True)
        ingredients = inline_serializer(
            fields={
                "ingredient_id": serializers.PrimaryKeyRelatedField(
                    queryset=Ingredient.objects.all()
                ),
                "measurement_id": serializers.PrimaryKeyRelatedField(
                    queryset=Measurement.objects.all()
                ),
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

    @extend_schema(
        operation_id="recipe_create",
        summary="Создать рецепт.",
        description="Эндпоинт создания рецепта.",
        tags=("Recipes",),
        request=InputSerializer,
        responses={201: []},
    )
    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        recipe_create(serializer.validated_data)
        return Response(status=status.HTTP_201_CREATED)
