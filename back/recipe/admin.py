from django.contrib import admin

from recipe.models import Ingredient, Measurement, Recipe


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    """Модель рецепта для отображения в админке."""

    pass


@admin.register(Ingredient)
class Ingredient(admin.ModelAdmin):
    """Модель ингредиента для отображения в админке."""

    pass


@admin.register(Measurement)
class Measurement(admin.ModelAdmin):
    """Модель единиц измерения для отображения в админке."""

    pass
