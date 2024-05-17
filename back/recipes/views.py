from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import APIView
from rest_framework.response import Response
#from rest_framework.parsers import MultiPartParser, FormParser

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
    @extend_schema(
        summary="Получить список рецептов.",
        description="Эндпоинт для получения списка рецептов.",
        tags=("Recipes",),
        responses={200: RecipeOutputSerializer(many=True)},
        operation_id="recipe_list_api",
    )
    def get(self, request):
        recipes = recipe_list()
        serializer = RecipeOutputSerializer(recipes, many=True)
        return Response(serializer.data)


class RecipeCreateApi(APIView):
    #parser_classes = (MultiPartParser, FormParser)
    @extend_schema(
        summary="Создать рецепт.",
        description="""Эндпоинт создания рецепта.\n
            title - Название рецепта.
            description - Описание рецепта.
            cover_path - Главное изображение рецепта.
            complexity - Сложность рецепта.
            cooking_time - Общее время приготовления.
            oven_time - Время "у плиты".
            quantity - Количество порций.
            ingredients - Ингредиенты в рецепте.
                ingredient - Идентификатор ингредиента.
                measure - Идентификатор меры измерения.
                volume - Количество ингредиента в выбранной мере измерения.
            steps - Шаги пригтовления.
                step_number - порядковый номер шага.
                description - Описание действий в текущем шаге.
                image - Изображение для текущего шага.
        """,
        tags=("Recipes",),
        request=RecipeInputSerializer,
        responses={200: RecipeOutputSerializer},
        operation_id="recipe_create_api",
    )
    def post(self, request):
        input_serializer = RecipeInputSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        recipe = recipe_create(input_serializer.validated_data)
        output_serializer = RecipeOutputSerializer(recipe)
        return Response(output_serializer.data)
