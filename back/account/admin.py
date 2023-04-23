from django.contrib import admin
from account.models import Profile, ActivationCode


admin.site.register(Profile)
admin.site.register(ActivationCode)
