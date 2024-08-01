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
    ingr_excluded = set(i["name"] for i in ingr_excluded)
    ingr_lst = list(set(request_data["ingr"]).difference(ingr_excluded))


    # recs = Recipe.objects.annotate(
    #     num_ingr=Count("ingredients"),
    #     num_ingr_clean=Count("ingredients", filter=~Q(ingredients__ingredient__name__in=ingr_excluded)),
    #     ingr_included=Count("pk", filter=Q(ingredients__ingredient__name__in=ingr_lst))
    # )
    # for r in recs:
    #     print(r.title, r.num_ingr, r.num_ingr_clean, r.ingr_included)


    recipes = Recipe.objects.prefetch_related("ingredients").annotate(
            ingr_total=Count("ingredients", distinct=True),
            ingr_clean=Count("ingredients", filter=~Q(ingredients__ingredient__name__in=ingr_excluded), distinct=True),
            ingr_included=Count("ingredients", filter=Q(ingredients__ingredient__name__in=ingr_lst), distinct=True),
            ingr_delta=(Count("ingredients", filter=~Q(ingredients__ingredient__name__in=ingr_excluded), distinct=True) - Count("ingredients", filter=Q(ingredients__ingredient__name__in=ingr_lst), distinct=True)),
        ).filter(ingredients__ingredient__name__in=ingr_lst).order_by("ingr_delta", "title")


    # recipes = Recipe.objects.filter(ingredients__ingredient__name__in=ingr_lst)
    # recipes = Recipe.objects.filter(pk__in=recipes).annotate(ingr_total=Count("ingredients"),
    #      ingr_clean=Count("ingredients", filter=~Q(ingredients__ingredient__name__in=ingr_excluded)),
    #      ingr_included=Count("pk", filter=Q(ingredients__ingredient__name__in=ingr_lst)),
    # ).order_by("-ingr_included")

    print(recipes.query)
    for rec in recipes:
        print(rec.title, rec.ingr_total, rec.ingr_clean, rec.ingr_included, rec.ingr_delta)
    return recipes


def recipe_list():
    return Recipe.objects.all()


def recipe_get(**kwargs):
    qs = Recipe.objects.prefetch_related(
        "steps", "ingredients__ingredient", "ingredients__measure"
    )
    return get_object_or_404(qs, **kwargs)
