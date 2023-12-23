from recipe.models import (Ingredient,
                           Step,
                           Photo,
                           Recipe,
                           RecipePhotos,
                           RecipeSteps,
                           RecipeIngredients)
from django.db import IntegrityError

from ingredient.serializers import IngredientSerializer
from rest_framework import serializers
from rest_framework.exceptions import APIException


class RecipeIngredientAlternative(serializers.ModelSerializer):
    ingredient = serializers.CharField(source='ingredient_alternative')
    volume = serializers.IntegerField(source='ingredient_alternative_volume')
    measure = serializers.CharField(source='ingredient_alternative_measure')

    class Meta:
        model = RecipeIngredients
        fields = ('ingredient', 'volume', 'measure')


class RecipeIngredientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='ingredient.pk')
    name = serializers.CharField(source='ingredient.name')  # Showing name instead of id
    measure_unit = serializers.CharField(source='measure')

    class Meta:
        model = RecipeIngredients
        fields = ('id',
                  'name',
                  'volume',
                  'measure_unit')

    def get_replacement(self, recipe_instance):
        query_datas = RecipeIngredients.objects.select_related(
            'ingredient', 'recipe').filter(
            recipe=recipe_instance.recipe_id,
            ingredient=recipe_instance.ingredient_id).values(
            'ingredient_alternative',
            'ingredient_alternative_volume',
            'ingredient_alternative_measure')

        if query_datas[0]['ingredient_alternative'] is not None:
            return RecipeIngredientAlternative(query_datas[0]).data
        return None


class RecipeStepSerializer(serializers.ModelSerializer):
    step_number = serializers.IntegerField(source='step__step_number')
    description = serializers.CharField(source='step__description')
    photo_path = serializers.CharField(source='step__photo')

    class Meta:
        model = RecipeSteps
        fields = ('step_number',
                  'description',
                  'photo_path')


class RecipePhotoSerializer(serializers.ModelSerializer):
    photo = serializers.CharField(source='photo__photo')

    class Meta:
        model = RecipePhotos
        fields = ('photo',)


class RecipeDisplaySerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['name',
                  'description',
                  'complexity',
                  'cooking_time',
                  'oven_time',
                  'ingredients',
                  'steps',
                  'photos']

        read_only_fields = fields

    def get_ingredients(self, recipe_instance):
        query_datas = RecipeIngredients.objects.select_related(
            'ingredient', 'recipe').filter(recipe=recipe_instance).all()
        return [RecipeIngredientSerializer(
            ingredient).data for ingredient in query_datas]

    def get_steps(self, recipe_instance):
        query_datas = RecipeSteps.objects.select_related('step').filter(
            recipe=recipe_instance).values(
            'step__step_number', 'step__description', 'step__photo')
        return [RecipeStepSerializer(step).data for step in query_datas]

    def get_photos(self, recipe_instance):
        query_datas = RecipePhotos.objects.select_related('photo').filter(
            recipe=recipe_instance).values('photo__photo')
        return [RecipePhotoSerializer(photo).data for photo in query_datas]


class RecipeListSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='pk')
    title = serializers.CharField(source='name')
    cover_path = serializers.ReadOnlyField(source='main_photo.photo')
    ingredients = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = (
            'id',
            'title',
            'description',
            'cover_path',
            'complexity',
            'cooking_time',
            'oven_time',
            'ingredients',
            'steps',
            'photos')

        read_only_fields = fields

    def get_ingredients(self, recipe_instance):
        query_datas = RecipeIngredients.objects.select_related(
            'ingredient', 'recipe').filter(recipe=recipe_instance).all()
        return [RecipeIngredientSerializer(
            ingredient).data for ingredient in query_datas]

    def get_steps(self, recipe_instance):
        query_datas = RecipeSteps.objects.select_related('step').filter(
            recipe=recipe_instance).values(
            'step__step_number', 'step__description', 'step__photo')
        return [RecipeStepSerializer(step).data for step in query_datas]

    def get_photos(self, recipe_instance):
        query_datas = RecipePhotos.objects.select_related('photo').filter(
            recipe=recipe_instance).values('photo__photo')
        return [RecipePhotoSerializer(photo).data for photo in query_datas]


