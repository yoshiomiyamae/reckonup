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


class UpdateBusinessTrip(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)
        user_id = graphene.Int(required=True)
        start_date_time = graphene.DateTime(required=True)
        end_date_time = graphene.DateTime(required=True)
        destination_id = graphene.Int(required=True)

    def mutate(self, info, id, user_id, start_date_time, end_date_time, destination_id, *args, **kwargs):
        business_trip = models.BusinessTrip.objects.get(pk=id)
        user = models.User.objects.get(pk=user_id)
        business_trip.user = user
        business_trip.start_date_time = start_date_time
        business_trip.end_date_time = end_date_time
        destination = models.Destination.objects.get(pk=destination_id)
        business_trip.destination = destination
        business_trip.save()
        models.Expense.objects.delete(business_trip=business_trip)


class CreateExpense(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        business_trip_id = graphene.Int(reqired=True)
        expense_type_id = graphene.Int(required=True)
        date_time = graphene.DateTime()
        value = graphene.Decimal()
        currency_id = graphene.Int()
        paid = graphene.Boolean()
        remarks = graphene.String()

    def mutate(self, info, business_trip_id, expense_type_id, *args, **kwargs):
        business_trip = models.BusinessTrip.objects.get(pk=id)
        expense_type = models.ExpenseType.objects.get(pk=expense_type_id)
        expense = models.Expense.objects.create(
            business_trip=business_trip, expense_type=expense_type)
        if 'date_time' in kwargs:
            expense.date_time = kwargs['date_time']
        if 'value' in kwargs:
            expense.value = kwargs['value']
        if 'currency_id' in kwargs:
            currency = models.Currency.objects.get(pk=kwargs['currency_id'])
            expense.currency = currency
        if 'paid' in kwargs:
            expense.paid = kwargs['paid']
        if 'remarks' in kwargs:
            expense.remarks = kwargs['remarks']
        expense.save()
