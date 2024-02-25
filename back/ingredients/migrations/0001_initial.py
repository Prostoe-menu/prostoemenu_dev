# Generated by Django 5.0.2 on 2024-02-25 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Ingredient",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=100, unique=True, verbose_name="Название ингредиента"
                    ),
                ),
                (
                    "category",
                    models.CharField(
                        default="Category",
                        max_length=100,
                        verbose_name="Категория ингредиента",
                    ),
                ),
                (
                    "sort",
                    models.SmallIntegerField(
                        null=True, verbose_name="Порядок ингредиента"
                    ),
                ),
            ],
            options={
                "verbose_name": "Ингредиент",
                "verbose_name_plural": "Ингредиенты",
            },
        ),
    ]
