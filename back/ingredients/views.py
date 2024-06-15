from common.pagination import LargeResultsSetPagination
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from .selectors import ingredient_get, ingredient_list
from .serializers.input import IngredientQueryInputSerializer
from .serializers.output import IngredientOutputSerializer


class IngredientDetailApi(APIView):
    @extend_schema(
        summary="Получить ингредиент по ID.",
        description="Эндпоинт получения ингредиента по ID.",
        tags=("Ingredients",),
        parameters=[
            OpenApiParameter(
                name="id", type=int, location=OpenApiParameter.PATH, required=True
            )
        ],
        responses={200: IngredientOutputSerializer},
        operation_id="ingredient_detail_api",
    )
    def get(self, request, id):
        ingredient = ingredient_get(ingredient_id=id)
        serializer = IngredientOutputSerializer(ingredient)
        return Response(serializer.data)


class IngredientListApi(APIView):
    pagination_class = LargeResultsSetPagination

    @extend_schema(
        summary="Получить список ингредиентов.",
        description="Эндпоинт получения списка ингредиентов. Доступен поиск \
                     по вхождению.",
        tags=("Ingredients",),
        parameters=[
            OpenApiParameter(
                name="name",
                description="Поиск ингредиента по вхождению.",
                type=str,
                location=OpenApiParameter.QUERY,
                required=False,
                examples=[
                    OpenApiExample(
                        name="Пример 1.",
                        description="Поиск любых ингредиентов по вхождению в названии.",
                        value="мол",
                    )
                ],
            )
        ],
        responses={200: IngredientOutputSerializer(many=True)},
        operation_id="ingredient_list_api",
    )
    def get(self, request):
        query_serializer = IngredientQueryInputSerializer(data=request.query_params)
        query_serializer.is_valid(raise_exception=True)

        ingredients = ingredient_list(query_serializer.validated_data)
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(ingredients, request)
        serializer_output = IngredientOutputSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer_output.data)
