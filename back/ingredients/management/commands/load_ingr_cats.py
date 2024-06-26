import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ingredients.models import Category


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
        with open("data/ingredient_cats.json", "rb") as categories:
            reader_ingredient_cats = json.load(categories)
        self.stdout.write(
            self.style.SUCCESS(self.add_objects(Category, reader_ingredient_cats))
        )
