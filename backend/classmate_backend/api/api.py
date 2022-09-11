from django.core.paginator import Paginator
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from api.models import AppUsers, Contact, Courses
from utils.icalendarparser import parseCalendar
from utils.match import matchPercent, matchClasses
import uuid

class MatchAPI(APIView):
    """
        API for getting matches
    """
    
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request: Request):

        page = request.GET.get("page", None)
        size = request.GET.get("size", None)
        
        matches = matchPercent(request.user.pk)
        if (page == None or size == None):
            items = matches
        else:
            paginator = Paginator(matches, size)
            items = paginator.get_page(page).object_list

        lists = [str(i) for i in matches]

        return Response({
            "page": str(page),
            "size": str(size),
            "list": lists
        }, status=status.HTTP_200_OK)


class CalendarAPI(APIView):
    """
        API for uploading user calendar
    """
    
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def put(self, request) -> Response:
        # Check request content type
        # if request.content_type != "text/plain":
        #     return Response({
        #         "message": "Wrong or missing content type. Expects 'text/plain"
        #     }, status=status.HTTP_400_BAD_REQUEST)

        try:
            classes = parseCalendar(request.body.decode('utf-8'))
        except ValueError:
            return Response({
                "message": "wrong format for calendar file"
            }, status=status.HTTP_400_BAD_REQUEST)

        user = request.user
        
        for c in classes:
            course = c.get_course()
            section = c.get_section()
            Courses.objects.get_or_create(course=course, section=section, uid=user)
        
        return Response(status=status.HTTP_200_OK)
        

class RegisterAPI(APIView):
    """
        API for registering new user.
    """

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
            "uid": user,
            "contact_id": uuid.uuid4(),
            "contact_info": request.data.get("contact_info"),
            "contact_type": request.data.get("contact_type"),
        }

        Contact.objects.create(**contact)

        return Response({
            "token": Token.objects.create(user=user).key
        },status=status.HTTP_201_CREATED)

    def __checkFieldsValid(self, requestData: dict) -> bool:
        expected_fields = {"username", "password", "contact_info", "contact_type"}

        return expected_fields.issubset(requestData.keys())

    def __checkUserNameValid(self, username: str) -> bool:
        return not AppUsers.objects.filter(username=username).exists()

class LoginAPI(APIView):
    """
        API for loggin in existing users.
    """

    def post(self, request: Request, *args, **kwargs) -> Response:
        if not self.__checkFieldsValid(requestData=request.data):
            return Response({
                "message":"incomplete json field. Expect 'username', 'password'"
            }, status=status.HTTP_400_BAD_REQUEST)

        username = request.data['username']
        password = request.data['password']

        try:
            user = AppUsers.objects.get(username=username, password=password)
        except AppUsers.DoesNotExist:
            return Response({"message":"Unauthorized User"},status=status.HTTP_401_UNAUTHORIZED)
        
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key
        }, status=status.HTTP_200_OK)

    def __checkFieldsValid(self, requestData: dict) -> bool:
        expected_fields = {"username", "password"}

        return expected_fields.issubset(requestData.keys())

class UserAPI(APIView):
    """
        API for getting user details
    """
    
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    def get(self, request: Request, uid: str):

        matchResult = matchClasses(requester_id=request.user.pk, user_id=uid)
        # TODO: matched_classes

        return Response(str(matchResult), status=status.HTTP_200_OK)
