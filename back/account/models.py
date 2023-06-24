from django.contrib.auth import get_user_model
from django.db import models
from .scripts import generate_activation_code

User = get_user_model()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    gender = models.CharField(max_length=20, null=True)
    birth_date = models.DateField(null=True)
    region = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50, null=True)
    photo = models.ImageField(
        upload_to='user_photo/%Y/%m/%d',
        verbose_name='Фото пользователя', null=True)

    class Meta:
        ordering = ('user',)
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return f'{self.user.username}_profile'


class ActivationCode(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='activ_code')
    code = models.CharField(max_length=6, default=generate_activation_code, verbose_name='Код активации')
    datetime_created = models.DateTimeField(auto_now=True, verbose_name='Дата генерации кода')
    code_generated_num = models.SmallIntegerField(default=1, verbose_name='Количество генераций кода')

    class Meta:
        ordering = ('user',)
        verbose_name = 'Код активации'
        verbose_name_plural = 'Коды активации'

    def __str__(self):
        return f'{self.user}_code'
