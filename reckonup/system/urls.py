from . import views
from reckonup.api import create_rest_router_urls

urlpatterns = [
] + create_rest_router_urls(views)
