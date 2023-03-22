from django.contrib import admin
from .models import Participant, Task, ParticipantTasks

# Register your models here.
admin.site.register(Participant)
admin.site.register(Task)
admin.site.register(ParticipantTasks)
