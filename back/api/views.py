from functools import reduce
from operator import or_

from django.db.models import Q, Count
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.settings import api_settings
from recipe.models import Recipe, Ingredient, Measurement
from .serializers import (RecipeDisplaySerializer,
                          RecipeCreateSerializer,
                          IngredientSerializerAllFields,
                          MeasurementSerializer, IngredientSerializer)
from rest_framework.response import Response


class RecipeList(APIView):
    def get(self, request, format=None):
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
                            ingredient__name__icontains=ingredient) for ingredient in ingredients_search)))).order_by('-num_occurences')

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

        serializer = RecipeDisplaySerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

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
    def get(self, request, id=None):
        recipe_obj = get_object_or_404(Recipe, id=id)

        if recipe_obj:
            recipe = Recipe.objects.filter(id=id)
            serializer = RecipeDisplaySerializer(recipe, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id=None):
        recipe = Recipe.objects.filter(id=id)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IngredientDetail(APIView):
    def get(self, request, id=None):
        ingredient_obj = get_object_or_404(Ingredient, id=id)
        if ingredient_obj:
            ingredient = Ingredient.objects.get(id=id)
            serializer = IngredientSerializerAllFields(ingredient)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class IngredientList(APIView):
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
                reduce(or_, (Q(
                    name=exclude) for exclude in exclude_ingredients)))
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


class MeasurementList(APIView):
    def get(self, request):
        measurements = Measurement.objects.all()
        serializer = MeasurementSerializer(measurements, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
