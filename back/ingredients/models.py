from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    category = models.CharField(
        max_length=100, verbose_name="Категория", default="Без категории"
    )
    sort = models.SmallIntegerField(null=True, verbose_name="Порядок")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Ингредиент"
        verbose_name_plural = "Ингредиенты"
        constraints = [
            models.UniqueConstraint(
                fields=["name", "category"], name="unique_ingredient"
            )
        ]
        ordering = ["name"]
