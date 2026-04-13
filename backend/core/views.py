from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .filters import *

from django_filters.rest_framework import DjangoFilterBackend

from .models import *
from .serializers import *

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()

        if self.request.user.is_staff:
            return qs
        
        return qs.filter(user=self.request.user)

    @action(detail=False, methods=['get'], url_path="me")
    def me(self, request):
        usuario = Usuario.objects.filter(user=request.user).first()
        if not usuario:
            return Response({"detail": "Perfil não encontrado"}, status=404)

        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path="tipo-choices", permission_classes=[AllowAny])
    def tipo_choices(self, request):
        return Response([
            {"value": v, "label": l}
            for v, l in Usuario.TIPO_CHOICES
        ])

class LocalViewSet(ModelViewSet):
    queryset = Local.objects.all()
    serializer_class = LocalSerializer
    permission_classes = [IsAuthenticated]

class ResponsavelViewSet(ModelViewSet):
    queryset = Responsavel.objects.all()
    serializer_class = ResponsavelSerializer
    permission_classes = [IsAuthenticated]

class AmbienteViewSet(ModelViewSet):
    queryset = Ambiente.objects.all()
    serializer_class = AmbienteSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = AmbienteFilter

class MicrocontroladorViewSet(ModelViewSet):
    queryset = Microcontrolador.objects.all()
    serializer_class = MicrocontroladorSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = MicrocontroladorFilter

    @action(detail=True, methods=['get'])
    def sensores(self, request, pk=None):
        micro = self.get_object()
        sensores = micro.sensores.all()
        serializer = SensorSerializer(sensores, many=True)
        return Response(serializer.data)

class SensorViewSet(ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = SensorFilter

    @action(detail=True, methods=['get'])
    def historico(self, request, pk=None):
        sensor = self.get_object()
        historicos = sensor.historicos.all().order_by('-timestamp')[:50]
        serializer = HistoricoSerializer(historicos, many=True)
        return Response(serializer.data)

class HistoricoViewSet(ModelViewSet):
    queryset = Historico.objects.all()
    serializer_class = HistoricoSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_fields = HistoricoFilter

