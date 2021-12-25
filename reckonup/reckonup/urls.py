"""reckonup URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .settings import USER_APPLICATIONS
from rest_framework_simplejwt import views


def check_url_module(application_name):
    url_module_name = f'{application_name}.urls'
    try:
        __import__(url_module_name)
    except ImportError:
        return None
    return path(
        f'api/{application_name}/',
        include(f'{application_name}.urls')
    )


application_urlpatterns = [
    x for x in [
        check_url_module(application_name)
        for application_name in USER_APPLICATIONS
    ]
    if x is not None
]

urlpatterns = application_urlpatterns + [
    path('admin/', admin.site.urls),
    path('api-auth/', views.token_obtain_pair),
    path('api-auth/refresh/', views.token_refresh),
]
