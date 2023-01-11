from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from django.shortcuts import get_object_or_404
from api.serializers import (RecipeSerializer,
                             IngredientSerializer,
                             CategorySerializer,
                             NationSerializer)
from recipes.models import Recipe, Category, Nation


class RecipesViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    # permission_classes = [IsAuthenticated, ]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class IngredientsViewSet(ModelViewSet):
    serializer_class = IngredientSerializer

    # permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        recipe = Recipe.objects.get(pk=self.kwargs.get('recipe_id'))
        return recipe.ingredients

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class RecipesCategoryViewSet(ModelViewSet):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        print(self.kwargs)
        category = get_object_or_404(Category,
                                     pk=self.kwargs.get('category_id'))
        return category.recipes


class NationViewSet(ModelViewSet):
    serializer_class = NationSerializer
    queryset = Nation.objects.all()


class RecipesNationViewSet(ModelViewSet):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        nation = get_object_or_404(Category,
                                   pk=self.kwargs.get('nation_id'))
        return nation.recipes
