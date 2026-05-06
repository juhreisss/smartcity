from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Usuario, Local, Responsavel, Ambiente,
    Microcontrolador, Sensor, Historico
)

class UsuarioMeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)

    is_staff = serializers.BooleanField(source="user.is_staff", read_only=True)
    is_superuser = serializers.BooleanField(source="user.is_superuser", read_only=True)
    is_active = serializers.BooleanField(source="user.is_active", read_only=True)

    class Meta:
        model = Usuario
        fields = [
            "id", "username", "email",
            "nome", "telefone", "tipo",
            "is_staff", "is_superuser", "is_active"
        ]


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'id', 'user', 'nome', 'telefone', 'tipo'
        ]


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    nome = serializers.CharField(required=False, allow_blank=True, default="")
    telefone = serializers.CharField(required=False, allow_blank=True, default="")
    tipo = serializers.ChoiceField(choices=Usuario.TIPO_CHOICES)

    def create(self, validated_data):
        nome = validated_data.get('nome', '')
        telefone = validated_data.get('telefone', '')
        tipo = validated_data['tipo']
        email = validated_data['email']

        user = User.objects.create_user(
            username=validated_data['username'],
            email=email,
            password=validated_data['password']
        )

        user.is_staff = (tipo == "ADMIN")
        user.is_active = True
        user.is_superuser = False
        user.save()

        Usuario.objects.create(
            user=user,
            nome=nome if nome else user.username,
            telefone=telefone,
            tipo=tipo
        )

        return user


class LocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local
        fields = ['id', 'nome']


class ResponsavelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = ['id', 'nome']



class AmbienteSerializer(serializers.ModelSerializer):
    local_nome = serializers.CharField(source="local.nome", read_only=True)
    responsavel_nome = serializers.CharField(source="responsavel.nome", read_only=True)

    class Meta:
        model = Ambiente
        fields = [
            'id',
            'local',
            'descricao',
            'responsavel',
            'local_nome',
            'responsavel_nome'
        ]



class MicrocontroladorSerializer(serializers.ModelSerializer):
    ambiente_nome = serializers.CharField(source="ambiente.descricao", read_only=True)

    class Meta:
        model = Microcontrolador
        fields = [
            'id',
            'modelo',
            'mac_address',
            'latitude',
            'longitude',
            'status',
            'ambiente',
            'ambiente_nome'
        ]



class SensorSerializer(serializers.ModelSerializer):
    micro_modelo = serializers.CharField(source="mic.modelo", read_only=True)
    ambiente_nome = serializers.CharField(source="mic.ambiente.descricao", read_only=True)

    class Meta:
        model = Sensor
        fields = [
            'id',
            'sensor',
            'unidade_med',
            'mic',
            'status',
            'micro_modelo',
            'ambiente_nome'
        ]


class HistoricoSerializer(serializers.ModelSerializer):
    sensor_nome = serializers.CharField(source="sensor.sensor", read_only=True)
    unidade = serializers.CharField(source="sensor.unidade_med", read_only=True)

    class Meta:
        model = Historico
        fields = [
            'id',
            'sensor',
            'valor',
            'timestamp',
            'sensor_nome',
            'unidade'
        ]

    def create(self, validated_data):
        sensor = validated_data.get('sensor')

        if not sensor.status:
            raise serializers.ValidationError("Sensor inativo não pode receber medições")

        return super().create(validated_data)


class SensorDetailSerializer(serializers.ModelSerializer):
    historicos = HistoricoSerializer(many=True, read_only=True)
    micro_modelo = serializers.CharField(source="mic.modelo", read_only=True)
    ambiente_nome = serializers.CharField(source="mic.ambiente.descricao", read_only=True)

    class Meta:
        model = Sensor
        fields = [
            'id',
            'sensor',
            'unidade_med',
            'mic',
            'status',
            'micro_modelo',
            'ambiente_nome',
            'historicos'
        ]