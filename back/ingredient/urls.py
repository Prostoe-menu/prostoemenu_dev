from .views import (IngredientDetail,
                    IngredientList)
from django.urls import path


urlpatterns = [
    path('<int:id>/', IngredientDetail.as_view()),
    path('', IngredientList.as_view()),
]