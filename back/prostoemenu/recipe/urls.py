from django.urls import path
from .views import RecipeListView

urlpatterns = [
    path('', RecipeListView.as_view(), name='home'),
]
