# Generated by Django 5.0.2 on 2024-04-17 06:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("recipes", "0005_alter_recipestep_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="recipeingredient",
            name="volume",
            field=models.DecimalField(
                decimal_places=2,
                max_digits=4,
                validators=[django.core.validators.MinValueValidator(0.1)],
                verbose_name="Количество",
            ),
        ),
    ]