from django.urls import path
from .views import *

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('kaiten/', KaitenData.as_view()),
]

