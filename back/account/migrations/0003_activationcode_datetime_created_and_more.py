# Generated by Django 4.1.7 on 2023-05-08 08:11

import account.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_activationcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='activationcode',
            name='datetime_created',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата генерации кода'),
        ),
        migrations.AlterField(
            model_name='activationcode',
            name='code',
            field=models.CharField(default=account.models.generate_activation_code, max_length=6, verbose_name='Код активации'),
        ),
    ]
