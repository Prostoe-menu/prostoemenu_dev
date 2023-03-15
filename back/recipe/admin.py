from django.contrib import admin
from .models import Recipe, Tag, RecipeTags

admin.site.register(Recipe)
admin.site.register(Tag)
admin.site.register(RecipeTags)
