from django.http import HttpResponse
from django.template import loader
import sys
from reckonup.api import create_viewset
from . import models


# Create your views here.
myself = sys.modules[__name__]
myself.__dict__.update(create_viewset(models))


def index(request):
  template = loader.get_template('index.html')
  context = {
    'project_title': 'Reckonup',
  }
  return HttpResponse(template.render(context, request))
