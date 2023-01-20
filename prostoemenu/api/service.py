from django_filters import rest_framework as filters
from recipes.models import Recipe


class CharFilterInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class RecipeFilter(filters.FilterSet):
    """
    Разобраться с фильтрацией нужно.
    """
    ingredients = CharFilterInFilter(field_name='ingredients__name',
                                     lookup_expr='in')
    cooking_time = filters.RangeFilter()

    class Meta:
        model = Recipe
        fields = ('ingredients', 'cooking_time', )
