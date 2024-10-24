import os
from decimal import Decimal
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parents[2]

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    default="django-insecure-*rojrw1fe1v4h)bkz^6amo-p1824p5@yw7z9+hps)rb*ptq_th",
)

DEBUG = True

USE_X_FORWARDED_HOST = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

ALLOWED_HOSTS = [
    "127.0.0.1",
    "109.172.82.25",
    "147.45.182.25",
    "test.prostoemenu.ru",
    "prostoemenu.ru",
]

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
    "drf_spectacular_sidecar",
    "corsheaders",
    # Project Applications
    "common",
    "recipes",
    "api",
    "measurements",
    "ingredients",
    "users",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
    ],
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

AUTH_USER_MODEL = "users.User"

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
STATIC_ROOT = BASE_DIR.joinpath("staticfiles")
STATICFILES_DIRS = (BASE_DIR.joinpath("static"),)

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MEDIA_ROOT = BASE_DIR.joinpath("mediafiles")
MEDIA_URL = "/media/"

DJOSER = {
    "USER_CREATE_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "/password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "/username/reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "/activate/{uid}/{token}",
    "SEND_ACTIVATION_EMAIL": False,
    "SERIALIZERS": {
        "user_create_password_retype": "users.serializers.input.CustomUserCreateInputSerializer",
    },
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
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {
            'format': '%(name)-12s %(levelname)-8s %(message)s'
        },
        'file': {
            'format': '%(asctime)s %(name)-12s %(levelname)-8s %(message)s'
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'console'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'formatter': 'file',
            'filename': 'debug.log'
        }
    },
    'loggers': {
        '': {
            'level': 'DEBUG',
            'handlers': ['console', 'file'],
            'propagate': True
        },
        'django.request': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        },
        'django.server': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        },
        'django.db.backends': {
            'level': 'WARNING',
            'handlers': ['console', 'file']
        },
        'django.security.*': {
            'level': 'DEBUG',
            'handlers': ['console', 'file']
        }
    }
}

DOMAIN_NAME = "https://test.prostoemenu.ru/"

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ACCEPTED_SYMBOLS = set(
    "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789!№;%:?*()/.,\«»—–- \"'°+¼½"
)


MIN_DESCR_LENGTH = 10

MAX_DESCR_LENGTH = 500

MIN_TITLE_LENGTH = 2

MAX_TITLE_LENGTH = 100

MIN_COOKING_AND_OVEN_TIME = 1

MAX_COOKING_AND_OVEN_TIME = 5999

MIN_PORTION_QUANTITY = 1

MAX_PORTION_QUANTITY = 10

MIN_RECIPE_COMPLEXITY = 1

MAX_RECIPE_COMPLEXITY = 3

MIN_STEP_NUMBER = 1

MAX_STEP_NUMBER = 20

MIN_INGREDIENT_VOLUME = Decimal("0.1")

MIN_TEXT_FIELD_SEARCH_LENGTH = 3

IMAGE_SOURCE_FOLDER = BASE_DIR.joinpath("data", "images", "recipe_images")

DEFAULT_DISH_IMAGE = IMAGE_SOURCE_FOLDER.joinpath("default_dish_image.jpg")

MALE_ABBR = "м"

FEMALE_ABBR = "ж"

GENDER_CHOICES = [
    (MALE_ABBR, "мужской"),
    (FEMALE_ABBR, "женский")
]

GENDER_ABBR_LENGTH = 1

MAX_USER_AGE = 120