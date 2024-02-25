from django.db import models


class Measurement(models.Model):
    name = models.CharField(max_length=30, unique=True, verbose_name="Название")
    abbreviation = models.CharField(max_length=30, verbose_name="Аббревиатура")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Единица измерения"
        verbose_name_plural = "Единицы измерения"
        ordering = ["name"]
