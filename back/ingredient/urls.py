from django.urls import path
from .views import (IngredientDetail,
                    IngredientList)

urlpatterns = [
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
]