from drf_spectacular.utils import extend_schema
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from recipe.selectors import measurement_list


class MeasurementListApi(APIView):
    """
    Класс для представления эндпоинта по получению списка мер измерений.
    Методы:
        get: Вернет список всех мер измерений.
    """

    class OutputSerializer(serializers.Serializer):
        """Сериализатор выходящих данных."""

        id = serializers.IntegerField()
        name = serializers.CharField()
        abbreviation = serializers.CharField()

        class Meta:
            ref_name = "MeasurementList"

    @extend_schema(
        operation_id="measurement_list",
        summary="Список всех мер измерений.",
        description="Эндпоинт получения списка всех мер измерений.",
        tags=("Measurements",),
        responses={200: OutputSerializer},
    )
    def get(self, request):
        measurements = measurement_list()
        data = self.OutputSerializer(measurements, many=True).data
        return Response(data)
