from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from . import models


class DestinationAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {'fields': ('name', 'description')}),
        (_('Location info'), {
            'fields': ('latitude', 'longitude')
        }),
    )
    add_fieldsets = ((None, {
        'classes': ('wide',),
        'fields': (
            'name', 'description', 'latitude', 'longitude'
        ), }),)
    list_display = ('name', 'description', 'latitude', 'longitude')
    search_fields = ('name', 'description'),
    ordering = ('name',)


admin.site.register(models.DailyAllowance)
admin.site.register(models.AccommodationFee)
admin.site.register(models.TravelExpenseArea)
admin.site.register(models.Expense)
admin.site.register(models.BusinessTrip)
admin.site.register(models.Destination, DestinationAdmin)
admin.site.register(models.Receipt)
admin.site.register(models.ApprovalRoute)
