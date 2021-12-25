import sys

from reckonup.api import create_viewset
from . import models

myself = sys.modules[__name__]
myself.__dict__.update(create_viewset(models))
