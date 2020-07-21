from django.http import HttpResponse
from django.template import loader
import sys
from reckonup.api import create_viewset
from . import models
from rest_framework.response import Response
from rest_framework import generics, permissions, status


# Create your views here.
myself = sys.modules[__name__]
myself.__dict__.update(create_viewset(models))


def index(request):
  template = loader.get_template('index.html')
  context = {
    'project_title': 'Reckonup',
  }
  return HttpResponse(template.render(context, request))


class AuthenticationInformationView(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, format=None):
    print(request.user.__dict__)
    return Response(data={
      'id': request.user.id,
      'last_login': request.user.last_login,
      'username': request.user.username,
      'first_name': request.user.first_name,
      'last_name': request.user.last_name,
      'email': request.user.email,
      'is_active': request.user.is_active,
    }, status=status.HTTP_200_OK)