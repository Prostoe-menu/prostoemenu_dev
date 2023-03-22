from rest_framework import serializers
from kaiten.models import *


##########################################################################
#                          Participant post and put method's             #
#                                                                        #
##########################################################################


class TaskSerializer(serializers.ModelSerializer):
    kaiten_task_id = serializers.IntegerField()
    name = serializers.CharField()
    status = serializers.CharField()
    description = serializers.CharField(allow_null=True)
    update_date = serializers.DateTimeField()
    create_date = serializers.DateTimeField()

    class Meta:
        model = Task
        fields = (
            'kaiten_task_id',
            'name',
            'status',
            'description',
            'update_date',
            'create_date')

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.update_date = validated_data.get(
            'update_date', instance.update_date)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.save()
        return instance


class ParticipantCreateSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Participant
        fields = (
            'name',
            'username',
            'kaiten_user_id',
            'number_of_completed_tasks',
            'last_updated_task',
            'tasks')

    def create(self, validated_data):
        tasks = validated_data.pop('tasks')
        participant, created = Participant.objects.get_or_create(
            **validated_data)

        for task in tasks:
            task_to_add, created = Task.objects.get_or_create(kaiten_task_id=task.get('kaiten_task_id'),
                                                              defaults={
                                                                  'kaiten_task_id': task.get('kaiten_task_id'),
                                                                  'name': task.get('name'),
                                                                  'status': task.get('status'),
                                                                  'update_date': task.get('update_date'),
                                                                  'create_date': task.get('create_date')})

            ParticipantTasks.objects.create(
                participant=participant, task=task_to_add)

        return participant


##########################################################################
#                                                                        #
#                          Participant get method                        #
#                                                                        #
##########################################################################


class ParticipantTasksSerializer(serializers.ModelSerializer):
    kaiten_task_id = serializers.IntegerField(source='task__kaiten_task_id')
    name = serializers.CharField(source='task__name')
    status = serializers.CharField(source='task__status')
    description = serializers.CharField(source='task__description')
    update_date = serializers.DateTimeField(source='task__update_date')
    create_date = serializers.DateTimeField(source='task__create_date')

    class Meta:
        model = ParticipantTasks
        fields = (
            'kaiten_task_id',
            'name',
            'status',
            'description',
            'update_date',
            'create_date')


class ParticipantSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = Participant
        fields = (
            'name',
            'username',
            'kaiten_user_id',
            'number_of_completed_tasks',
            'last_updated_task',
            'tasks')

    def get_tasks(self, participant_instance):
        query_datas = ParticipantTasks.objects.select_related(
            'participant',
            'task').filter(
            participant=participant_instance).values(
            'task__kaiten_task_id',
            'task__name',
            'task__status',
            'task__update_date',
            'task__create_date',
            'task__description')
        return [ParticipantTasksSerializer(task).data for task in query_datas]
