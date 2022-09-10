from rest_framework import serializers
from api.models import AppUsers
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if not user:
            raise serializers.ValidationError("Incorrect username or password.")
        
        return data


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUsers