# Generated by Django 4.1.7 on 2023-03-11 11:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_participant_kaiten_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='caiten_task_id',
            new_name='kaiten_task_id',
        ),
    ]
