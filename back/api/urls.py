from django.urls import path
from .views import RecipeList, RecipeDetail

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
]