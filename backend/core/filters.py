import django_filters
from .models import *

class AmbienteFilter(django_filters.FilterSet):
    class Meta:
        model = Ambiente
        fields = ['local', 'responsavel']


class MicrocontroladorFilter(django_filters.FilterSet):
    class Meta:
        model = Microcontrolador
        fields = ['status', 'ambiente']


class SensorFilter(django_filters.FilterSet):
    class Meta:
        model = Sensor
        fields = ['sensor', 'status', 'mic']


class HistoricoFilter(django_filters.FilterSet):
    class Meta:
        model = Historico
        fields = ['sensor']