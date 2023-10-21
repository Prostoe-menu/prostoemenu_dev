from rest_framework.decorators import APIView
from drf_spectacular.utils import (extend_schema,
                                   OpenApiParameter,
                                   OpenApiExample)
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status
from recipe.models import Ingredient
from .serializers import (IngredientSerializerAllFields,
                          IngredientSerializer)

from functools import reduce
from operator import or_
from django.db.models import Q

class IngredientDetail(APIView):
    @extend_schema(
        summary='Получить ингредиент по ID.',
        description='Эндпоинт получения ингредиента по ID.',
        tags=('Ingredients',),
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                required=True
            )
        ],
        responses={200: IngredientSerializerAllFields}
    )
    def get(self, request, id=None):
        ingredient_obj = get_object_or_404(Ingredient, id=id)
        if ingredient_obj:
            ingredient = Ingredient.objects.get(id=id)
            serializer = IngredientSerializerAllFields(ingredient)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class IngredientList(APIView):
    @extend_schema(
        summary='Получить список ингредиентов.',
        description='Эндпоинт получения списка ингредиентов. Доступен поиск \
                     по суффиксу.',
        tags=('Ingredients',),
        parameters=[
            OpenApiParameter(
                name='ingredient_suffix',
                description='Поиск ингредиента по суффиксу.',
                type=str,
                location=OpenApiParameter.QUERY,
                required=False,
                examples=[
                    OpenApiExample(
                        name='Пример 1.',
                        description='Поиск крахмала по суффиксу.',
                        value='?ingredient_suffix=крах',
                    )
                ],
            )
        ],
        responses={200: IngredientSerializerAllFields}
    )
    def get(self, request):
        ingredient_suffix = request.query_params.get('ingredient_suffix')
        exclude_ingredients = request.query_params.getlist(
            'exclude_ingredients[]')
        category = request.query_params.get('category')
        sort_by_name = request.query_params.get('sort_by_name')
        no_category = request.query_params.get('no_category')

        if ingredient_suffix:
            if len(ingredient_suffix) < 3:
                return Response(
                    "Length less than 3 characters",
                    status=status.HTTP_400_BAD_REQUEST)
            ingredients = Ingredient.objects.filter(
                name__icontains=ingredient_suffix).order_by('sort')
        else:
            ingredients = Ingredient.objects.all()

        if exclude_ingredients:
            ingredients = ingredients.exclude(
                reduce(or_, (Q(name=exclude) for exclude in exclude_ingredients)))
        if category:
            ingredients = ingredients.filter(category=category)
        if sort_by_name == 'true':
            ingredients = ingredients.order_by('name')
        if no_category is None:
            ingredients = ingredients.exclude(sort=10)

        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        paginator = pagination_class()
        page = paginator.paginate_queryset(ingredients, request, view=self)

        if no_category:
            serializer = IngredientSerializer(page, many=True)
        else:
            serializer = IngredientSerializerAllFields(page, many=True)

        return paginator.get_paginated_response(serializer.data)