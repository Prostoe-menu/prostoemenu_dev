from django.urls import path
from .views import *

urlpatterns = [
    path('', recipe_api_list),
    path('ingredient/', ingredient_api_list),
    path('recipe/<int:pk>', recipe_api_detail),
    path('ingredient/<int:pk>', ingredient_api_detail),
]