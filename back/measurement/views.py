from .serializers import MeasurementSerializer
from drf_spectacular.utils import extend_schema
from recipe.models import Measurement

from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.response import Response


class MeasurementList(APIView):
    @extend_schema(
        summary='Список всех мер измерений.',
        description='Эндпоинт получения списка всех мер измерений.',
        tags=('Ingredients',),
        responses={200: MeasurementSerializer}
    )
    def get(self, request):
        measurements = Measurement.objects.all()
        serializer = MeasurementSerializer(measurements, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
