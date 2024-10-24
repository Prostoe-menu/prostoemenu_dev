from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "last_name",
        "first_name",
        "username",
        "email",
        "is_staff",
        "is_verified",
    )

    class Meta:
        model = User
