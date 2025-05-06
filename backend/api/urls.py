# backend/api/urls.py
from django.urls import path
from .views import calculate_route

urlpatterns = [
    path('calculate/', calculate_route),
]
