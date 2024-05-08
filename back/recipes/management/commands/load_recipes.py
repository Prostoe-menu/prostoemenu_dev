import json

from django.conf import settings as django_settings
from django.core.management.base import BaseCommand
from django.db import transaction

from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Category, Recipe, RecipeIngredient, RecipeStep


class Command(BaseCommand):

    @staticmethod
    def add_rec_step_objects(data, recipe_obj):
        rec_step_lst = []
        for row in data:
            rec_step_lst.append(
                {
                    "recipe": recipe_obj,
                    "step_number": row["step_num"],
                    "description": row["step_text"],
                    "image": row["step_photo"],
                }
            )

        return [
            RecipeStep.objects.create(**rec_step_dict) for rec_step_dict in rec_step_lst
        ]

    @staticmethod
    def add_rec_ingr_objects(data, recipe_obj):
        rec_ingr_lst = []
        for row in data:
            rec_ingr_data = {"recipe": recipe_obj, "volume": row["ingr_amount"]}
            rec_ingr_data["ingredient"] = Ingredient.objects.get(name=row["ingr_name"])
            rec_ingr_data["measure"] = Measurement.objects.get(
                name=row["ingr_measure"].lower()
            )
            rec_ingr_lst.append(rec_ingr_data)

        return [
            RecipeIngredient.objects.create(**rec_ingr_dict)
            for rec_ingr_dict in rec_ingr_lst
        ]

    @staticmethod
    def add_objects(model, reader):
        for row in reader:
            recipe_data = {
                "title": row["dish_name"],
                "description": row["dish_data"]["descr"][
                    : django_settings.MAX_DESCR_LENGTH
                ],
                "cooking_time": row["dish_data"]["summary_list"]["Время готовки"],
                "oven_time": row["dish_data"]["summary_list"]["Время готовки"],
                "quantity": row["dish_data"]["summary_list"]["Количество порций"],
                "complexity": row["dish_data"]["summary_list"][
                    "Сложность приготовления"
                ],
                "cover_path": row["dish_data"]["main_photo"],
            }

            try:
                recipe_data["category"] = Category.objects.get(name=row["categ_name"])
            except Category.DoesNotExist:
                recipe_data["category"] = Category.objects.get(name="Без категории")

            try:
                with transaction.atomic():
                    new_recipe_obj = model.objects.create(**recipe_data)
                    Command.add_rec_ingr_objects(
                        row["dish_data"]["ingr"], new_recipe_obj
                    )
                    Command.add_rec_step_objects(
                        row["dish_data"]["steps"], new_recipe_obj
                    )

            except Exception as e:
                # Здесь будет логгирование
                print(f"Ошибка {e} при загрузке рецепта: {row['dish_name']}")
                continue

        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))
