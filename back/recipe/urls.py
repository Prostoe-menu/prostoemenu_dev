from .views import (RecipeList,
                    RecipeDetail)
from django.urls import path

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
]
