from common.pagination import StandardResultsSetPagination
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import APIView
from rest_framework.response import Response

from .selectors import recipe_get, recipe_list
from .serializers.input import RecipeInputSerializer
from .serializers.output import RecipeOutputSerializer
from .services import recipe_create


class RecipeDetailApi(APIView):
    @extend_schema(
        summary="Получить рецепт по ID.",
        description="Эндпоинт получения рецепта по ID.",
        tags=("Recipes",),
        parameters=[
            OpenApiParameter(
                name="id", type=int, location=OpenApiParameter.PATH, required=True
            )
        ],
        responses={200: RecipeOutputSerializer},
        operation_id="recipe_detail_api",
    )
    def get(self, request, id):
        recipe = recipe_get(id=id)
        serializer = RecipeOutputSerializer(recipe)
        return Response(serializer.data)


class RecipeListApi(APIView):
    pagination_class = StandardResultsSetPagination

    @extend_schema(
        summary="Получить список рецептов.",
        description="Эндпоинт для получения списка рецептов. "
                    "Доступен поиск рецепта по ингредиентам",
        tags=("Recipes",),
        responses={200: RecipeOutputSerializer(many=True)},
        operation_id="recipe_list_api",
    )
    def get(self, request):
        recipes = recipe_list()
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(recipes, request)
        serializer = RecipeOutputSerializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)


class RecipeCreateApi(APIView):

    @extend_schema(
        summary="Создать рецепт.",
        description="""Эндпоинт создания рецепта.\n
            title - название рецепта
            description - описание рецепта
            cover_path - главное изображение рецепта
            complexity - сложность рецепта [1; 3]
            cooking_time - общее время приготовления в минутах [1; 5999]
            oven_time - время активной готовки в минутах [1; 5999]
            quantity - количество порций [1; 10]
            ingredients - ингредиенты в рецепте:
                ingredient - идентификатор ингредиента
                measure - идентификатор единицы измерения
                volume - количество ингредиента в выбранной мере измерения
            steps - шаги приготовления:
                step_number - номер шага [1; 20]
                description - описание действий в текущем шаге
                image - изображение для текущего шага.
        """,
        tags=("Recipes",),
        request=RecipeInputSerializer,
        responses={200: RecipeOutputSerializer},
        operation_id="recipe_create_api",
    )
    def post(self, request):
        input_serializer = RecipeInputSerializer(
            data=request.data, context=request.data
        )
        input_serializer.is_valid(raise_exception=True)
        recipe = recipe_create(input_serializer.validated_data)
        output_serializer = RecipeOutputSerializer(recipe)
        return Response(output_serializer.data)
