from django.db import models
from system.models import Grade, Currency, User


class DailyAllowance(models.Model):
    grade = models.OneToOneField(
        Grade,
        on_delete=models.CASCADE
    )
    value = models.DecimalField(
        decimal_places=3,
        max_digits=20
    )
    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    def __str__(self):
        return f"{self.grade}: {self.value} {self.currency}"


class AccommodationFee(models.Model):
    travelExpenseArea = models.ForeignKey(
        'TravelExpenseArea',
        on_delete=models.PROTECT
    )
    grade = models.ForeignKey(
        Grade,
        on_delete=models.CASCADE
    )
    value = models.DecimalField(
        decimal_places=3,
        max_digits=20
    )
    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )

    def __str__(self):
        return (
            f"{self.travelExpenseArea} Class: {self.grade} ... "
            f"{self.value} {self.currency}"
        )


class TravelExpenseArea(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256, blank=True, null=True)

    def __str__(self):
        return self.name


class Expense(models.Model):
    business_trip = models.ForeignKey(
        'BusinessTrip',
        on_delete=models.CASCADE,
        related_name='expenses'
    )
    expense_type = models.ForeignKey(
        'ExpenseType',
        on_delete=models.PROTECT
    )
    date_time = models.DateTimeField()
    value = models.DecimalField(
        decimal_places=3,
        max_digits=20
    )
    currency = models.ForeignKey(
        Currency,
        on_delete=models.PROTECT
    )
    paid = models.BooleanField()
    remarks = models.CharField(max_length=256, blank=True, null=True)
    receipt = models.ForeignKey(
        'File',
        on_delete=models.PROTECT,
        blank=True,
        null=True
    )

    def __str__(self):
        return (
            f"{self.business_trip} {self.date_time} "
            f"{self.value} {self.currency} "
            f"{'Paid' if self.paid else 'Not paid'} "
        )


class ExpenseType(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256, blank=True, null=True)
    is_voucher_needed = models.BooleanField(default=False)

    def __str__(self):
        return self.name


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

    def __str__(self):
        return (
            f"{self.user} {self.start_date_time} ~ {self.end_date_time} "
            f"{self.destination}"
        )


class Destination(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256, blank=True, null=True)
    latitude = models.DecimalField(
        decimal_places=17,
        max_digits=20,
        blank=True,
        null=True
    )
    longitude = models.DecimalField(
        decimal_places=17,
        max_digits=20,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class File(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.PROTECT
    )
    mime_type = models.CharField(max_length=64)
    data = models.FileField()


class ApprovalRoute(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,

    )
    next_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='next_user'
    )

    def __str__(self):
        return f"{self.user} -> {self.next_user}"
