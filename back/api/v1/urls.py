from django.urls import include, path

urlpatterns = [path("recipes/", include("recipe.urls"))]
