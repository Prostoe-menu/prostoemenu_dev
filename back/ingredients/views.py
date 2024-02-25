from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiExample, OpenApiParameter, extend_schema
from rest_framework.response import Response
from rest_framework.views import APIView

from recipe.models import Ingredient

from .serializers import IngredientQuerySerializer, IngredientSerializer


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
        responses={200: IngredientSerializer},
        operation_id="ingredient_detail_api",
    )
    def get(self, request, id=None):
        ingredient = get_object_or_404(Ingredient, id=id)
        serializer = IngredientSerializer(ingredient)

        return Response(serializer.data)


class IngredientListApi(APIView):
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
        responses={200: IngredientSerializer(many=True)},
        operation_id="ingredient_list_api",
    )
    def get(self, request):
        query_serializer = IngredientQuerySerializer(data=request.query_params)
        query_serializer.is_valid(raise_exception=True)
        validated_query = query_serializer.validated_data
        query_name = validated_query.get("name")
        filtered_queryset = Ingredient.objects.filter(name__icontains=query_name)
        serializer_output = IngredientSerializer(filtered_queryset, many=True)
        return Response(serializer_output.data)
