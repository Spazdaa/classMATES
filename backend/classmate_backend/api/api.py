from os import stat
from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.response import Response
from api.serializers import LoginSerializer
from api.models import AppUsers, Contact
from utils.icalendarparser import Class, parseCalendar
import uuid

class ClassViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)

    def put(self, request: Request) -> Response:
        # Check request content type
        if request.content_type != "text/calendar":
            return Response({
                "message": "Wrong or missing content type. Expects 'text/calendar/"
            }, status=status.HTTP_400_BAD_REQUEST)
        parseCalendar(request.data)

class RegisterAPI(APIView):

    def post(self, request: Request, *args, **kwargs) -> Response:
        if not self.__checkFieldsValid(requestData=request.data):
            return Response({
                "message":"incomplete json field. Expect 'username', 'password', 'contact_info', 'contact_type'"
            }, status=status.HTTP_400_BAD_REQUEST)

        if not self.__checkUserNameValid(request.data.get("username")):
            return Response({
                "message": "User name already exists"
            }, status=status.HTTP_403_FORBIDDEN)

        userid  = uuid.uuid4()
        newUser = {
            "uid": userid,
            "username": request.data.get("username"),
            "password": request.data.get("password"),
        }

        user = AppUsers.objects.create(**newUser)

        contact = {
            "uid": userid,
            "contact_id": uuid.uuid4(),
            "contact_info": request.data.get("contact_info"),
            "contact_type": request.data.get("contact_type"),
        }

        Contact.objects.create(**contact)

        return Response({
            "token": Token.objects.create(user=user)
        },status=status.HTTP_201_CREATED)

    def __checkFieldsValid(self, requestData: dict) -> bool:
        expected_fields = {"username", "password", "contact_info", "contact_type"}

        return expected_fields.issubset(requestData.keys())

    def __checkUserNameValid(self, username: str) -> bool:
        return not AppUsers.objects.filter(username=username).exists()

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        try:
            user = AppUsers.objects.get(username=username, password=password)
        except AppUsers.DoesNotExist:
            return Response({"message":"Unauthorized User"},status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            "token": Token.objects.create(user=user)
        }, status=status.HTTP_200_OK)
