from recipe.models import Ingredient
import django_filters


class BaseIngdredientFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(lookup_expr="istartswith")
    
    class Meta:
        model = Ingredient
        fields = ('name',)