from django.urls import include, path

urlpatterns = [
    path("measurements/", include("measurements.urls")),
    path("ingredients/", include("ingredients.urls")),
    path("recipes/", include("recipes.urls")),
]
