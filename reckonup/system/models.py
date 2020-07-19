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
  name = models.CharField(max_length=64)


class Department(models.Model):
  name = models.CharField(max_length=64)
  latitude = models.DecimalField(
    decimal_places=17,
    max_digits=20
  )
  longitude = models.DecimalField(
    decimal_places=17,
    max_digits=20
  )
  parent = models.ForeignKey(
    'Department',
    on_delete=models.CASCADE
  )


class Currency(models.Model):
  name = models.CharField(max_length=64)
  code = models.CharField(max_length=3)
  code_number = models.IntegerField()


class Country(models.Model):
  name = models.CharField(max_length=64)
  code = models.CharField(max_length=3)
  code2 = models.CharField(max_length=2)
  numeric = models.IntegerField()
  country_flag = models.ImageField()
  latitude = models.DecimalField(
    decimal_places=17,
    max_digits=20
  )
  longitude = models.DecimalField(
    decimal_places=17,
    max_digits=20
  )
  currency = models.ForeignKey(
    Currency,
    on_delete=models.CASCADE
  )
