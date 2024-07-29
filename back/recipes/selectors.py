from django.db.models import Count, Q
from django.shortcuts import get_object_or_404

from .models import Recipe


def recipe_search_by_ingr(request_data):
    recipes = (
        Recipe.objects.prefetch_related("ingredients__ingredient")
        .filter(ingredients__ingredient__name__in=request_data["ingr"])
        .annotate(
            ingr_included=Count(
                "pk",
                filter=Q(ingredients__ingredient__name__in=request_data["ingr"]),
            )
        )
        .order_by("-ingr_included")
    )
    return recipes


def recipe_list():
    return Recipe.objects.all()


def recipe_get(**kwargs):
    qs = Recipe.objects.prefetch_related(
        "steps", "ingredients__ingredient", "ingredients__measure"
    )
    return get_object_or_404(qs, **kwargs)
