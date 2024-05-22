# Generated by Django 5.0.2 on 2024-03-02 18:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("ingredients", "0001_initial"),
        ("measurements", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Recipe",
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
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата создания"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Дата обновления"),
                ),
                (
                    "title",
                    models.CharField(
                        max_length=100, unique=True, verbose_name="Название"
                    ),
                ),
                ("description", models.TextField(null=True, verbose_name="Описание")),
                (
                    "cooking_time",
                    models.PositiveSmallIntegerField(verbose_name="Время готовки"),
                ),
                (
                    "oven_time",
                    models.PositiveSmallIntegerField(
                        verbose_name="Время готовки у плиты"
                    ),
                ),
                (
                    "quantity",
                    models.PositiveSmallIntegerField(
                        default=1, verbose_name="Количество порций"
                    ),
                ),
                (
                    "complexity",
                    models.PositiveSmallIntegerField(verbose_name="Сложность готовки"),
                ),
                (
                    "cover_path",
                    models.ImageField(upload_to="media", verbose_name="Главное фото"),
                ),
                (
                    "author",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="recipes",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Автор",
                    ),
                ),
            ],
            options={
                "verbose_name": "Рецепт",
                "verbose_name_plural": "Рецепты",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="RecipeIngredient",
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
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата создания"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Дата обновления"),
                ),
                ("volume", models.PositiveSmallIntegerField(verbose_name="Количество")),
                (
                    "ingredient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="recipes",
                        to="ingredients.ingredient",
                    ),
                ),
                (
                    "measure",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="measurements.measurement",
                        verbose_name="Единица измерения",
                    ),
                ),
                (
                    "recipe",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="ingredients",
                        to="recipes.recipe",
                    ),
                ),
            ],
            options={
                "verbose_name": "Ингредиент в рецепте",
                "verbose_name_plural": "Ингредиенты в рецептах",
            },
        ),
        migrations.CreateModel(
            name="RecipeStep",
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
                    "created_at",
                    models.DateTimeField(
                        auto_now_add=True, verbose_name="Дата создания"
                    ),
                ),
                (
                    "updated_at",
                    models.DateTimeField(auto_now=True, verbose_name="Дата обновления"),
                ),
                (
                    "step_number",
                    models.PositiveSmallIntegerField(verbose_name="Номер шага"),
                ),
                ("description", models.TextField(verbose_name="Описание шага")),
                (
                    "image",
                    models.ImageField(upload_to="recipes", verbose_name="Изображение"),
                ),
                (
                    "recipe",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="steps",
                        to="recipes.recipe",
                    ),
                ),
            ],
            options={
                "verbose_name": "Шаг",
                "verbose_name_plural": "Шаги",
            },
        ),
    ]
