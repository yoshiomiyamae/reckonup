import sys

from rest_framework import generics
from reckonup.api import create_viewset, MultipleFieldLookupMixin

from . import models

myself = sys.modules[__name__]
myself.__dict__.update(create_viewset(models))
