from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class CookingMethod(models.Model):
    name = models.CharField(max_length=36,
                            unique=True)

    def __str__(self):
        return self.name


class Ingredients(models.Model):
    name = models.CharField(max_length=56,
                            verbose_name='Название ингредиента',
                            unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    title = models.CharField(
        max_length=36,
        verbose_name='Название рецепта',
        null=False
    )
    description = models.TextField(
        max_length=1500,
        verbose_name='Описание рецепта',
        null=False
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='recipes'
    )
    ingredients = models.ManyToManyField(
        Ingredients, related_name='recipes',
        verbose_name='Ингредиенты'
    )
    image = models.ImageField(
        verbose_name='Фото рецепта',
        upload_to='recipes/',
        blank=True
    )
    cooking_method = models.ForeignKey(
        CookingMethod,
        related_name='method',
        verbose_name='Способ приготовления',
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )
    cooking_time = models.IntegerField(
        verbose_name='Время приготовления в минутах',
        null=True,
        blank=True
    )
    is_published = models.BooleanField(
        default=False,
        verbose_name='Опубликовать рецепт'
    )

    def __str__(self):
        return self.title
