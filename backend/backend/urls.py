from django.urls import include, path
from rest_framework import routers
from api.views import ZoneViewSet, GeoViewSet, UserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse

router = routers.DefaultRouter()
router.register(r'zones', ZoneViewSet)
router.register(r'geo', GeoViewSet)
router.register(r'users', UserViewSet)

def home(request):
    return HttpResponse("Добро пожаловать в API сервиса платных дорог!")

urlpatterns = [
    path('', home),
    path('api/', include(router.urls)),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]