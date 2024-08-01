from django.db.models import Count, Q
from django.shortcuts import get_object_or_404

from ingredients.models import Ingredient

from .models import Recipe


def recipe_search_by_ingr(request_data):
    ingr_excluded = set(
        i["name"]
        for i in Ingredient.objects.filter(category__name__iexact="приправа").values(
            "name"
        )
    )
    user_ingr_clean = list(set(request_data["ingr"]).difference(ingr_excluded))
    # region comment
    # ingr_delta - разница между ингредиентами рецепта, очищенными от специй, и очищенными ингредиентами пользователя.
    # endregion comment
    recipes = (
        Recipe.objects.prefetch_related("ingredients")
        .annotate(
            ingr_delta=(
                Count(
                    "ingredients",
                    filter=~Q(ingredients__ingredient__name__in=ingr_excluded),
                    distinct=True,
                )
                - Count(
                    "ingredients",
                    filter=Q(ingredients__ingredient__name__in=user_ingr_clean),
                    distinct=True,
                )
            ),
        )
        .filter(ingredients__ingredient__name__in=user_ingr_clean)
        .order_by("ingr_delta", "title")
    )

    if bingo := [i for i in recipes if i.ingr_delta == 0]:
        return bingo
    return recipes


def recipe_list():
    return Recipe.objects.all()


def recipe_get(**kwargs):
    qs = Recipe.objects.prefetch_related(
        "steps", "ingredients__ingredient", "ingredients__measure"
    )
    return get_object_or_404(qs, **kwargs)
