import inspect
from reckonup.common import camel_to_snake

HIDDEN_FIELDS = {
    'password',
}
VIEW_SET = 'ViewSet'
FILTER_VIEW_SET = 'FilterViewSet'
SERIALIZER = 'Serializer'


def create_viewset(models_module):
    from rest_framework import viewsets, generics
    from rest_framework import serializers
    output = {}
    for n, c in inspect.getmembers(models_module, inspect.isclass):
        if (
            not hasattr(c, '_meta') or
            c.__name__ in {'AbstractBaseUser', 'PermissionsMixin'}
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
                x.related_name for x in c()._meta.related_objects
                if x.related_name is not None
            ] + [
                key for key, value in vars(c).items()
                if isinstance(value, property)
            ]
        )
        serializer_class = type(
            serializer_name,
            (serializers.ModelSerializer,),
            {
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
