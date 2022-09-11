import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class AppUsers(AbstractUser):
    uid = models.UUIDField(primary_key=True)

class Contact(models.Model):
    uid = models.ForeignKey(AppUsers, on_delete=models.CASCADE)
    contact_id=models.UUIDField(primary_key=True)
    contact_info = models.CharField(max_length=200)
    contact_type = models.CharField(max_length=200)
    models.UniqueConstraint(fields=['uid', 'contact_id'], name='unique_contact')

class Courses(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    uid = models.ForeignKey(AppUsers, on_delete=models.CASCADE)
    section = models.CharField(max_length=20)
    course = models.CharField(max_length=20)
    models.UniqueConstraint(fields=['uid', 'section', 'course'], name='unique_course')
    