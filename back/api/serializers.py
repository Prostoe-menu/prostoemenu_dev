from rest_framework import serializers
from recipe.models import *
from api.models import *
from django.db import IntegrityError
from rest_framework.exceptions import APIException


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeIngredientAlternative:
    class Meta:
        model = RecipeIngredients
        fields = ('ingredient_alternative', 'ingredient_alternative_volume', 'ingredient_alternative_measure')


class RecipeIngredientAlternative(serializers.ModelSerializer):
    ingredient = serializers.CharField(source='ingredient_alternative')
    volume = serializers.IntegerField(source='ingredient_alternative_volume')
    measure = serializers.CharField(source='ingredient_alternative_measure')

    class Meta:
        model = RecipeIngredients
        fields = ['ingredient', 'volume', 'measure']


class RecipeIngredientSerializer(serializers.ModelSerializer):
    replacement = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = RecipeIngredients
        fields = ('ingredient', 'volume', 'measure', 'ingredient', 'replacement')

    def get_replacement(self, recipe_instance):
        query_datas = RecipeIngredients.objects.select_related('recipe', 'ingredient').filter(
        recipe=recipe_instance.recipe_id, ingredient=recipe_instance.ingredient_id).values('ingredient_alternative',
                                                                                           'ingredient_alternative_volume',
                                                                                           'ingredient_alternative_measure')
        if query_datas[0]['ingredient_alternative'] is not None:
            return RecipeIngredientAlternative(query_datas[0]).data
        return None



class RecipeStepSerializer(serializers.ModelSerializer):
    step_number = serializers.IntegerField(source='step__step_number')
    description = serializers.CharField(source='step__description')
    photo = serializers.CharField(source='step__photo')

    class Meta:
        model = RecipeSteps
        fields = ('step_number', 'description', 'photo')


#
class RecipePhotoSerializer(serializers.ModelSerializer):
    photo = serializers.CharField(source='photo__photo')
    class Meta:
        model = RecipePhotos
        fields = ('photo', )


class RecipeDisplaySerializer(serializers.ModelSerializer):
    ingredients = serializers.SerializerMethodField()
    steps = serializers.SerializerMethodField()
    photos = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['name', 'description', 'complexity', 'cooking_time', 'oven_time', 'ingredients', 'steps', 'photos']

    def get_ingredients(self, recipe_instance):
        query_datas = RecipeIngredients.objects.select_related('ingredient', 'recipe').filter(recipe=recipe_instance).all()
        return [RecipeIngredientSerializer(ingredient).data for ingredient in query_datas]

    def get_steps(self, recipe_instance):
        query_datas = RecipeSteps.objects.select_related('step', 'recipe').filter(recipe=recipe_instance).values('step__step_number', 'step__description', 'step__photo')
        return [RecipeStepSerializer(step).data for step in query_datas]

    def get_photos(self, recipe_instance):
        query_datas = RecipePhotos.objects.select_related('photo', 'recipe').filter(recipe=recipe_instance).values('photo__photo')
        return [RecipePhotoSerializer(photo).data for photo in query_datas]

##################################################
#                                                #
#               Create objects                   #
#                                                #
##################################################
class RecipeStepCreateSerializer(serializers.ModelSerializer):
    step_number = serializers.IntegerField()
    description = serializers.CharField()
    photo = serializers.CharField(allow_blank=True, allow_null=True)

    class Meta:
        model = RecipeSteps
        fields = ('step_number', 'description', 'photo')


class RecipePhotoCreateSerializer(serializers.ModelSerializer):
    photo = serializers.CharField()

    class Meta:
        model = RecipePhotos
        fields = ('photo',)


class RecipeIngredientAlternativeCreateSerializer(serializers.ModelSerializer):
    ingredient_id = serializers.PrimaryKeyRelatedField(write_only=True, source='ingredient', queryset=Ingredient.objects.all())
    volume = serializers.IntegerField(source='ingredient_alternative_volume')
    measure = serializers.CharField(source='ingredient_alternative_measure')

    class Meta:
        model = RecipeIngredients
        fields = ('ingredient_id', 'measure', 'volume')


class RecipeIngredientCreateSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer(read_only=True)
    ingredient_id = serializers.PrimaryKeyRelatedField(write_only=True, source='ingredient', queryset=Ingredient.objects.all())
    replacement = RecipeIngredientAlternativeCreateSerializer(allow_null=True)

    class Meta:
        model = RecipeIngredients
        fields = ('ingredient', 'ingredient_id', 'measure', 'volume', 'replacement')


class RecipeCreateSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientCreateSerializer(many=True)
    steps = RecipeStepCreateSerializer(many=True)
    photos = RecipePhotoCreateSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ['name', 'description', 'complexity', 'cooking_time', 'ingredients', 'steps', 'photos']

    def create(self, validated_data):
        try:
            ingredients_data = validated_data.pop('ingredients')
            steps_data = validated_data.pop('steps')
            photos_data = validated_data.pop('photos')
            recipe = Recipe.objects.create(**validated_data)

            for ingredient_data in ingredients_data:
                if ingredient_data.get('replacement') is None:
                    RecipeIngredients.objects.create(recipe=recipe, ingredient=ingredient_data.get('ingredient'),
                                                    volume=ingredient_data.get('volume'),
                                                    measure=ingredient_data.get('measure'), ingredient_alternative=None,
                                                    ingredient_alternative_volume=None, ingredient_alternative_measure=None)
                else:
                    RecipeIngredients.objects.create(recipe=recipe, ingredient=ingredient_data.get('ingredient'),
                                                     volume=ingredient_data.get('volume'),
                                                     measure=ingredient_data.get('measure'), ingredient_alternative=ingredient_data.get('replacement')['ingredient'],
                                                     ingredient_alternative_volume=ingredient_data.get('replacement')['ingredient_alternative_volume'],
                                                     ingredient_alternative_measure=ingredient_data.get('replacement')['ingredient_alternative_measure'])
            for step_data in steps_data:
                step_to_add = Step.objects.create(step_number=step_data.get('step_number'), description=step_data.get('description'), photo=step_data.get('photo'))
                RecipeSteps.objects.create(recipe=recipe, step=step_to_add)

            for photo_data in photos_data:
                photo_to_add = Photo.objects.create(photo=photo_data.get('photo'))
                RecipePhotos.objects.create(recipe=recipe, photo=photo_to_add)

        except IntegrityError as e:
            raise APIException(detail=e)

        return recipe


##################################################################################
#                          Participant post and put method's                     #
#                                                                                #
##################################################################################


class TaskSerializer(serializers.ModelSerializer):
    kaiten_task_id = serializers.IntegerField()
    name = serializers.CharField()
    status = serializers.CharField()
    description = serializers.CharField(allow_null=True)
    update_date = serializers.DateTimeField()
    create_date = serializers.DateTimeField()

    class Meta:
        model = Task
        fields = ('kaiten_task_id', 'name', 'status', 'description', 'update_date', 'create_date')

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.update_date = validated_data.get('update_date', instance.update_date)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance


class ParticipantCreateSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Participant
        fields = ('name', 'username', 'kaiten_user_id', 'number_of_completed_tasks', 'last_updated_task', 'tasks')

    def create(self, validated_data):
        tasks = validated_data.pop('tasks')
        participant, created = Participant.objects.get_or_create(**validated_data)

        for task in tasks:
            task_to_add, created = Task.objects.get_or_create(kaiten_task_id=task.get('kaiten_task_id'),
                                                              defaults={
                                                                  'kaiten_task_id': task.get('kaiten_task_id'),
                                                                  'name': task.get('name'),
                                                                  'status': task.get('status'),
                                                                  'update_date': task.get('update_date'),
                                                                  'create_date': task.get('create_date')})

            ParticipantTasks.objects.create(participant=participant, task=task_to_add)

        return participant

##################################################################################
#                                                                                #
#                          Participant get method                                #
#                                                                                #
##################################################################################


class ParticipantTasksSerializer(serializers.ModelSerializer):
    kaiten_task_id = serializers.IntegerField(source='task__kaiten_task_id')
    name = serializers.CharField(source='task__name')
    status = serializers.CharField(source='task__status')
    description = serializers.CharField(source='task__description')
    update_date = serializers.DateTimeField(source='task__update_date')
    create_date = serializers.DateTimeField(source='task__create_date')

    class Meta:
        model = ParticipantTasks
        fields = ('kaiten_task_id', 'name', 'status', 'description', 'update_date', 'create_date')


class ParticipantSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = ('name', 'username', 'kaiten_user_id', 'number_of_completed_tasks', 'last_updated_task', 'tasks')

    def get_tasks(self, participant_instance):
        query_datas = ParticipantTasks.objects.select_related('participant', 'task').filter(participant=participant_instance).values('task__kaiten_task_id',
                                                                                                                        'task__name', 'task__status',
                                                                                                                        'task__update_date', 'task__create_date', 'task__description')
        return [ParticipantTasksSerializer(task).data for task in query_datas]
