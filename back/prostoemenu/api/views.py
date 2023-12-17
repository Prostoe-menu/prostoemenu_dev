from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
def recipe_api_list(request, format=None):
    if request.method == 'GET':
        recipe_list = Recipe.objects.all()
#        recipe_list = Recipe.objects.raw("""
#        SELECT recipe_recipe.id, recipe_recipe.name, recipe_recipe.description, recipe_recipe.quantity, recipe_recipe.complexity
#FROM recipe_recipe
#        """)
        serializer = RecipeSerializer(recipe_list, many=True)
        return Response({'recipies': serializer.data})
    elif request.method == 'POST':
        serializer = RecipeAddSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def ingredient_api_list(request, format=None):
    if request.method == 'GET':
        ingredient_list = Ingredient.objects.all()
        serializer = IngredientSerializer(ingredient_list, many=True)
        return Response({'Ingredients': serializer.data})
    elif request.method == 'POST':
        serializer = IngredientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def recipe_api_detail(request, pk, format=None):
    recipe_obj = get_object_or_404(Recipe, pk=pk)

    if recipe_obj.exists:
        if request.method == 'GET':
            serializer = RecipeSerializer(recipe_obj)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = RecipeSerializer(recipe_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Данные успешно обновлены", "Recipe":serializer.data})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            recipe_obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT', 'DELETE'])
def ingredient_api_detail(request, pk, format=None):
    ingredient_obj = get_object_or_404(Ingredient, pk=pk)

    if ingredient_obj.exists:
        if request.method == 'GET':
            serializer = IngredientSerializer(ingredient_obj)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = IngredientSerializer(ingredient_obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Данные успешно обновлены", "Ingredient":serializer.data})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            ingredient_obj.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
