from django.db.models import Count, Q
from django.shortcuts import get_object_or_404

from ingredients.models import Ingredient

from .models import Recipe


def recipe_search_by_ingr(request_data):
    ingr_excluded = (
        Ingredient.objects.select_related("category")
        .filter(category__name__iexact="приправа")
        .values("name")
    )
    ingr_excluded = {i["name"] for i in ingr_excluded}
    ingr_lst = list(set(request_data["ingr"]).difference(ingr_excluded))

    recipes = (
        Recipe.objects.prefetch_related("ingredients__ingredient")
        .filter(ingredients__ingredient__name__in=ingr_lst)
        .annotate(
            ingr_included=Count(
                "pk",
                filter=Q(ingredients__ingredient__name__in=ingr_lst),
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
