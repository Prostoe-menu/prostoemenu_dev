from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Profile(models.Model):
    class GenderStatus(models.TextChoices):
        MALE = "м", "Мужской"
        FEMALE = "ж", "Женский"

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    gender = models.CharField(
        max_length=1, choices=GenderStatus.choices, default=GenderStatus.FEMALE
    )
    birth_date = models.DateField(null=True)
    avatar = models.ImageField(
        null=True, upload_to="users", verbose_name="Фото пользователя"
    )

    class Meta:
        ordering = ("user",)
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

    def __str__(self):
        return f"{self.user.username}_profile"
