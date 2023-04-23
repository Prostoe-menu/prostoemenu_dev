from django.contrib.auth import get_user_model
from .models import Profile, ActivationCode
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

User = get_user_model()


@receiver(pre_save, sender=User)
def set_new_user_inactive(sender, instance, **kwargs):
    if instance._state.adding is True:
        instance.is_active = False


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        ActivationCode.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

