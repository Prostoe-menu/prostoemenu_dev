import json

from django.conf import settings as django_settings
from django.core.management.base import BaseCommand

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

        recodered_objects = []

        for obj in rec_step_lst:
            try:
                rec_step_obj = RecipeStep.objects.create(**obj)
                recodered_objects.append(rec_step_obj)
            except Exception as err:
                print(f"Ошибка! Рецепт: {recipe_obj}. Шаг: {obj}. Ошибка: {err}")
                # Почему это работает корректно? Из БД автоматически удаляются
                # внесенные на предыдущих итерациях цикла записи RecipeStep.
                # for rec_step_obj in recodered_objects:
                #     rec_step_obj.delete()
                return False

        return recodered_objects

    @staticmethod
    def add_rec_ingr_objects(data, recipe_obj):
        rec_ingr_lst = []
        for row in data:
            rec_ingr_data = {"recipe": recipe_obj, "volume": row["ingr_amount"]}
            try:
                rec_ingr_data["ingredient"] = Ingredient.objects.get(
                    name=row["ingr_name"]
                )
            except Exception as err:
                print(
                    f"Ошибка! Рецепт: '{recipe_obj.title}'. Ингредиент: {row['ingr_name']}. Ошибка: {err}"
                )
                return False
            try:
                rec_ingr_data["measure"] = Measurement.objects.get(
                    name=row["ingr_measure"].lower()
                )
            except Exception as err:
                print(
                    f"Ошибка! Рецепт: '{recipe_obj.title}'. Ед. изм.: '{row['ingr_measure']}'. Ошибка: {err}"
                )
                return False

            rec_ingr_lst.append(rec_ingr_data)

        recodered_objects = []
        for obj in rec_ingr_lst:
            try:
                rec_ing_obj = RecipeIngredient.objects.create(**obj)
                recodered_objects.append(rec_ing_obj)
            except Exception as err:
                print(f"Ошибка! Рецепт: {recipe_obj}. Ингредиент: {obj}. Ошибка: {err}")
                # Почему это работает корректно? Из БД автоматически удаляются
                # внесенные на предыдущих итерациях цикла записи модели RecipeIngredient.
                # for r_obj in recodered_objects:
                #     r_obj.delete()
                return False
        return recodered_objects

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
                new_recipe_obj = model.objects.create(**recipe_data)

            except Exception as e:
                print(f"Ошибка {e} при загрузке рецепта: {row['dish_name']}")
                continue

            # Почему это работает корректно??? Ведь если ошибка в шаге, то шаги и рецепт удалятся,
            # а ингредиенты (RecipeIngredient) должны остаться в бд, но это не так.
            if not Command.add_rec_ingr_objects(
                row["dish_data"]["ingr"], new_recipe_obj
            ):
                new_recipe_obj.delete()
                continue

            if not Command.add_rec_step_objects(
                row["dish_data"]["steps"], new_recipe_obj
            ):
                new_recipe_obj.delete()

        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))
