# Generated by Django 5.0.2 on 2024-04-22 13:16

import common.validators
import django.core.validators
import django.db.models.deletion
from django.conf import settings as django_settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("recipes", "0007_alter_recipeingredient_volume"),
    ]

    operations = [
        migrations.CreateModel(
            name="Category",
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
                    "name",
                    models.CharField(
                        default="Без категории",
                        max_length=100,
                        unique=True,
                        validators=[
                            django.core.validators.MinLengthValidator(2),
                            common.validators.AcceptedSymbolsValidator(
                                django_settings.ACCEPTED_SYMBOLS
                            ),
                        ],
                        verbose_name="Категория",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinLengthValidator(10),
                            django.core.validators.MaxLengthValidator(500),
                            common.validators.AcceptedSymbolsValidator(
                                django_settings.ACCEPTED_SYMBOLS
                            ),
                        ],
                        verbose_name="Описание",
                    ),
                ),
            ],
            options={
                "verbose_name": "Категория",
                "verbose_name_plural": "Категории",
                "ordering": ["name"],
            },
        ),
        migrations.AddField(
            model_name="recipe",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="recipes",
                to="recipes.category",
                verbose_name="Категория",
            ),
        ),
    ]
