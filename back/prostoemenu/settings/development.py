from .base import *  # noqa: F403

INSTALLED_APPS += [
    "debug_toolbar",
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

DATABASES = {
    "default": {
        "ENGINE": os.getenv("DB_ENGINE", default="django.db.backends.postgresql"),
        "NAME": os.getenv("POSTGRES_DB_DEV", default="prostoemenu"),
        "USER": os.getenv("POSTGRES_USER_DEV", default="postgres"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD_DEV", default="postgres"),
        "HOST": os.getenv("DB_HOST_DEV", default="db"),
        "PORT": os.getenv("DB_PORT", default="5432"),
    },
}
