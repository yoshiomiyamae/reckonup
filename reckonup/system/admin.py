from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from . import models
from . import forms

admin.site.register(models.Classification)
admin.site.register(models.Department)
admin.site.register(models.Profile)
admin.site.register(models.Currency)
admin.site.register(models.Country)
admin.site.register(models.Calendar)


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal info'), {
            'fields': ('first_name', 'last_name', 'email',)
        }),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            )
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = ((None, {
        'classes': ('wide',),
        'fields': (
            'username', 'first_name', 'last_name', 'email', 'password1',
            'password2'
        ), }),)
    form = forms.CustomUserChangeForm
    add_form = forms.AdminUserCreationForm
    list_display = ('username', 'first_name', 'last_name', 'email', 'is_staff')
    search_fields = ('username', 'email')
    ordering = ('username',)


admin.site.register(models.User, CustomUserAdmin)
