import django_filters
from .models import *

class UsuarioFilter(django_filters.FilterSet):
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    tipo = django_filters.CharFilter(field_name='tipo', lookup_expr='iexact')

    class Meta:
        model = Usuario
        fields = ['nome', 'tipo']


class AmbienteFilter(django_filters.FilterSet):
    descricao = django_filters.CharFilter(field_name='descricao', lookup_expr='icontains')
    local = django_filters.NumberFilter(field_name='local_id')
    responsavel = django_filters.NumberFilter(field_name='responsavel_id')

    class Meta:
        model = Ambiente
        fields = ['descricao', 'local', 'responsavel']


class MicrocontroladorFilter(django_filters.FilterSet):
    modelo = django_filters.CharFilter(field_name='modelo', lookup_expr='icontains')
    status = django_filters.BooleanFilter(field_name='status')
    ambiente = django_filters.NumberFilter(field_name='ambiente_id')

    class Meta:
        model = Microcontrolador
        fields = ['modelo', 'status', 'ambiente']


class SensorFilter(django_filters.FilterSet):
    sensor = django_filters.CharFilter(field_name='sensor', lookup_expr='iexact')
    status = django_filters.BooleanFilter(field_name='status')
    mic = django_filters.NumberFilter(field_name='mic_id')

    class Meta:
        model = Sensor
        fields = ['sensor', 'status', 'mic']


class HistoricoFilter(django_filters.FilterSet):
    sensor = django_filters.NumberFilter(field_name='sensor_id')

    data_inicio = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='gte')
    data_fim = django_filters.DateTimeFilter(field_name='timestamp', lookup_expr='lte')

    valor_min = django_filters.NumberFilter(field_name='valor', lookup_expr='gte')
    valor_max = django_filters.NumberFilter(field_name='valor', lookup_expr='lte')

    class Meta:
        model = Historico
        fields = ['sensor', 'timestamp', 'valor']