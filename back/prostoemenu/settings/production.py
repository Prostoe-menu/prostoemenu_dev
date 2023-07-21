import os

from .base import *

DEBUG = False

ALLOWED_HOSTS += [
    'web',
    '127.0.0.1'
]

INSTALLED_APPS += [
    'corsheaders',
]

DATABASES = {
  'default': {
      'ENGINE': os.getenv(
          'DB_ENGINE', default='django.db.backends.postgresql'
      ),
      'NAME': os.getenv('POSTGRES_DB', default='prostoemenu'),
      'USER': os.getenv('POSTGRES_USER', default='postgres'),
      'PASSWORD': os.getenv('POSTGRES_PASSWORD', default='postgres'),
      'HOST': os.getenv('DB_HOST', default='db'),
      'PORT': os.getenv('DB_PORT', default='5432')
  }
}

CORS_ORIGIN_ALLOW_ALL = True

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.yandex.ru'
EMAIL_HOST_USER = 'prostoemenu2023@yandex.ru'
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = 'prostoemenu2023@yandex.ru'
EMAIL_PORT = 587
