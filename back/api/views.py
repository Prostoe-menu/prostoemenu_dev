import requests
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.settings import api_settings
from recipe.models import Recipe, Ingredient
from .models import Participant, Task
from .serializers import RecipeDisplaySerializer, RecipeCreateSerializer, IngredientSerializer, TaskSerializer, \
    ParticipantCreateSerializer, ParticipantSerializer
from rest_framework.response import Response
from datetime import datetime, timedelta

class RecipeList(APIView):
    def get(self, request, format=None):
        recipes = Recipe.objects.all()

        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        paginator = pagination_class()

        page = paginator.paginate_queryset(recipes, request, view=self)
        serializer = RecipeDisplaySerializer(page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = RecipeCreateSerializer(data=request.data)
        if serializer.is_valid():
            saved_obj = serializer.save()
            response_data = RecipeDisplaySerializer(saved_obj).data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            new_error = {}
            for field_name, field_errors in default_errors.items():
                new_error[field_name] = field_errors[0]
            return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetail(APIView):
    def get(self, request, id=None):
        recipe_obj = get_object_or_404(Recipe, id=id)

        if recipe_obj:
            recipe = Recipe.objects.filter(id=id)
            serializer = RecipeDisplaySerializer(recipe, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id=None):
        recipe = Recipe.objects.filter(id=id)
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IngredientDetail(APIView):
    def get(self, request, id=None):
        ingredient_obj = get_object_or_404(Ingredient, id=id)
        if ingredient_obj:
            ingredient = Ingredient.objects.get(id=id)
            serializer = IngredientSerializer(ingredient)
            return Response(serializer.data, status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class KaitenData(APIView):
    def get(self, request, format=None):
        participants = Participant.objects.all()
        serializer = ParticipantSerializer(participants, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        auth_key = 'Bearer 18d47ac2-41af-4ba9-8501-4fb4a2586a3b'
        url = 'https://boyarkin.kaiten.ru/api/latest/cards/?additional_card_fields=description'
        r = requests.get(url, headers={'Accept': 'application/json', 'Content-Type': 'application/json',
                                       'Authorization': auth_key})
        cards = r.json()
        participants = dict()

        for card in cards:
            if 'members' in card and card['column']['title'] in ['In progress', 'Ready (на проверку)', 'done']:
                for member in card['members']:
                    if member['username'] not in participants:
                        participants[member['username']] = {'name': member['full_name'],
                                                             'username': member['username'],
                                                            'kaiten_user_id': member['id'],
                                                             'last_updated_task': '', 'number_of_completed_tasks': 0,
                                                             'tasks': []}
                    participants[member['username']]['tasks'].append({'kaiten_task_id': card['id'],
                                                                       'name': card['title'],
                                                                       'status': card['column']['title'],
                                                                       'description': card['description'],
                                                                       'update_date': member['updated'],
                                                                       'create_date': member['created']})

                    participants[member['username']]['last_updated_task'] = max(
                        participants[member['username']]['last_updated_task'], member['updated'])

                    if card['column']['title'] == 'done':
                        participants[member['username']]['number_of_completed_tasks'] = \
                            participants[member['username']]['number_of_completed_tasks'] + 1

        for participant in participants:
            serializer = ParticipantCreateSerializer(data=participants[participant])

            if serializer.is_valid():
                serializer.save()

        return Response(participants, status=status.HTTP_200_OK)

    def put(self, request):
        auth_key = 'Bearer 18d47ac2-41af-4ba9-8501-4fb4a2586a3b'
        url = 'https://boyarkin.kaiten.ru/api/latest/cards/?additional_card_fields=description&updated_after=' + str(datetime.now() - timedelta(minutes=2))
        r = requests.get(url, headers={'Accept': 'application/json', 'Content-Type': 'application/json',
                                       'Authorization': auth_key})
        cards = r.json()
        updated_cards = []
        for card in cards:
            try:
                instance = Task.objects.get(kaiten_task_id=card['id'])

                if instance:
                    updated_cards.append(
                        {'kaiten_task_id': card['id'], 'name': card['title'], 'status': card['column']['title'],
                         'description': card['description'],
                         'create_date': card['created'],
                         'update_date': card['updated']})

                    serializer = TaskSerializer(data={'kaiten_task_id': card['id'], 'name': card['title'], 'status': card['column']['title'],
                                                      'description': card['description'],
                                                      'create_date': card['created'],
                                                      'update_date': card['updated']}, instance=instance)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                updated_cards.append({'kaiten_task_id': card['id'], 'name': card['title'],'description': card['description'], 'status': 'Innactive DB entry'})

        return Response(updated_cards, status=status.HTTP_200_OK)
