import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    default="django-insecure-*rojrw1fe1v4h)bkz^6amo-p1824p5@yw7z9+hps)rb*ptq_th",
)

DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "109.172.82.25", "test-menu.wowit.ru"]

INTERNAL_IPS = [
    "127.0.0.1",
]

INSTALLED_APPS = [
    # Django Applications
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.postgres",
    # Third-party Applications
    "rest_framework",
    "django_filters",
    "rest_framework.authtoken",
    "djoser",
    "drf_spectacular",
    "corsheaders",
    # Project Applications
    "common",
    "recipes",
    "api",
    "measurements",
    "ingredients",
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "PAGE_SIZE": 5,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "prostoemenu.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "prostoemenu.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarity"
        "Validator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), "mediafiles")
MEDIA_URL = "/media/"

DJOSER = {
    "USER_CREATE_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "/username/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "/activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": False,
    "SERIALIZERS": {},
    "LOGIN_FIELD": "username",
}

CORS_ORIGIN_ALLOW_ALL = True

EMAIL_USE_TLS = True
EMAIL_HOST = "smtp.yandex.ru"
EMAIL_HOST_USER = "prostoemenu2023@yandex.ru"
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = "prostoemenu2023@yandex.ru"
EMAIL_PORT = 587

SPECTACULAR_SETTINGS = {
    "TITLE": "ProstoeMenu API",
    "DESCRIPTION": "Документация к API сервиса ProstoeMenu",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}

DOMAIN_NAME = "https://test-menu.wowit.ru/"

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ACCEPTED_SYMBOLS = (
    "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789!-№;%:?*()/.,\«» \"'"
)

MIN_DESCR_LENGTH = 10

MAX_DESCR_LENGTH = 500

MIN_TITLE_LENGTH = 2

MIN_COOKING_AND_OVEN_TIME = 1

MAX_COOKING_AND_OVEN_TIME = 5999

MIN_PORTION_QUANTITY = 1

MAX_PORTION_QUANTITY = 10

MIN_RECIPE_COMPLEXITY = 1

MAX_RECIPE_COMPLEXITY = 3

MIN_STEP_NUMBER = 1

MAX_STEP_NUMBER = 20
