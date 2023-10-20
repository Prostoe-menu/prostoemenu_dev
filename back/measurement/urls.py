from django.urls import path
from .views import MeasurementList


urlpatterns = [
    path('measurements/', MeasurementList.as_view()),
]
