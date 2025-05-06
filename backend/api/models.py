from django.db import models
from django.contrib.auth.models import AbstractUser

# Пользовательская модель (если нужно расширить стандартную)
class User(AbstractUser):
    email = models.EmailField(unique=True)

class Zone(models.Model):
    zone_id = models.IntegerField(unique=True)
    road_id = models.IntegerField()
    time_start = models.TimeField()
    time_end = models.TimeField()
    day_of_week = models.CharField(max_length=20)
    car_type = models.CharField(max_length=50)
    transponder_type = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tariff = models.CharField(max_length=50)
    direction = models.CharField(max_length=100)
    postpay = models.BooleanField(default=False)

class Geo(models.Model):
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE)
    color = models.CharField(max_length=7)  # HEX-код цвета
    geodata = models.JSONField()  # Координаты в формате GeoJSON