from django.shortcuts import get_object_or_404

from .models import Measurement


def measurement_get(measurement_id):
    measurement = get_object_or_404(Measurement, id=measurement_id)
    return measurement


def measurement_list():
    measurements = Measurement.objects.all()
    return measurements
