from django.urls import path

from recipe.apis import (
    IngredientDetailApi,
    IngredientListApi,
    MeasurementListApi,
    RecipeCreateApi,
)

urlpatterns = [
    path("ingredients/", IngredientListApi.as_view(), name="ingredients_list"),
    path(
        "ingredients/<int:id>/", IngredientDetailApi.as_view(), name="ingredient_detail"
    ),
    path("measurements/", MeasurementListApi.as_view(), name="measurements_list"),
    path("create/", RecipeCreateApi.as_view(), name="recipe_create"),
]
