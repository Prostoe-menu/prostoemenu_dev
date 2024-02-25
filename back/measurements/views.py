from django.shortcuts import get_object_or_404
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework.decorators import APIView
from rest_framework.response import Response

from .models import Measurement
from .serializers import MeasurementSerializer


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
        responses={200: MeasurementSerializer},
        operation_id="measurement_detail_api",
    )
    def get(self, request, id=None):
        measurement = get_object_or_404(Measurement, id=id)
        serializer = MeasurementSerializer(measurement)

        return Response(serializer.data)


class MeasurementListApi(APIView):
    @extend_schema(
        summary="Список всех мер измерений.",
        description="Эндпоинт получения списка всех мер измерений.",
        tags=("Measurements",),
        responses={200: MeasurementSerializer(many=True)},
        operation_id="measurement_list_api",
    )
    def get(self, request):
        measurements = Measurement.objects.all()
        serializer = MeasurementSerializer(measurements, many=True)

        return Response(serializer.data)
