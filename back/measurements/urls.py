from django.urls import path

from .views import MeasurementDetailApi, MeasurementListApi

urlpatterns = [
    path("", MeasurementListApi.as_view()),
    path("<int:id>/", MeasurementDetailApi.as_view()),
]
