from django.urls import re_path

from api.api import LoginAPI, RegisterAPI, CalendarViewSet

urlpatterns = [
    re_path(r"register/?$", RegisterAPI.as_view()),
    re_path(r"login/?$", LoginAPI.as_view()),
    re_path(r"upload/?$", CalendarViewSet.as_view({"put": "put"}))
]