from tkinter import CASCADE, Widget
from django import forms
from django.db import models

class User(models.Model):
    u_id = models.UUIDField(primary_key=True)
    user_name = models.CharField()
    password = models.CharField(Widget=forms.PasswordInput)

class Contact(models.Model):
    u_id = models.ForeignKey(User)
    contact_id=models.UUIDField(primary_key=True)
    contact_info = models.CharField()
    contact_type = models.CharField()
    models.UniqueConstraint(fields=['u_id', 'contact_id'], name='unique_contact')

class ClassSubject(models.Model):
    subject_id = models.UUIDField(primary_key=True)
    subject = models.CharField(max_length=10,unique=True)

class ClassNumber(models.Model):
    subject_id=models.ForeignKey(ClassSubject)
    number_id = models.UUIDField(primary_key=True)
    models.UniqueConstraint(fields=['subject_id', 'number_id'], name='unique_number')
    number = models.CharField(max_length=5)

class ClassSection(models.Model):
    subject_id=models.ForeignKey(ClassSubject)
    number_id=models.ForeignKey(ClassNumber)
    section_id = models.UUIDField(primary_key=True)
    models.UniqueConstraint(fields=['subject_id', 'number_id','section_id'], name='unique_section')
    number = models.CharField(max_length=5)