from recipe.views import RecipeList, RecipeDetail
#from ingredient.views import IngredientDetail, IngredientList
from django.urls import path, include


urlpatterns = [
    path('recipes/', RecipeList.as_view()),
    path('recipe/<int:id>/', RecipeDetail.as_view()),
#    path('ingredient/<int:id>/', IngredientDetail.as_view()),
#    path('ingredients/', IngredientList.as_view()),
    path('v1/', include('api.v1.urls')),
]
