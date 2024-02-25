from rest_framework import serializers

from .models import Measurement


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ("id", "name", "abbreviation")
