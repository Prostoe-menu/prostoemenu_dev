from .views import (RecipeList,
                    RecipeDetail)
from django.urls import path


urlpatterns = [
    path('', RecipeList.as_view()),
    path('<int:id>/', RecipeDetail.as_view()),
]
