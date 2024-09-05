import os
from django.conf import settings as django_settings


def get_recipe_image_upload_path(instance, filename):
    filename = filename.split("/")[-1]
    return os.path.join("recipes", filename.split(".")[0], filename)


def get_step_image_upload_path(instance, filename):
    return os.path.join(
        "recipes", str(instance.recipe_id), "steps", filename.split("/")[-1]
    )
