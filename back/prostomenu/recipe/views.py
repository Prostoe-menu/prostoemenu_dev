from django.shortcuts import render
from django.views.generic import ListView
from .models import Recipe


class RecipeListView(ListView):
    model = Recipe
    template_name = 'recipe_list.html'
