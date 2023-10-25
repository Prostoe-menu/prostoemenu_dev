from recipe.models import Measurement
from rest_framework import serializers


class MeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measurement
        fields = ('name', 'abbreviation')