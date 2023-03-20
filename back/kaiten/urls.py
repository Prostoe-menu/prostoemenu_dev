from django.urls import path
from .views import *

urlpatterns = [
    path('api/', KaitenData.as_view()),
]

