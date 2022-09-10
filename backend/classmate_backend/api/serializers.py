from rest_framework import serializers
from api.models import AppUsers
from django.contrib.auth import authenticate

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUsers