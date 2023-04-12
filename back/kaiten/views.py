import os
from datetime import datetime, timedelta
import requests
from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response
from kaiten.models import Participant, Task
from kaiten.serializers import ParticipantSerializer, ParticipantCreateSerializer, TaskSerializer


class KaitenData(APIView):

    def get(self, request, format=None):
        participants = Participant.objects.all()
        serializer = ParticipantSerializer(participants, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        auth_key = os.getenv('KAITEN_TOKEN')
        url = 'https://boyarkin.kaiten.ru/api/latest/cards/?additional_card_fields=description'
        r = requests.get(
            url,
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth_key})
        cards = r.json()
        participants = dict()

        for card in cards:
            if 'members' in card and card['column']['title'] in [
                    'In progress', 'Ready (на проверку)', 'done']:
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
            serializer = ParticipantCreateSerializer(
                data=participants[participant])

            if serializer.is_valid():
                serializer.save()

        return Response(participants, status=status.HTTP_200_OK)

    def put(self, request):
        auth_key = os.getenv('KAITEN_TOKEN')
        url = 'https://boyarkin.kaiten.ru/api/latest/cards/?additional_card_fields=description&updated_after=' + \
              str(datetime.now() - timedelta(hours=5))
        r = requests.get(
            url,
            headers={
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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

                    serializer = TaskSerializer(
                        data={
                            'kaiten_task_id': card['id'],
                            'name': card['title'],
                            'status': card['column']['title'],
                            'description': card['description'],
                            'create_date': card['created'],
                            'update_date': card['updated']},
                        instance=instance)

                    if serializer.is_valid():
                        serializer.save()
                    else:
                        return Response(
                            serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
            except BaseException:
                updated_cards.append(
                    {'kaiten_task_id': card['id'], 'name': card['title'], 'description': card['description'],
                     'status': 'Innactive DB entry'})

        return Response(updated_cards, status=status.HTTP_200_OK)
