from recipes.models import Recipe, Ingredients, CookingMethod
from django.contrib import admin


class IngredientsAdmin(admin.ModelAdmin):
    list_display = ('name', )


class RecipesAdmin(admin.ModelAdmin):
    list_display = ('id', )
    # exclude = ('id', 'image')
    # list_editable = ('cooking_method', 'is_published')


class CookingMethodAdmin(admin.ModelAdmin):
    list_display = ('name', )


admin.site.register(Recipe, RecipesAdmin)
admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(CookingMethod, CookingMethodAdmin)