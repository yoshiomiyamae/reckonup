from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
  user = models.OneToOneField(
    User,
    on_delete=models.CASCADE
  )
  classification = models.ForeignKey(
    'Classification',
    on_delete=models.CASCADE
  )
  department = models.ForeignKey(
    'Department',
    on_delete=models.CASCADE
  )


class Classification(models.Model):
  name = models.CharField()


class Department(models.Model):
  name = models.CharField()
  latitude = models.DecimalField()
  longitude = models.DecimalField()


class Currency(models.Model):
  name = models.CharField()
  code = models.CharField()
  code_number = models.IntegerField()
  country = models.ForeignKey(
    'Country',
    on_delete=models.CASCADE
  )


class Country(models.Model):
  name = models.CharField()