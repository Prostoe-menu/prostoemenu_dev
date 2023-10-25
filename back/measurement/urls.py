from django.urls import path
from .views import MeasurementList

urlpatterns = [
    path('', MeasurementList.as_view()),
]
