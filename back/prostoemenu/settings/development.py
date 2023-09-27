from .base import *


DEBUG = True

ALLOWED_HOSTS += [
    '127.0.0.1',
    'web'
]

# уже есть в base.py
# INSTALLED_APPS += [
#     'debug_toolbar',
# ]

# уже есть в base.py
# MIDDLEWARE += [
#     'debug_toolbar.middleware.DebugToolbarMiddleware',
# ]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

INTERNAL_IPS = [
    '127.0.0.1',
]

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
