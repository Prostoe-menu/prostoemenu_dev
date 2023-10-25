from django.urls import path, include

urlpatterns = [
    path('measurements/', include('measurement.urls')),
    path('ingredients/', include('ingredient.urls')),
    path('ingredient/', include('ingredient.urls')),
]
