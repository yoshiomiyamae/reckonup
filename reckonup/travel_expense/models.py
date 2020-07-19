from django.db import models
from system.models import Classification, Currency
from django.contrib.auth.models import User


# Create your models here.
class DailAllowance(models.Model):
  classification = models.OneToOneField(
    Classification,
    on_delete=models.CASCADE
  )
  value = models.DecimalField()
  currency = models.ForeignKey(
    Currency,
    on_delete=models.PROTECT
  )


class AccommodationFee(models.Model):
  travelExpenseArea = models.ForeignKey(
    'TravelExpenseArea',
    on_delete=models.PROTECT
  )
  classification = models.ForeignKey(
    Classification,
    on_delete=models.CASCADE
  )
  value = models.DecimalField()
  currency = models.ForeignKey(
    Currency,
    on_delete=models.PROTECT
  )


class TravelExpenseArea(models.Model):
  name = models.CharField()
  description = models.CharField()


class Expence(models.Model):
  business_trip = models.ForeignKey(
    'BusinessTrip',
    on_delete=models.CASCADE
  )
  date_time = models.DateTimeField()
  value = models.DecimalField()
  currency = models.ForeignKey(
    Currency,
    on_delete=models.PROTECT
  )
  paid = models.BooleanField()
  remarks = models.CharField()


class BusinessTrip(models.Model):
  user = models.ForeignKey(
    User,
    on_delete=models.PROTECT
  )
  start_date_time = models.DateTimeField()
  end_date_time = models.DateTimeField()
  destination = models.ForeignKey(
    'Destination',
    on_delete=models.PROTECT
  )


class Destination(models.Model):
  name = models.CharField()
  description = models.CharField()
  latitude = models.DecimalField()
  longitude = models.DecimalField()