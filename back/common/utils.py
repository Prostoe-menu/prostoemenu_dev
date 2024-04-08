from django.db import models


def normilize_text_fields(model_obj):
    for field in model_obj._meta.get_fields():
        if isinstance(field, (models.CharField, models.TextField)):
            value = getattr(model_obj, field.name)
            if value:
                setattr(model_obj, field.name, value.strip().capitalize())

    return model_obj
