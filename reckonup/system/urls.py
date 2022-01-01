from . import views
from reckonup.api import create_rest_router_urls
from django.urls import path

urlpatterns = [
    path(
        'authentication_information',
        views.AuthenticationInformationView.as_view()
    ),
] + create_rest_router_urls(views)
