from django.urls import path
from .views import *

urlpatterns = [
    path('kaiten/', KaitenData.as_view()),
]
