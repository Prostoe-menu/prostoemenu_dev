"""
Аутентификация по токену.
Все доступные эндпоинты библиотеки Djoser перечислены в документации
https://djoser.readthedocs.io/en/latest/base_endpoints.html
Сейчас используем только:
- /users/ - создание пользователя (post)
- /users/activation/ - активация пользователя (post)
- /token/login/ - логин (post)
- /token/logout/ - логаут (post)
- /users/me/ - профиль пользователя
"""

from django.urls import path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]