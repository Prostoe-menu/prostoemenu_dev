# Generated by Django 4.1.7 on 2023-03-24 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0006_remove_profile_user_id_profile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Measurement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, unique=True)),
                ('abbreviation', models.CharField(max_length=30)),
                ('rank_size', models.IntegerField()),
            ],
            options={
                'verbose_name': 'Единица измерения',
                'verbose_name_plural': 'Единицы измерения',
                'ordering': ['rank_size'],
            },
        ),
    ]
