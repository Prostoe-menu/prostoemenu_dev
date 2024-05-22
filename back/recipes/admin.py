from django.contrib import admin

from .models import Recipe, RecipeIngredient, RecipeStep


class RecipeStepAdmin(admin.StackedInline):
    model = RecipeStep


class RecipeIngredientAdmin(admin.StackedInline):
    model = RecipeIngredient


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    inlines = [RecipeStepAdmin, RecipeIngredientAdmin]
    list_display = ("id", "title", "author")

    class Meta:
        model = Recipe
