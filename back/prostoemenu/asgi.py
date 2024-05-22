import os

from django.core.asgi import get_asgi_application
from dotenv import load_dotenv

load_dotenv()

env = os.getenv("ENVIRONMENT", "DEV")
if env == "PROD":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "prostoemenu.settings.production")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "prostoemenu.settings.development")

application = get_asgi_application()
