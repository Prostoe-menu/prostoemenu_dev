from recipe.models import Recipe, Ingredient
from rest_framework.serializers import ValidationError


def recipe_create(data) -> Recipe:
    ingredient_ids = set()
    ingredients = data["ingredients"]
    for ingredient in ingredients:
        ingredient_id = ingredient.get("ingredient_id")
        if ingredient_id in ingredient_ids:
            raise ValidationError(
                "Среди ингредиентов найдены повторяющиеся ингредиенты."
            )
        ingredient_ids.add(ingredient_id)
    unknown_ingredients = ingredient_ids - {value["id"] for value in tuple(Ingredient.objects.all().values("id"))}
    if unknown_ingredients:
        raise ValidationError(f"Ингредиенты {unknown_ingredients} не найдены в базе данных.")

    recipe = Recipe.objects.create(**data)
    return recipe
