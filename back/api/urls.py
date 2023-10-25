from django.urls import path, include
from .views import RecipeList, RecipeDetail, IngredientDetail, IngredientList

urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
    path('v1/', include('api.v1.urls')),
]
