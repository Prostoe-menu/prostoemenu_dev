from django.urls import path, include

urlpatterns = [
    path('measurements/', include('measurement.urls')),
]
