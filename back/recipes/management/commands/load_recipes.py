import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from django.conf import settings as django_settings

from recipes.models import Recipe, Category, RecipeStep, RecipeIngredient
from ingredients.models import Ingredient
from measurements.models import Measurement



def add_recipe_ingredient_objects(data, recipe_obj, model=RecipeIngredient):
    recipe_ingr_objects = []
    for row in data:
        recipe_ingredient_data = {
            "recipe": recipe_obj,
            "volume": row["ingr_amount"]
        }
        try:
            recipe_ingredient_data["ingredient"] = Ingredient.objects.get(name=row["ingr_name"])
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
            new_recipe_ingredient_obj = model.objects.create(**recipe_ingredient_data)
            recodered_objects.append(new_recipe_ingredient_obj)
        except Exception as err:
            print(f"Ошибка! {recipe_obj} {object} при сохранении объекта recipe_ingredient: {err}")
            for rec_obj in recodered_objects:
                rec_obj.delete()
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







            # for ingredient in row["dish_data"]["ingr"]:
            #     recipe_ingredient_data = {
            #         "recipe": new_recipe_obj,
            #         "volume": ingredient["ingr_amount"],
            #     }
            #     try:
            #         recipe_ingredient_data["ingredient"] = Ingredient.objects.get(
            #             name=ingredient["ingr_name"]
            #         )
            #     except Ingredient.DoesNotExist as err:
            #         print(
            #             f"Ошибка! Ингредиент {ingredient['ingr_name']} отсутствует в БД. {err}"
            #         )
            #         continue
            #
            #     try:
            #         # recipe_ingredient_data["measure"] = Measurement.objects.filter(name=ingredient["ingr_measure"])
            #         recipe_ingredient_data["measure"] = Measurement.objects.get(
            #             name=ingredient["ingr_measure"]
            #         )
            #     except Measurement.DoesNotExist as err:
            #         print(
            #             f"Ошибка! Единица измерения {ingredient['ingr_measure']} отсутствует в БД. {err}"
            #         )
            #         continue
            #     models["recipe_ingredient_model"].objects.create(
            #         **recipe_ingredient_data
            #     )
            #
            # for step in row["dish_data"]["steps"]:
            #     recipe_step_data = {
            #         "recipe": new_recipe_obj,
            #         "step_number": step["step_num"],
            #         "description": step["step_text"],
            #         "image": step["step_photo_title"],
            #     }
            #     models["recipe_step_model"].objects.create(**recipe_step_data)

        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("back/data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))