##################################################
#                                                #
#               Create objects                   #
#                                                #
##################################################


class RecipeStepCreateSerializer(serializers.ModelSerializer):
    step_number = serializers.IntegerField()
    description = serializers.CharField()
    photo = serializers.CharField(
        allow_blank=True,
        allow_null=True)

    class Meta:
        model = RecipeSteps
        fields = ('step_number', 'description', 'photo')


class RecipePhotoCreateSerializer(serializers.ModelSerializer):
    photo = serializers.CharField(allow_null=True)

    class Meta:
        model = RecipePhotos
        fields = ('photo',)


class RecipeIngredientAlternativeCreateSerializer(serializers.ModelSerializer):
    ingredient_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        source='ingredient',
        queryset=Ingredient.objects.all())
    volume = serializers.IntegerField(
        source='ingredient_alternative_volume')
    measure = serializers.CharField(
        source='ingredient_alternative_measure')

    class Meta:
        model = RecipeIngredients
        fields = ('ingredient_id', 'measure', 'volume')


class RecipeIngredientCreateSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(
        read_only=True)
    ingredient_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        source='ingredient',
        queryset=Ingredient.objects.all())
    replacement = RecipeIngredientAlternativeCreateSerializer(
        allow_null=True)

    class Meta:
        model = RecipeIngredients
        fields = ('ingredient',
                  'ingredient_id',
                  'measure',
                  'volume',
                  'replacement')


class RecipeCreateSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientCreateSerializer(many=True)
    steps = RecipeStepCreateSerializer(many=True)
    photos = RecipePhotoCreateSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['name',
                  'description',
                  'complexity',
                  'cooking_time',
                  'oven_time',
                  'quantity',
                  'ingredients',
                  'steps',
                  'photos']

    def create(self, validated_data):
        try:
            ingredients_data = validated_data.pop('ingredients')
            steps_data = validated_data.pop('steps')
            photos_data = validated_data.pop('photos')
            recipe = Recipe.objects.create(**validated_data)

            for ingredient_data in ingredients_data:
                if ingredient_data.get('replacement') is None:
                    RecipeIngredients.objects.create(
                        recipe=recipe,
                        ingredient=ingredient_data.get('ingredient'),
                        volume=ingredient_data.get('volume'),
                        measure=ingredient_data.get('measure'),
                        ingredient_alternative=None,
                        ingredient_alternative_volume=None,
                        ingredient_alternative_measure=None)
                else:
                    RecipeIngredients.objects.create(
                        recipe=recipe,
                        ingredient=ingredient_data.get('ingredient'),
                        volume=ingredient_data.get('volume'),
                        measure=ingredient_data.get('measure'),
                        ingredient_alternative=ingredient_data.get(
                            'replacement')['ingredient'],
                        ingredient_alternative_volume=ingredient_data.get(
                            'replacement')['ingredient_alternative_volume'],
                        ingredient_alternative_measure=ingredient_data.get(
                            'replacement')['ingredient_alternative_measure'])

            for step_data in steps_data:
                step_to_add = Step.objects.create(
                    step_number=step_data.get('step_number'),
                    description=step_data.get('description'),
                    photo=step_data.get('photo'))

                RecipeSteps.objects.create(recipe=recipe, step=step_to_add)

            for photo_data in photos_data:
                if photo_data.get('photo') is None:
                    RecipePhotos.objects.create(recipe=recipe, photo=Photo(pk=1, photo='default_photo.jpg'))
                else:
                    photo_to_add = Photo.objects.create(photo=photo_data.get('photo'))
                    RecipePhotos.objects.create(recipe=recipe, photo=photo_to_add)

        except IntegrityError as e:
            raise APIException(detail=e)

        return recipe
