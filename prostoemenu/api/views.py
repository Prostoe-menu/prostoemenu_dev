from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet

from api.serializers import (RecipeSerializer,
                             IngredientSerializer)
from recipes.models import Recipe


class RecipesViewSet(ModelViewSet):
    queryset = Recipe.objects.filter(is_published=True)
    serializer_class = RecipeSerializer
    filter_backends = [DjangoFilterBackend]
    # filterset_class = RecipeFilter
    filterset_fields = ['nation',
                        'category',
                        'ingredients',
                        'cooking_method',
                        'cooking_time',
                        'title']

    # permission_classes = [IsAuthenticated, ]


class IngredientsViewSet(ModelViewSet):
    serializer_class = IngredientSerializer

    # permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        recipe = Recipe.objects.get(pk=self.kwargs.get('recipe_id'))
        return recipe.ingredients
