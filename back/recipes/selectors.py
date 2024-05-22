from django.shortcuts import get_object_or_404

from .models import Recipe


def recipe_list():
    return Recipe.objects.all()


def recipe_get(**kwargs):
    qs = Recipe.objects.prefetch_related(
        "steps", "ingredients__ingredient", "ingredients__measure"
    )
    return get_object_or_404(qs, **kwargs)
