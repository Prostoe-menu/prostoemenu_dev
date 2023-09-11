from drf_spectacular.openapi import OpenApiParameter
from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from recipe.models import Ingredient
from recipe.selectors import get_object, ingredient_list


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
        filter_serializer = self.FilterSerializer(data=request.query_params)
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
