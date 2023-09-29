from .base import *


DEBUG = True

# ALLOWED_HOSTS += [
#     '127.0.0.1',
#     'web'
# ]


INSTALLED_APPS += [
    'debug_toolbar',
]


MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
    #
    # 'default': {
    #     'ENGINE': os.getenv(
    #         'DB_ENGINE', default='django.db.backends.postgresql'
    #     ),
    #     'NAME': os.getenv('DB_NAME', default='prostoemenu'),
    #     'USER': os.getenv('POSTGRES_USER_DEV', default='postgres'),
    #     'PASSWORD': os.getenv('POSTGRES_PASSWORD_DEV', default='postgres'),
    #     'HOST': os.getenv('DB_HOST_DEV', default='db'),
    #     'PORT': os.getenv('DB_PORT', default='5432')
    # }
}

INTERNAL_IPS = [
    '127.0.0.1',
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
