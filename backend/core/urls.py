from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'locais', LocalViewSet)
router.register(r'responsaveis', ResponsavelViewSet)
router.register(r'ambientes', AmbienteViewSet)
router.register(r'microcontroladores', MicrocontroladorViewSet)
router.register(r'sensores', SensorViewSet)
router.register(r'historicos', HistoricoViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/', include(router.urls)),
]