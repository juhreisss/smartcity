from django.db import models
from django.contrib.auth.models import User

class Usuario(models.Model):
    TIPO_CHOICES = [
        ('ADMIN', 'Administrador'),
        ('USER', 'Usuário'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil')
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)

    def __str__(self):
        return self.nome

class Local(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Responsavel(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Ambiente(models.Model):
    local = models.ForeignKey(Local, on_delete=models.CASCADE, related_name='ambientes')
    descricao = models.CharField(max_length=200)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.descricao

class Microcontrolador(models.Model):
    modelo = models.CharField(max_length=100)
    mac_address = models.CharField(max_length=100, unique=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.BooleanField(default=True)
    ambiente = models.ForeignKey(Ambiente, on_delete=models.CASCADE, related_name='microcontroladores')

    def __str__(self):
        return self.modelo

class Sensor(models.Model):
    SENSOR_CHOICES = [
        ('temperatura', 'Temperatura'),
        ('umidade', 'Umidade'),
        ('luminosidade', 'Luminosidade'),
        ('contador', 'Contador'),
    ]

    UNIDADE_CHOICES = [
        ('C', 'ºC'),
        ('%', '%'),
        ('lux', 'lux'),
        ('uni', 'uni'),
    ]

    sensor = models.CharField(max_length=20, choices=SENSOR_CHOICES)
    unidade_med = models.CharField(max_length=10, choices=UNIDADE_CHOICES)
    mic = models.ForeignKey(Microcontrolador, on_delete=models.CASCADE, related_name='sensores')
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.sensor} ({self.unidade_med})"

class Historico(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='historicos')
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sensor} - {self.valor}"