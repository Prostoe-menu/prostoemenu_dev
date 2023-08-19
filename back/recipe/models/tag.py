from django.db import models
from recipe.models import Basemodel


class Tag(Basemodel):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name='Название тэга')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'
        ordering = ['name']