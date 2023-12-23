from .serializers import (RecipeDisplaySerializer,
                          RecipeCreateSerializer,
                          RecipeListSerializer)
from recipe.models import Recipe
from django.db.models import (Q,
                              Count)
from drf_spectacular.utils import (extend_schema,
                                   OpenApiParameter,
                                   OpenApiExample)

from functools import reduce
from operator import or_
from rest_framework import status
from rest_framework.decorators import APIView

from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.settings import api_settings


class RecipeList(APIView):
    @extend_schema(
        summary='Получить список рецептов.',
        description='Эндпоинт для получения списка рецептов.',
        tags=('Recipes',),
        responses={200: RecipeListSerializer},
        parameters=[
            OpenApiParameter(
                name='ingredients_search[]',
                location=OpenApiParameter.QUERY,
                description='Поиск по одному или нескольким \
                             ингредиентам в рецептах.',
                required=False,
                type=str,
                examples=[
                    OpenApiExample(
                        'Пример 1',
                        description='Пример с одним ингредиентом',
                        value='?ingredients_search[]=соль',
                    ),
                    OpenApiExample(
                        'Пример 2',
                        description='Пример с несколькими ингредиентами',
                        value='?ingredients_search[]=соль&'
                              'ingredients_search[]=сахар'
                    )
                ]
            ),
            OpenApiParameter(
                name='strong_ingredients_search[]',
                location=OpenApiParameter.QUERY,
                description='Жесткий поиск по одному или нескольким \
                             ингредиентам в рецептах. Будут найдены \
                             только те рецепты, для которых нужны \
                             только эти ингредиенты.',
                required=False,
                type=str,
                examples=[
                    OpenApiExample(
                        'Пример 1',
                        description='Пример с одним ингредиентом.',
                        value='?strong_ingredients_search[]=соль'
                    ),
                    OpenApiExample(
                        'Пример 2',
                        description='Пример с несколькими ингредиентами.',
                        value='?strong_ingredients_search[]=соль&'
                              'strong_ingredients_search[]=сахар'
                    )
                ]
            ),
            OpenApiParameter(
                name='name_description_search',
                location=OpenApiParameter.QUERY,
                description='Поиск по совпадениям в описании или названии.',
                required=False,
                type=str,
                examples=[
                    OpenApiExample(
                        'Пример 1',
                        description='Пример с поиском по совпадению в \
                                     описании.',
                        value='?name_description_search=достать маринад',
                    ),
                    OpenApiExample(
                        'Пример 2',
                        description='Пример с поиском по совпадению в \
                                     названии.',
                        value='?name_description_search=борщ'
                    )
                ]
            ),
            OpenApiParameter(
                name='recipe_name_prefix',
                location=OpenApiParameter.QUERY,
                description='Поиск по началу в названии (по суффиксу).',
                required=False,
                type=str,
                examples=[
                    OpenApiExample(
                        'Пример 1',
                        description='Пример с поиском по названию в \
                            начале.',
                        value='?recipe_name_prefix=макаро',
                    ),
                    OpenApiExample(
                        'Пример 2',
                        description='Пример с поиском по названию в \
                            начале.',
                        value='?recipe_name_prefix=Макароны'
                    )
                ]
            ),
        ]
    )
    def get(self, request, format=None):
        """ Получить список рецептов"""
        ingredients_search = request.query_params.getlist(
            "ingredients_search[]")
        strong_ingredients_search = request.query_params.getlist(
            "strong_ingredients_search[]")
        name_description_search = request.query_params.get(
            'name_description_search')
        recipe_name_prefix = request.query_params.get('recipe_name_prefix')
        complexity = request.query_params.get('complexity')
        cooking_time_lte = request.query_params.get('cooking_time_lte')
        cooking_time_gte = request.query_params.get('cooking_time_gte')
        cooking_time = request.query_params.get('cooking_time')
        exclude_ingredients = request.query_params.getlist(
            'exclude_ingredients[]')

        recipes = Recipe.objects.prefetch_related('ingredient__ingredient',
                                                  'recipesteps_set__step',
                                                  'recipephotos_set')
        if ingredients_search:
            for ingredient in ingredients_search:
                recipes |= Recipe.objects.filter(
                    ingredient__name__icontains=ingredient)
            recipes = recipes.annotate(
                num_occurences=Count(
                    reduce(
                        or_, (Q(
                            ingredient__name__icontains=ingredient) for ingredient in ingredients_search)))).order_by(
                '-num_occurences')

        elif strong_ingredients_search:
            for ingredient in strong_ingredients_search:
                recipes &= Recipe.objects.filter(
                    ingredient__name__icontains=ingredient)
        else:
            recipes = Recipe.objects.all()

        if name_description_search:
            recipes = recipes.filter(Q(description__icontains=name_description_search) |
                                     Q(name__icontains=name_description_search))
        if recipe_name_prefix:
            recipes = recipes.filter(name__startswith=recipe_name_prefix)
        if complexity:
            recipes = recipes.filter(complexity=complexity)
        if cooking_time_lte:
            recipes = recipes.filter(cooking_time__lte=cooking_time_lte)
        if cooking_time_gte:
            recipes = recipes.filter(cooking_time__gte=cooking_time_gte)
        if cooking_time:
            recipes = recipes.filter(cooking_time=cooking_time)
        if exclude_ingredients:
            recipes = recipes.exclude(
                reduce(
                    or_, (Q(
                        ingredient__name__icontains=exclude) for exclude in exclude_ingredients)))

        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        paginator = pagination_class()
        page = paginator.paginate_queryset(recipes, request, view=self)
        serializer = RecipeListSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

    @extend_schema(
        summary='Добавить рецепт.',
        description='Эндпоинт для добавления рецепта.',
        tags=('Recipes',),
        request=RecipeCreateSerializer,
        responses={201: RecipeDisplaySerializer}
    )
    def post(self, request, format=None):
        serializer = RecipeCreateSerializer(data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = RecipeDisplaySerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            new_error = {}
            for field_name, field_errors in default_errors.items():
                new_error[field_name] = field_errors[0]
            return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetail(APIView):
    @extend_schema(
        summary='Получить рецепт по ID.',
        description='Эндпоинт получения рецепта по ID.',
        tags=('Recipes',),
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                required=True
            )
        ],
        responses={200: RecipeDisplaySerializer},
    )
    def get(self, request, id=None):
        recipe_obj = get_object_or_404(Recipe, id=id)

        if recipe_obj:
            recipe = Recipe.objects.filter(id=id)
            serializer = RecipeDisplaySerializer(recipe, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @extend_schema(
        summary='Удалить рецепт по ID.',
        description='Эндпоинт удаления рецепта по ID.',
        tags=('Recipes',),
        parameters=[
            OpenApiParameter(
                name='id',
                type=int,
                location=OpenApiParameter.PATH,
                required=True
            )
        ]
    )
    def delete(self, request, id=None):
        recipe = Recipe.objects.filter(id=id)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
