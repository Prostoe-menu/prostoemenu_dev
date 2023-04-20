from django.urls import path
from .views import RecipeList, RecipeDetail, IngredientDetail, IngredientList, MeasurementList

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
    path('measurements/', MeasurementList.as_view()),
]
