import inspect

from django.shortcuts import get_object_or_404
from drf_writable_nested.serializers import WritableNestedModelSerializer

from .common import camel_to_snake


class MultipleFieldLookupMixin:
    def get_object(self):
        queryset = self.get_queryset()             # Get the base queryset
        queryset = self.filter_queryset(queryset)  # Apply any filter backends
        filter = {}
        for field in self.lookup_fields:
            if self.kwargs[field]:  # Ignore empty fields.
                filter[field] = self.kwargs[field]
        obj = get_object_or_404(queryset, **filter)  # Lookup the object
        self.check_object_permissions(self.request, obj)
        return obj


HIDDEN_FIELDS = {
    'password',
}
VIEW_SET = 'ViewSet'
FILTER_VIEW_SET = 'FilterViewSet'
SERIALIZER = 'Serializer'


def sort_by_line_no(cls):
    n, c = cls
    source, line_no = inspect.findsource(c)
    return line_no


def create_viewset(models_module):
    from rest_framework import viewsets, generics
    from rest_framework import serializers
    output = {}

    for n, c in sorted(inspect.getmembers(models_module, inspect.isclass), key=sort_by_line_no):
        if (
            not hasattr(c, '_meta') or
            n in {'AbstractBaseUser', 'PermissionsMixin'}
        ):
            continue
        viewset_name = f'{n}{VIEW_SET}'
        filter_viewset_name = f'{n}{FILTER_VIEW_SET}'
        serializer_name = f'{n}{SERIALIZER}'
        fields = (
            [
                str(field.name) for field in c()._meta.fields
                if field.name not in HIDDEN_FIELDS
            ] + [
                x.related_name
                for x in c()._meta.related_objects
                if x.related_name is not None and f'{x.related_model._meta.object_name}{SERIALIZER}' in output
            ] + [
                key for key, value in vars(c).items()
                if isinstance(value, property)
            ]
        )
        serializer_class = type(
            serializer_name,
            (WritableNestedModelSerializer,),
            {
                **{
                    x.related_name: output[f'{x.related_model._meta.object_name}{SERIALIZER}'](
                        many=x.multiple)
                    for x in c()._meta.related_objects
                    if x.related_name is not None and f'{x.related_model._meta.object_name}{SERIALIZER}' in output
                },
                'Meta': type(
                    'Meta',
                    (object,),
                    {
                        'model': c,
                        'fields': fields
                    }
                )
            }
        )
        output[serializer_name] = serializer_class
        output[viewset_name] = type(
            viewset_name,
            (viewsets.ModelViewSet,),
            {
                'queryset': c.objects.all(),
                'serializer_class': serializer_class,
            }
        )
        output[filter_viewset_name] = type(
            filter_viewset_name,
            (generics.ListAPIView,),
            {
                'serializer_class': serializer_class,
                'c': c,
                'get_queryset': lambda s: s.c.objects.filter(**s.kwargs),
            }
        )
    return output


def create_rest_router_urls(views_module):
    from rest_framework import routers
    router = routers.DefaultRouter()
    for n, c in inspect.getmembers(views_module, inspect.isclass):
        if (not n.endswith(FILTER_VIEW_SET) and n.endswith(VIEW_SET)):
            router.register(camel_to_snake(n[:-7]), c)
    return router.urls
