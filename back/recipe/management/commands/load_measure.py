import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from recipe.models import Measurement


class Command(BaseCommand):

    def add_objects(self, model, reader):
        model_object = model
        for row in reader:
            try:
                model_object.objects.create(**row)
            except IntegrityError as e:
                print(f'Ошибка {e} при загрузке {row}')
        return f'Database Update {model}'

    def handle(self, *args, **options):
        with open('data/measurements.json', 'rb') as measurements:
            reader_measurements = json.load(measurements)
        self.stdout.write(
            self.style.SUCCESS(
                self.add_objects(Measurement, reader_measurements)))
