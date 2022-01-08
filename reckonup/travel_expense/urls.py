from . import views
from reckonup.api import create_rest_router_urls
from django.urls import re_path

urlpatterns = [
    re_path(
        r'^business_trip/(?P<user>[^/.]+)/$',
        views.BusinessTripFilterViewSet.as_view()   # type: ignore
    ),
    re_path(
        r'^business_trip/(?P<user>[^/.]+)/(?P<pk>[^/.]+)/$',
        views.BusinessTripViewSet.as_view(          # type: ignore
            {
                'get': 'retrieve',
                'put': 'update',
                'post': 'create',
                'delete': 'destroy',
            })
    ),
] + create_rest_router_urls(views)
