from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        related_name='profile')
    gender = models.CharField(max_length=20, null=True)
    birth_date = models.DateField(null=True)
    region = models.CharField(max_length=50, null=True)
    city = models.CharField(max_length=50, null=True)
    photo = models.ImageField(
        upload_to='user_photo/%Y/%m/%d',
        verbose_name='Фото пользователя', null=True)

    class Meta:
        ordering = ('user_id',)
        verbose_name = 'Профиль'
        verbose_name_plural = 'Профили'

    def __str__(self):
        return self.user.username + '_profile'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
