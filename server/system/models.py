# from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    pass


class Profile(models.Model):
    user = models.OneToOneField(
        'User',
        on_delete=models.CASCADE
    )
    grade = models.ForeignKey(
        'Grade',
        on_delete=models.CASCADE,
        default=1
    )
    department = models.ForeignKey(
        'Department',
        on_delete=models.CASCADE,
        default=1
    )

    def __str__(self):
        return (
            f"{self.user} "
            f"(Class: {self.grade}, Dept.: {self.department})"
        )


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


class Grade(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=64)
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
    parent = models.ForeignKey(
        'Department',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class Currency(models.Model):
    name = models.CharField(max_length=64)
    code = models.CharField(max_length=3)
    code_number = models.IntegerField()

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=64)
    code = models.CharField(max_length=3)
    code2 = models.CharField(max_length=2)
    numeric = models.IntegerField()
    country_flag = models.ImageField(
        blank=True,
        null=True
    )
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
    currency = models.ForeignKey(
        Currency,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class Calendar(models.Model):
    date = models.DateField(primary_key=True)
    is_holiday = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.date} {'Holiday' if self.is_holiday else 'Workday'}"
