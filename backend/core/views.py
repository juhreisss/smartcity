from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny
)

from rest_framework.decorators import (
    action,
    api_view,
    permission_classes
)

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend

from django.utils import timezone

from datetime import timedelta

import pandas as pd

from .models import *
from .serializers import *
from .filters import *
from .permissions import IsAdminOrReadOnly


# =========================
# USUÁRIOS
# =========================

class UsuarioViewSet(ModelViewSet):

    queryset = Usuario.objects.all()

    serializer_class = UsuarioSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        qs = super().get_queryset()

        if self.request.user.is_staff:
            return qs

        return qs.filter(user=self.request.user)

    @action(
        detail=False,
        methods=['get'],
        url_path="me"
    )
    def me(self, request):

        usuario = Usuario.objects.filter(
            user=request.user
        ).first()

        if not usuario:

            return Response(
                {"detail": "Perfil não encontrado"},
                status=404
            )

        serializer = UsuarioSerializer(usuario)

        return Response(serializer.data)

    @action(
        detail=False,
        methods=['get'],
        url_path="tipo-choices",
        permission_classes=[AllowAny]
    )
    def tipo_choices(self, request):

        return Response([

            {
                "value": v,
                "label": l
            }

            for v, l in Usuario.TIPO_CHOICES

        ])


# =========================
# LOCAIS
# =========================

class LocalViewSet(ModelViewSet):

    queryset = Local.objects.all()

    serializer_class = LocalSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]


# =========================
# RESPONSÁVEIS
# =========================

class ResponsavelViewSet(ModelViewSet):

    queryset = Responsavel.objects.all()

    serializer_class = ResponsavelSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]


# =========================
# AMBIENTES
# =========================

class AmbienteViewSet(ModelViewSet):

    queryset = Ambiente.objects.all()

    serializer_class = AmbienteSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]

    filterset_class = AmbienteFilter


# =========================
# MICROCONTROLADORES
# =========================

class MicrocontroladorViewSet(ModelViewSet):

    queryset = Microcontrolador.objects.all()

    serializer_class = MicrocontroladorSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]

    filterset_class = MicrocontroladorFilter

    @action(detail=True, methods=['get'])
    def sensores(self, request, pk=None):

        micro = self.get_object()

        sensores = micro.sensores.all()

        serializer = SensorSerializer(
            sensores,
            many=True
        )

        return Response(serializer.data)


# =========================
# SENSORES
# =========================

class SensorViewSet(ModelViewSet):

    queryset = Sensor.objects.all()

    serializer_class = SensorSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]

    filterset_class = SensorFilter

    @action(detail=False, methods=['get'])
    def por_tipo(self, request):

        tipo = request.GET.get("tipo")

        sensores = Sensor.objects.filter(
            sensor__iexact=tipo
        )

        serializer = SensorSerializer(
            sensores,
            many=True
        )

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def historico(self, request, pk=None):

        sensor = self.get_object()

        historicos = sensor.historicos.all().order_by(
            '-timestamp'
        )[:50]

        serializer = HistoricoSerializer(
            historicos,
            many=True
        )

        return Response(serializer.data)


# =========================
# HISTÓRICO
# =========================

class HistoricoViewSet(ModelViewSet):

    queryset = Historico.objects.all()

    serializer_class = HistoricoSerializer

    permission_classes = [
        IsAuthenticated,
        IsAdminOrReadOnly
    ]

    filter_backends = [DjangoFilterBackend]

    filterset_class = HistoricoFilter

    @action(detail=False, methods=['get'])
    def ultimas_24h(self, request):

        agora = timezone.now()

        ultimas = agora - timedelta(hours=24)

        historicos = Historico.objects.filter(
            timestamp__gte=ultimas
        )

        serializer = HistoricoSerializer(
            historicos,
            many=True
        )

        return Response(serializer.data)


# =========================
# IMPORTAR LOCAIS
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_locais(request):

    arquivo = request.FILES.get('file')

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        Local.objects.get_or_create(
            nome=row['local']
        )

    return Response({
        "msg": "Locais importados"
    })


# =========================
# IMPORTAR RESPONSÁVEIS
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_responsaveis(request):

    arquivo = request.FILES.get('file')

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        Responsavel.objects.get_or_create(
            nome=row['responsavel']
        )

    return Response({
        "msg": "Responsáveis importados"
    })


# =========================
# IMPORTAR AMBIENTES
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_ambientes(request):

    arquivo = request.FILES.get('file')

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        local = Local.objects.get(
            id=row['local']
        )

        responsavel = Responsavel.objects.get(
            id=row['responsavel']
        )

        Ambiente.objects.create(

            local=local,

            descricao=row['descricao'],

            responsavel=responsavel
        )

    return Response({
        "msg": "Ambientes importados"
    })


# =========================
# IMPORTAR MICROCONTROLADORES
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_microcontroladores(request):

    arquivo = request.FILES.get('file')

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        ambiente = Ambiente.objects.get(
            id=row['ambiente']
        )

        Microcontrolador.objects.create(

            modelo=row['modelo'],

            mac_address=row['mac_address'],

            latitude=row['latitude'],

            longitude=row['longitude'],

            status=True,

            ambiente=ambiente
        )

    return Response({
        "msg": "Microcontroladores importados"
    })


# =========================
# IMPORTAR SENSORES
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_sensores(request):

    arquivo = request.FILES.get('file')

    if not arquivo:

        return Response(
            {"erro": "Arquivo não enviado"},
            status=400
        )

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        mic = Microcontrolador.objects.get(
            id=row['mic']
        )

        Sensor.objects.create(

            sensor=row['sensor'].lower(),

            unidade_med=row['unidade_med'],

            mic=mic,

            status=True
        )

    return Response({
        "msg": "Sensores importados"
    })


# =========================
# IMPORTAR HISTÓRICO
# =========================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def importar_historico(request):

    arquivo = request.FILES.get('file')

    if not arquivo:

        return Response(
            {"erro": "Arquivo não enviado"},
            status=400
        )

    df = pd.read_excel(arquivo)

    for _, row in df.iterrows():

        sensor = Sensor.objects.filter(
            sensor=row['sensor'].lower()
        ).first()

        if sensor:

            Historico.objects.create(

                sensor=sensor,

                valor=row['valor']
            )

    return Response({
        "msg": "Histórico importado"
    })


# =========================
# REGISTER
# =========================

class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(

                {
                    "message":
                    "Usuário criado com sucesso"
                },

                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )