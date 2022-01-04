from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.mail import send_mail


class UserManager(BaseUserManager):
    """
    Create and save user with email
    """
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError('The given username must be set')

        if not email:
            raise ValueError('The given email must be set')

        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username_validator = ASCIIUsernameValidator()

    username = models.CharField(
        _('username'),
        max_length=50,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. '
            'Letters, digits and @/./+/-/_ only.'
        ),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=150, blank=True)
    email = models.EmailField(
        _('email address'),
        help_text=_('Required'),
        blank=False
    )
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(
        _('date joined'),
        default=timezone.now
    )

    objects = UserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        # abstract = True
        abstract = False

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profiles'
    )
    classification = models.ForeignKey(
        'Classification',
        on_delete=models.CASCADE
    )
    department = models.ForeignKey(
        'Department',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return (
            f"{self.user} "
            f"(Class: {self.classification}, Dept.: {self.department})"
        )


class Classification(models.Model):
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
