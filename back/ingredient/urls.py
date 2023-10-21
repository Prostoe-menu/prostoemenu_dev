from .views import (IngredientDetail,
                    IngredientList)
from django.urls import path


urlpatterns = [
    path('ingredient/<int:id>/', IngredientDetail.as_view()),
    path('ingredients/', IngredientList.as_view()),
]