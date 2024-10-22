from django.conf import settings as django_settings
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, first_name=None, last_name=None, gender=None, birth_date=None, avatar=None, password=None):
        if not email:
            raise ValueError("User must have an email")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            gender=gender,
            birth_date=birth_date,
            avatar=avatar)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(username, email, password=password)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractUser):

    gender = models.CharField(
        null=True,
        max_length=1,
        choices=django_settings.GENDER_CHOICES,
        default=django_settings.FEMALE_ABBR)
    birth_date = models.DateField(
        null=True,
        verbose_name="Дата рождения")
    avatar = models.ImageField(
        null=True,
        upload_to="users/avatar",
        verbose_name="Аватар"
    )
    is_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name", "last_name", "birth_date", "gender", "avatar"]

    def __str__(self):
        return self.email
