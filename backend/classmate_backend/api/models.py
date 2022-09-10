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

class ClassSubject(models.Model):
    subject_id = models.UUIDField(primary_key=True)
    subject = models.CharField(max_length=10,unique=True)

class ClassNumber(models.Model):
    subject_id=models.ForeignKey(ClassSubject, on_delete=models.CASCADE)
    number_id = models.UUIDField(primary_key=True)
    models.UniqueConstraint(fields=['subject_id', 'number_id'], name='unique_number')
    number = models.CharField(max_length=5)

class ClassSection(models.Model):
    subject_id=models.ForeignKey(ClassSubject, on_delete=models.CASCADE)
    number_id=models.ForeignKey(ClassNumber, on_delete=models.CASCADE)
    section_id = models.UUIDField(primary_key=True)
    models.UniqueConstraint(fields=['subject_id', 'number_id','section_id'], name='unique_section')
    number = models.CharField(max_length=5)

class ClassUsers(models.Model):
    cuid=models.UUIDField(primary_key=True)
    uid=models.ForeignKey(AppUsers, on_delete=models.CASCADE)
    subject_id=models.ForeignKey(ClassSubject, on_delete=models.CASCADE)
    number_id=models.ForeignKey(ClassNumber, on_delete=models.CASCADE)
    section_id=models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    models.UniqueConstraint(fields=['subject_id', 'number_id','section_id','uid','cuid'], name='unique_class_users')
