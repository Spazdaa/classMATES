from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication

class ClassViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)