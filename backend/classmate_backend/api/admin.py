from django.contrib import admin
from api.models import AppUsers, Contact, Courses

# Register your models here.
admin.site.register([
    AppUsers,
    Contact,
    Courses
])
