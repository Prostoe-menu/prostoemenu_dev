# Generated by Django 4.1.7 on 2023-06-24 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_activationcode_datetime_created_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='activationcode',
            name='code_generated_num',
            field=models.SmallIntegerField(default=1, verbose_name='Количество генераций кода'),
        ),
    ]