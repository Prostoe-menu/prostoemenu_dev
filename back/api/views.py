from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.settings import api_settings
from recipe.models import Recipe, Ingredient, Measurement
from .serializers import (RecipeDisplaySerializer,
                          RecipeCreateSerializer,
                          IngredientSerializer, MeasurementSerializer)
from rest_framework.response import Response


class RecipeList(APIView):
    def get(self, request, format=None):
        recipes = Recipe.objects.all()

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
            serializer = IngredientSerializer(ingredient)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class IngredientList(APIView):
    def get(self, request, prefix):
        if len(prefix) < 3:
            return Response(
                "Length less than 3 characters",
                status=status.HTTP_400_BAD_REQUEST)

        ingredients = Ingredient.objects.filter(Q(name__startswith=prefix) | Q(
            name__icontains=prefix)).distinct().order_by('name')

        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        paginator = pagination_class()

        page = paginator.paginate_queryset(ingredients, request, view=self)
        serializer = IngredientSerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)


class MeasurementList(APIView):
    def get(self, request):
        measurements = Measurement.objects.all()
        serializer = MeasurementSerializer(measurements, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
