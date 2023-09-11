from django.urls import path

from recipe.apis.ingredients import (
    IngredientDetailApi,
    IngredientListApi,
)
from recipe.apis.measurements import MeasurementListApi
from recipe.apis.recipes import RecipeCreateApi, RecipeListApi

urlpatterns = [
    path("ingredients/", IngredientListApi.as_view(), name="ingredients_list"),
    path(
        "ingredients/<int:id>/", IngredientDetailApi.as_view(), name="ingredient_detail"
    ),
    path("measurements/", MeasurementListApi.as_view(), name="measurements_list"),
    path("create/", RecipeCreateApi.as_view(), name="recipe_create"),
    path("", RecipeListApi.as_view(), name="recipes_list"),
]
