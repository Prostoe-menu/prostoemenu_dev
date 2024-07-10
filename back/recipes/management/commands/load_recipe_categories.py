import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from recipes.models import Category


class Command(BaseCommand):

    @staticmethod
    def add_objects(model, reader):
        model_object = model
        for row in reader:
            try:
                model_object.objects.create(**row)
            except IntegrityError as e:
                print(f"Ошибка {e} при загрузке {row}")
        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("data/recipe_categories.json", "rb") as categories:
            reader_categories = json.load(categories)
        self.stdout.write(
            self.style.SUCCESS(self.add_objects(Category, reader_categories))
        )
