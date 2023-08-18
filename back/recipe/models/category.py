from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название категории',
        unique=True)
    description = models.TextField(
        null=True,
        verbose_name='Описание категории')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'
        ordering = ['name']