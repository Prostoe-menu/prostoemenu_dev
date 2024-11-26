import random

from django.db import models


def normilize_text_fields(model_obj):
    for field in model_obj._meta.get_fields():
        if isinstance(field, (models.CharField, models.TextField)):
            value = getattr(model_obj, field.name)
            if value:
                setattr(model_obj, field.name, value.strip())

    return model_obj


def generate_text(length, symbols):
    return "".join([random.choice(list(symbols)) for i in range(length)])


def custom_preprocessing_hook(endpoints):
    filtered = []
    for (path, path_regex, method, callback) in endpoints:
        if "auth/users/" not in path:
           filtered.append((path, path_regex, method, callback))
        if path.endswith("auth/users/") and method == "POST":
            filtered.append((path, path_regex, method, callback))
    return filtered
