from django.urls import (path,
                         include)


urlpatterns = [
    path('measurements/', include('measurements.urls')),
    path('ingredients/', include('ingredients.urls')),
    path('recipes/', include('recipe.urls')),
]
