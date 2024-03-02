import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ingredients.models import Ingredient


class Command(BaseCommand):

    def add_objects(self, model, reader):
        model_object = model
        for row in reader:
            try:
                model_object.objects.create(**row)
            except IntegrityError as e:
                print(f"Ошибка {e} при загрузке {row}")
        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("data/ingredients.json", "rb") as ingredients:
            reader_ingredients = json.load(ingredients)
        self.stdout.write(
            self.style.SUCCESS(self.add_objects(Ingredient, reader_ingredients))
        )
