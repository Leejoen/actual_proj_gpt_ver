from rest_framework import serializers
from .models import Zone, Geo, User

class ZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zone
        fields = '__all__'

class GeoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Geo
        fields = ['zone', 'color', 'geodata']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}