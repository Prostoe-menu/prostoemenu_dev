from django.shortcuts import get_object_or_404

from .models import Ingredient


def ingredient_list(query_params: dict):
    ingredients = Ingredient.objects.all()

    if query_name := query_params.get("name"):
        ingredients = ingredients.filter(name__icontains=query_name)

    return ingredients


def ingredient_get(ingredient_id):
    ingredient = get_object_or_404(Ingredient, id=ingredient_id)
    return ingredient
