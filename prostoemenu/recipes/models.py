from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=36,
                            verbose_name='Название категории',
                            null=False,
                            blank=False)
    slug = models.SlugField(max_length=36,
                            verbose_name='Slug поля',
                            null=False,
                            blank=False,
                            unique=True)

    def __str__(self):
        return self.name


class Nation(models.Model):
    name = models.CharField(max_length=36,
                            verbose_name='Национальная кухня',
                            null=False,
                            blank=False)
    slug = models.SlugField(max_length=36,
                            verbose_name='Slug поля',
                            null=False,
                            blank=False,
                            unique=True)

    def __str__(self):
        return self.name


class CookingMethod(models.Model):
    name = models.CharField(max_length=36,
                            unique=True)

    def __str__(self):
        return self.name


class Ingredients(models.Model):
    name = models.CharField(max_length=56,
                            verbose_name='Название ингредиента',
                            unique=True)

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
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL,
        verbose_name='Название категории',
        null=True,
        related_name='recipes'
    )
    nation = models.ForeignKey(
        Nation, on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Национальная кухня',
        related_name='recipes'
    )
    advice = models.TextField(
        verbose_name='Примечание',
        max_length=600,
        blank=True,
        null=True
    )
    # author = models.ForeignKey(
    #     User, on_delete=models.CASCADE,
    #     related_name='recipes'
    # )
    ingredients = models.ManyToManyField(
        Ingredients, related_name='recipes',
        verbose_name='Ингредиенты'
    )
    image = models.ImageField(
        verbose_name='Фото рецепта',
        upload_to='recipes/',
        blank=True,
        null=True
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
