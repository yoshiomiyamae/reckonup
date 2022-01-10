import graphene
from graphene_django import DjangoObjectType
from . import models


class UserType(DjangoObjectType):
    class Meta:
        model = models.User

    def resolve_password(self, info):
        return 'Password field is protected'


class ProfileType(DjangoObjectType):
    class Meta:
        model = models.Profile


class GradeType(DjangoObjectType):
    class Meta:
        model = models.Grade


class DepartmentType(DjangoObjectType):
    class Meta:
        model = models.Department


class CurrencyType(DjangoObjectType):
    class Meta:
        model = models.Currency


class CountryType(DjangoObjectType):
    class Meta:
        model = models.Country


class CalendarType(DjangoObjectType):
    class Meta:
        model = models.Calendar


class Query(graphene.ObjectType):
    login_user = graphene.Field(UserType)
    grades = graphene.List(GradeType)
    departments = graphene.List(DepartmentType)
    currencies = graphene.List(CurrencyType)
    countries = graphene.List(CountryType)
    calendars = graphene.List(CalendarType)

    def resolve_currencies(self, info, **kwargs):
        return models.Currency.objects.all()

    def resolve_countries(self, info, **kwargs):
        return models.Country.objects.all()

    def resolve_calendars(self, info, **kwargs):
        return models.Calendar.objects.all()

    def resolve_login_user(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return info.context.user
        return None

    def resolve_grades(self, info, **kwargs):
        return models.Grade.objects.all()

    def resolve_departments(self, info, **kwargs):
        return models.Department.objects.all()


class UpdateLoginUser(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        grade_id = graphene.Int()
        department_id = graphene.Int()

    def mutate(self, info, id, *args, **kwargs):
        user = models.User.objects.get(pk=id)
        if 'first_name' in kwargs:
            user.first_name = kwargs['first_name']
        if 'last_name' in kwargs:
            user.last_name = kwargs['last_name']
        if 'email' in kwargs:
            user.email = kwargs['email']
        user.save()
        profile = models.Profile.objects.get(user=user)
        if 'grade_id' in kwargs:
            profile.grade_id = kwargs['grade_id']
        if 'department_id' in kwargs:
            profile.department_id = kwargs['department_id']
        profile.save()
        return UpdateLoginUser(id=user.id)


class Mutation(graphene.ObjectType):
    update_login_user = UpdateLoginUser.Field()
