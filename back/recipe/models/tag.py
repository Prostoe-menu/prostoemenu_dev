from django.db import models


class Tag(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название тэга',
        unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'
        ordering = ['name']