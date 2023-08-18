from django.db import models


class Ingredient(models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name='Название ингредиента',
        unique=True)
    category = models.CharField(
        max_length=100,
        verbose_name='Категория ингредиента')
    sort = models.PositiveSmallIntegerField(null=True, verbose_name='Порядок ингредиента')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'
        ordering = ["name"]