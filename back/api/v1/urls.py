from django.urls import (path,
                         include)


urlpatterns = [
    path('measurements/', include('measurement.urls')),
    path('ingredients/', include('ingredient.urls')),
    path('recipes/', include('recipe.urls')),
    path('account/', include('account.urls')),
    path('auth/', include('djoser.urls')),
    path('kaiten/', include('kaiten.urls')),
]
