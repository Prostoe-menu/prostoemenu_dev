from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import APIView
from rest_framework.response import Response

from .serializers.output import MeasurementOutputSerializer
from .selectors import measurement_get, measurement_list


class MeasurementDetailApi(APIView):
    @extend_schema(
        summary="Получить меру измерения по ID.",
        description="Эндпоинт меры измерения по ID.",
        tags=("Measurements",),
        parameters=[
            OpenApiParameter(
                name="id", type=int, location=OpenApiParameter.PATH, required=True
            )
        ],
        responses={200: MeasurementOutputSerializer},
        operation_id="measurement_detail_api",
    )
    def get(self, request, id):
        measurement = measurement_get(measurement_id=id)
        serializer = MeasurementOutputSerializer(measurement)

        return Response(serializer.data)


class MeasurementListApi(APIView):
    @extend_schema(
        summary="Список всех мер измерений.",
        description="Эндпоинт получения списка всех мер измерений.",
        tags=("Measurements",),
        responses={200: MeasurementOutputSerializer(many=True)},
        operation_id="measurement_list_api",
    )
    def get(self, request):
        measurements = measurement_list()
        serializer = MeasurementOutputSerializer(measurements, many=True)

        return Response(serializer.data)
