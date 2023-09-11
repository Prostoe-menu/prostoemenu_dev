from django.http import Http404
from django.shortcuts import get_object_or_404

from recipe.filters import BaseIngdredientFilter
from recipe.models import Ingredient, Measurement, Recipe


def ingredient_list(filters=None):
    """
    Возвращает список всех ингредиентов.
    Returns:
        QuerySet: A QuerySet containing all instances of the Ingredient model.
    """
    filters = filters or {}
    qs = Ingredient.objects.all()
    return BaseIngdredientFilter(filters, qs).qs


def get_object(model, **kwargs):
    try:
        return get_object_or_404(model, **kwargs)
    except Http404:
        return None


def measurement_list():
    return Measurement.objects.all()

def recipe_list():
    return Recipe.objects.all()
