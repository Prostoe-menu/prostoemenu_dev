from django.urls import path
from .views import RecipeList, RecipeDetail, IngredientDetail, IngredientList, MeasurementList, RecipeDay, NewRecipes, \
    NewRecipeDay


urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
    path('measurements/', MeasurementList.as_view()),
    path('recipe_day/', RecipeDay.as_view()),
    path('new_recipes/', NewRecipes.as_view()),
    path('new_recipesday/', NewRecipeDay.as_view()),
]
