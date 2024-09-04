import json
import os

from django.conf import settings as django_settings
from django.core.files.images import ImageFile
from django.core.management.base import BaseCommand
from django.db import transaction

from ingredients.models import Ingredient
from measurements.models import Measurement
from recipes.models import Category, Recipe, RecipeIngredient, RecipeStep


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("base dir:", django_settings.BASE_DIR)
        with open("data/recipes.json", "rb") as recipes:
            reader_recipes = json.load(recipes)
        self.stdout.write(self.style.SUCCESS(self.add_objects(Recipe, reader_recipes)))

    @staticmethod
    def add_objects(model, reader):
        default_category = Category.objects.get(name="без категории")
        print("default image:", django_settings.DEFAULT_DISH_IMAGE)
        default_image = ImageFile(open(django_settings.DEFAULT_DISH_IMAGE, "rb"))
        for row in reader:
            image = Command.get_image(row["dish_data"]["main_photo"])
            image_file = image if image else default_image
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
                "cover_path": image_file,
            }

            try:
                recipe_data["category"] = Category.objects.get(name=row["categ_name"])
            except Category.DoesNotExist:
                recipe_data["category"] = default_category

            try:
                with transaction.atomic():
                    Command.rearrange_image_storage(new_recipe_obj)
                    new_recipe_obj = model.objects.create(**recipe_data)
                    Command.rearrange_image_storage(new_recipe_obj)
                    Command.add_rec_ingr_objects(
                        row["dish_data"]["ingr"], new_recipe_obj
                    )
                    Command.add_rec_step_objects(
                        row["dish_data"]["steps"], new_recipe_obj
                    )

            except Exception as e:
                # Здесь будет логирование
                print(f"Ошибка {e} при загрузке рецепта: {row['dish_name']}")
                continue

        return f"Database Update {model}"

    @staticmethod
    def get_image(link):
        if not link:
            return None
        try:
            return ImageFile(
                open(
                    f"{django_settings.IMAGE_SOURCE_FOLDER}/{link.split('/')[-1]}", "rb"
                )
            )
        except FileNotFoundError:
            return None

    @staticmethod
    def rearrange_image_storage(recipe_obj):
        old_dir = django_settings.MEDIA_ROOT.joinpath(
            Command.get_upload_folder(recipe_obj.cover_path.path)
        )
        new_dir = django_settings.MEDIA_ROOT.joinpath("recipes", str(recipe_obj.pk))
        os.rename(old_dir, new_dir)
        recipe_obj.cover_path.name = os.path.join(
            "recipes", str(recipe_obj.pk), recipe_obj.cover_path.name.split("/")[-1]
        )
        print(new_dir)
        recipe_obj.save()

    @staticmethod
    def get_upload_folder(filename):
        filename = filename.split("/")[-1]
        return os.path.join("recipes", filename.split(".")[0])

    @staticmethod
    def add_rec_ingr_objects(data, recipe_obj):
        for row in data:
            rec_ingr_data = {"recipe": recipe_obj, "volume": row["ingr_amount"]}
            rec_ingr_data["ingredient"] = Ingredient.objects.get(name=row["ingr_name"])
            rec_ingr_data["measure"] = Measurement.objects.get(
                name=row["ingr_measure"].lower()
            )
            RecipeIngredient.objects.create(**rec_ingr_data)

    @staticmethod
    def add_rec_step_objects(data, recipe_obj):
        for row in data:
            RecipeStep.objects.create(
                recipe=recipe_obj,
                step_number=row["step_num"],
                description=row["step_text"],
                image=Command.get_image(row["step_photo"]),
            )
