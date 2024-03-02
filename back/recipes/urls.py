from django.urls import path

from .views import RecipeCreateApi, RecipeDetailApi, RecipeListApi

urlpatterns = [
    path("", RecipeListApi.as_view()),
    path("<int:id>/", RecipeDetailApi.as_view()),
    path("create/", RecipeCreateApi.as_view()),
]
