from django.conf import settings as django_settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

from .validators import UserAgeValidator
from common.validators import AcceptedSymbolsValidator


class CustomUserManager(BaseUserManager):
    def create_user(
        self,
        email,
        username,
        first_name=None,
        last_name=None,
        gender=None,
        birth_date=None,
        avatar=None,
        password=None,
        is_verified=False
    ):
        if not email:
            raise ValueError("User must have an email")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            birth_date=birth_date,
            avatar=avatar,
            is_verified=is_verified
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password):
        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class User(AbstractUser):
    first_name = models.CharField(
        null=True,
        blank=True,
        max_length=django_settings.MAX_NAME_LENGTH,
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)]
    )
    last_name = models.CharField(
        null=True,
        blank=True,
        max_length=django_settings.MAX_NAME_LENGTH,
        validators=[AcceptedSymbolsValidator(django_settings.ACCEPTED_SYMBOLS)]
    )
    gender = models.CharField(
        null=True,
        max_length=django_settings.GENDER_ABBR_LENGTH,
        choices=django_settings.GENDER_CHOICES,
        default=django_settings.FEMALE_ABBR,
    )
    birth_date = models.DateField(
        null=True, validators=[UserAgeValidator()], verbose_name="Дата рождения"
    )
    avatar = models.ImageField(
        null=True, upload_to="users/avatar", verbose_name="Аватар"
    )
    is_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return self.username
