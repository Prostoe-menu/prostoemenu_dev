from recipe.models.basemodel import Basemodel
from django.db import models

class Measurement(Basemodel):
    name = models.CharField(max_length=30, unique=True)
    abbreviation = models.CharField(max_length=30)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Единица измерения'
        verbose_name_plural = 'Единицы измерения'
        ordering = ['name']