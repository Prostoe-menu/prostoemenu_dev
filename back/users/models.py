from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name="Дата рождения")
    avatar = models.ImageField(
        blank=True,
        null=True,
        upload_to="users/avatar",
        verbose_name="Аватар"
    )
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return "%s %s" % (self.last_name, self.first_name)