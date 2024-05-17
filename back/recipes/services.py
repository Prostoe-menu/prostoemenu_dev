from django.db import transaction

from .models import Recipe, RecipeIngredient, RecipeStep
from .selectors import recipe_get


@transaction.atomic
def recipe_create(raw_data: dict):
    recipe = Recipe.objects.create(
        title=raw_data["title"],
        description=raw_data["description"],
        cover_path=raw_data["cover_path"],
        complexity=raw_data["complexity"],
        cooking_time=raw_data["cooking_time"],
        oven_time=raw_data["oven_time"],
        quantity=raw_data["quantity"],
        category=raw_data["category"]
    )

    raw_steps = raw_data["steps"]
    for item in raw_steps:
        RecipeStep.objects.create(
            recipe=recipe,
            step_number=item["step_number"],
            description=item["description"],
            image=item["image"],
        )

    raw_ingredients = raw_data["ingredients"]
    for item in raw_ingredients:
        RecipeIngredient.objects.create(
            recipe=recipe,
            ingredient=item["ingredient"],
            volume=item["volume"],
            measure=item["measure"],
        )

    return recipe_get(id=recipe.id)
