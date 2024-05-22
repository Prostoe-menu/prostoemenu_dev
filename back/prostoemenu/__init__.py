import os

from dotenv import load_dotenv

load_dotenv()

env = os.getenv("ENVIRONMENT", "DEV")
if env == "PROD":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "prostoemenu.settings.production")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "prostoemenu.settings.development")


from . import schema  # noqa: E402
