from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.serializers import RecipeSerializer, IngredientSerializer
from recipes.models import Recipe


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