import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from django.conf import settings as django_settings

from recipes.models import Recipe, Category, RecipeStep, RecipeIngredient
from ingredients.models import Ingredient
from measurements.models import Measurement


def add_recipe_step_objects(data, recipe_obj, model=RecipeStep):
    recipe_step_objects = []
    for row in data:
        recipe_step_data = {
            "recipe": recipe_obj,
            "step_number": row["step_num"],
            "description": row["step_text"],
            "image": row["step_photo"]
        }
        recipe_step_objects.append(recipe_step_data)

    recodered_objects = []
    for obj in recipe_step_objects:
        try:
            step_obj = model.objects.create(**obj)
            recodered_objects.append(step_obj)
        except Exception as err:
            print(f"Ошибка! Рецепт: {recipe_obj}. Данные шага: {obj} при сохранении recipe_step: {err}")
            for obj in recodered_objects:
                obj.delete()
            return False
    return recodered_objects


def add_recipe_ingredient_objects(data, recipe_obj, model=RecipeIngredient):
    recipe_ingr_objects = []
    for row in data:
        recipe_ingredient_data = {
            "recipe": recipe_obj,
            "volume": row["ingr_amount"]
        }
        try:
            recipe_ingredient_data["ingredient"] = Ingredient.objects.get(name=row["ingr_name"])
            print(f"Ингредиент: {recipe_ingredient_data['ingredient'].name} pk: {recipe_ingredient_data['ingredient'].pk}")
        except Ingredient.DoesNotExist as err:
            print(f"Ошибка! Рецепт '{recipe_obj.title}' ингредиент {row['ingr_name']} отсутствует в БД. {err}")
            return False
        try:
            recipe_ingredient_data["measure"] = Measurement.objects.get(name=row["ingr_measure"].lower())
        except Measurement.DoesNotExist as err:
            print(f"Ошибка! Рецепт '{recipe_obj.title}' единица измерения '{row['ingr_measure']}' отсутствует в БД. {err}")
            return False

        recipe_ingr_objects.append(recipe_ingredient_data)

    recodered_objects = []
    for object in recipe_ingr_objects:
        try:
            new_recipe_ingredient_obj = model.objects.create(**object)
            recodered_objects.append(new_recipe_ingredient_obj)
        except Exception as err:
            print(f"Ошибка! {recipe_obj} {object} при сохранении recipe_ingredient: {err}")
            for obj in recodered_objects:
                obj.delete()
            return False
    return recodered_objects


class Command(BaseCommand):

    @staticmethod
    def add_objects(model, reader):
        for row in reader:
            print(row["dish_name"])
            recipe_data = {
                "title": row["dish_name"],
                "description": row["dish_data"]["descr"][:django_settings.MAX_DESCR_LENGTH],
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
                print("new recipe:", new_recipe_obj.pk)
            except IntegrityError as e:
                print(f"Ошибка целостности {e} при загрузке {row['dish_name']}")
                continue
            except Exception as e:
                print(f"Ошибка {e} при загрузке {row['dish_name']}")
                continue

            add_recipe_ingredient_objects(row["dish_data"]["ingr"], new_recipe_obj)
            add_recipe_step_objects(row["dish_data"]["steps"], new_recipe_obj)

        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("back/data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))
