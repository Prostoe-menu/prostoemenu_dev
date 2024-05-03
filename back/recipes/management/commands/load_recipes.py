import json

from django.conf import settings as django_settings
from django.core.management.base import BaseCommand

from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Category, Recipe, RecipeIngredient, RecipeStep


def add_rec_step_objects(data, recipe_obj):
    rec_step_objects = []
    for row in data:
        rec_step_data = {
            "recipe": recipe_obj,
            "step_number": row["step_num"],
            "description": row["step_text"],
            "image": row["step_photo"],
        }
        rec_step_objects.append(rec_step_data)

    recodered_objects = []
    for obj in rec_step_objects:
        try:
            step_obj = RecipeStep.objects.create(**obj)
            recodered_objects.append(step_obj)
        except Exception as err:
            print(
                f"Ошибка! Рецепт: {recipe_obj}. Данные шага: {obj} при сохранении recipe_step: {err}"
            )
            for object in recodered_objects:
                object.delete()
            return False
    return recodered_objects


def add_rec_ingr_objects(data, recipe_obj):
    rec_ingr_objects = []
    for row in data:
        rec_ingr_data = {"recipe": recipe_obj, "volume": row["ingr_amount"]}
        try:
            rec_ingr_data["ingredient"] = Ingredient.objects.get(name=row["ingr_name"])
        except Ingredient.DoesNotExist as err:
            print(
                f"Ошибка! Рецепт '{recipe_obj.title}' ингредиент {row['ingr_name']} отсутствует в БД. {err}"
            )
            return False
        try:
            rec_ingr_data["measure"] = Measurement.objects.get(
                name=row["ingr_measure"].lower()
            )
        except Measurement.DoesNotExist as err:
            print(
                f"Ошибка! Рецепт '{recipe_obj.title}' ед. изм. '{row['ingr_measure']}' отсутствует в БД. {err}"
            )
            return False

        rec_ingr_objects.append(rec_ingr_data)

    recodered_objects = []
    for obj in rec_ingr_objects:
        try:
            new_recipe_ingredient_obj = RecipeIngredient.objects.create(**obj)
            recodered_objects.append(new_recipe_ingredient_obj)
        except Exception as err:
            print(f"Ошибка! {recipe_obj} {obj} при сохранении recipe_ingredient: {err}")
            for object in recodered_objects:
                object.delete()
            return False
    return recodered_objects


class Command(BaseCommand):

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
                "author": None,
                "cover_path": row["dish_data"]["main_photo"],
            }

            try:
                recipe_data["category"] = Category.objects.get(name=row["categ_name"])
            except Category.DoesNotExist:
                recipe_data["category"] = Category.objects.get(name="Без категории")

            try:
                new_recipe_obj = model.objects.create(**recipe_data)

            except Exception as e:
                print(f"Ошибка {e} при загрузке рецепта: {row['dish_name']}")
                continue

            if not (
                add_rec_ingr_objects(row["dish_data"]["ingr"], new_recipe_obj)
                and add_rec_step_objects(row["dish_data"]["steps"], new_recipe_obj)
            ):
                new_recipe_obj.delete()

        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("back/data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))
