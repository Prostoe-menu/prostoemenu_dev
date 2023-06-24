"""
Аутентификация по токену.
Все доступные эндпоинты:
https://djoser.readthedocs.io/en/latest/base_endpoints.html
"""

from django.urls import path
from .views import UserProfileListCreateView, UserProfileDetailView, UserActivationView, CheckCode, ActivationCodeUpdateView

urlpatterns = [
    path("all-profiles/", UserProfileListCreateView.as_view(), name="all-profiles"),
    path("profile/<int:pk>/", UserProfileDetailView.as_view(), name="profile"),
    path("user-activation/<int:pk>/", UserActivationView.as_view(), name="user-activation"),
    path("check-code/", CheckCode.as_view(), name="check-code"),
    path("activationcode-update/<int:pk>/", ActivationCodeUpdateView.as_view(), name="code-update"),
]
