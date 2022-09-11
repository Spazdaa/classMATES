from django.urls import re_path

from api.api import LoginAPI, RegisterAPI, CalendarAPI, MatchAPI, UserAPI

urlpatterns = [
    re_path(r"register/?$", RegisterAPI.as_view()),
    re_path(r"login/?$", LoginAPI.as_view()),
    re_path(r"upload/?$", CalendarAPI.as_view()),
    re_path(r"matches/?$", MatchAPI.as_view()),
    re_path(r"user/(?P<uid>[a-z0-9-]+)/?$", UserAPI.as_view()),
]