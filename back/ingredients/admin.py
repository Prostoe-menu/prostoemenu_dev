from django.contrib import admin

from .models import Ingredient


@admin.register(Ingredient)
class MeasurementAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "sort")
