from django.db import models
from django.utils import timezone


class Basemodel(models.Model):
    created_at = models.DateTimeField(
        db_index=True,
        default=timezone.now,
        verbose_name='Дата создания')
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Дата обновления')

    class Meta:
        abstract = True