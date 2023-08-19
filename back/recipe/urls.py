from django.urls import path
from back.recipe.apis import IngredientListApi, IngredientDetailApi, MeasurementListApi


urlpatterns = [
    path("ingredients/", IngredientListApi.as_view(), name='ingredients_list'),
    path("ingredients/<int:id>/", IngredientDetailApi.as_view(), name='ingredients_detail'),
    path("measurements/", MeasurementListApi.as_view(), name='measurements_list'),
]
