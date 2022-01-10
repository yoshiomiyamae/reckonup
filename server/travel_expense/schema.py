import graphene
from graphene_django import DjangoObjectType
from . import models


class DailyAllowanceType(DjangoObjectType):
    class Meta:
        model = models.DailyAllowance


class AccommodationFeeType(DjangoObjectType):
    class Meta:
        model = models.AccommodationFee


class TravelExpenseAreaType(DjangoObjectType):
    class Meta:
        model = models.TravelExpenseArea


class ExpenseType(DjangoObjectType):
    class Meta:
        model = models.Expense


class ExpenseTypeType(DjangoObjectType):
    class Meta:
        model = models.ExpenseType


class BusinessTripType(DjangoObjectType):
    class Meta:
        model = models.BusinessTrip


class DestinationType(DjangoObjectType):
    class Meta:
        model = models.Destination


class FileType(DjangoObjectType):
    class Meta:
        model = models.File


class ApprovalRouteType(DjangoObjectType):
    class Meta:
        model = models.ApprovalRoute


class Query(graphene.ObjectType):
    daily_allowances = graphene.List(DailyAllowanceType)
    accommodation_fees = graphene.List(AccommodationFeeType)
    travel_expense_areas = graphene.List(TravelExpenseAreaType)
    login_user_business_trips = graphene.List(BusinessTripType)
    expense_types = graphene.List(ExpenseTypeType)
    destinations = graphene.List(DestinationType)
    login_user_files = graphene.List(FileType)
    login_user_approval_route = graphene.Field(ApprovalRouteType)
    business_trip = graphene.Field(BusinessTripType, id=graphene.Int())

    def resolve_daily_allowances(self, info, **kwargs):
        return models.DailyAllowance.objects.all()

    def resolve_accommodation_fees(self, info, **kwargs):
        return models.AccommodationFee.objects.all()

    def resolve_travel_expense_areas(self, info, **kwargs):
        return models.TravelExpenseArea.objects.all()

    def resolve_login_user_business_trips(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return models.BusinessTrip.objects.filter(user=info.context.user)
        return None

    def resolve_expense_types(self, info, **kwargs):
        return models.ExpenseType.objects.all()

    def resolve_destinations(self, info, **kwargs):
        return models.Destination.objects.all()

    def resolve_login_user_files(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return models.File.objects.filter(owner=info.context.user)
        return None

    def resolve_login_user_approval_route(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return models.ApprovalRoute.objects.filter(user=info.context.user)
        return None

    def resolve_business_trip(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return models.BusinessTrip.objects.get(pk=kwargs.get('id'))
        return None
