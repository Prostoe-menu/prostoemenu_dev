from django.urls import path

from .views import IngredientDetailApi, IngredientListApi

urlpatterns = [
    path("<int:id>/", IngredientDetailApi.as_view()),
    path("", IngredientListApi.as_view()),
]
