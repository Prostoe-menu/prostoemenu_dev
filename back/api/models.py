from django.db import models

from django.db import models


class Task(models.Model):
    kaiten_task_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=350)
    status = models.CharField(max_length=50)
    description = models.TextField(null=True)
    create_date = models.DateTimeField()
    update_date = models.DateTimeField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Задание'
        verbose_name_plural = 'Задания'


class Participant(models.Model):
    name = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=100, unique=True)
    kaiten_user_id = models.IntegerField(null=True)
    number_of_completed_tasks = models.IntegerField(default=0)
    last_updated_task = models.DateTimeField()

    task = models.ManyToManyField(Task, through='ParticipantTasks', related_name='participant_task')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        unique_together = ['name', 'username']


class ParticipantTasks(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, verbose_name='Номер участника')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name='Номер задания')

    def __str__(self):
        return self.participant.__str__() + " " + self.task.__str__()

    class Meta:
        verbose_name = 'Задание участника'
        verbose_name_plural = 'Задания участника'
        unique_together = ['participant', 'task']
