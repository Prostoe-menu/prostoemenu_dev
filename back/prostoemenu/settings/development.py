from .base import *


INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }

    # не удалять! Я локально работаю с посгресом.
    'default': {
        'ENGINE': os.getenv(
            'DB_ENGINE', default='django.db.backends.postgresql'
        ),
        'NAME': os.getenv('DB_NAME', default='prostoemenu'),
        'USER': os.getenv('POSTGRES_USER_DEV', default='postgres'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD_DEV', default='postgres'),
        'HOST': os.getenv('DB_HOST_DEV', default='db'),
        'PORT': os.getenv('DB_PORT', default='5432')
    }

}
