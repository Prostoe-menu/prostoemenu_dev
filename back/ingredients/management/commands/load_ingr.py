import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from ingredients.models import Category, Ingredient


class Command(BaseCommand):

    def add_objects(self, model, reader):
        error_lst = []
        for row in reader:
            try:
                row["category"] = Category.objects.get(name=row["category"])
                model.objects.create(**row)
            except IntegrityError as e:
                error_lst.append({f"{e}": f"{row}"})
                print(f"Error while loading {row}. Ingredient already exists.")
            except Category.DoesNotExist as e:
                error_lst.append({f"{e}": f"{row}"})
                print(
                    f"Error while loading {row}. Category {row['category']} does not exist."
                )

        if error_lst:
            return f"Database Update {model} finished with errors: {error_lst}"
        return f"Database Update {model}"

    def handle(self, *args, **options):
        with open("data/ingredients.json", "rb") as ingredients:
            reader_ingredients = json.load(ingredients)
        self.stdout.write(
            self.style.SUCCESS(self.add_objects(Ingredient, reader_ingredients))
        )
