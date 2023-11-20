from django.urls import path
from .views import KaitenData

urlpatterns = [
    path('', KaitenData.as_view()),
]
