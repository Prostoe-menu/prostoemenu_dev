from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from api.views import RecipesViewSet, IngredientsViewSet

router = DefaultRouter()
router.register(r'recipes', RecipesViewSet)
router.register(r'recipes/(?P<recipe_id>[^/.]+)/ingredients',
                IngredientsViewSet,
                basename='ingredients')

urlpatterns = [
    path('v1/api-get-token/', views.obtain_auth_token),
    path('v1/', include(router.urls))
]