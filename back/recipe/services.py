from django.shortcuts import get_object_or_404
from rest_framework.serializers import ValidationError

from recipe.models import Ingredient, Recipe


def recipe_create(data) -> Recipe:
    ingredient_ids = set()
    ingredients = data["ingredients"]
    for ingredient in ingredients:
        ingredient_id = ingredient.get("ingredient_id")
        if ingredient_id in ingredient_ids:
            raise ValidationError(
                {
                    "success": False,
                    "error": {
                        "msg": "Среди ингредиентов найден повторяющийся ингредиент.",
                        "detail": ingredient_id,
                    },
                }
            )
        ingredient_ids.add(ingredient_id)
    all_ingredient = {
        value["id"] for value in tuple(Ingredient.objects.all().values("id"))
    }
    unknown_ingredients = ingredient_ids - all_ingredient
    if unknown_ingredients:
        raise ValidationError(
            {
                "success": False,
                "error": {
                    "msg": "Ингредиенты не найдены в базе данных.",
                    "detail": list(unknown_ingredients),
                },
            }
        )
    recipe = Recipe.objects.create(**data)
    return recipe


def obj_delete(model, id: int):
    recipe = get_object_or_404(model, id=id)
    recipe.delete()
