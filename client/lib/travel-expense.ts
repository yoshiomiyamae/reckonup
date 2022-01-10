import { BusinessTripDocument, BusinessTripQuery, DestinationIdNamesDocument, DestinationIdNamesQuery, ExpenseTypesDocument, ExpenseTypesQuery, LoginUserBusinessTripsDocument, LoginUserBusinessTripsQuery } from "../gql/queries/travel_expense.generated";
import { query } from "./apollo";

export const getLoginUserBusinessTrips = async (context: any) => (
    await query<LoginUserBusinessTripsQuery>(context, LoginUserBusinessTripsDocument)
).loginUserBusinessTrips;

export const getBusinessTrip = async (context: any, id: number) => (
    await query<BusinessTripQuery>(context, BusinessTripDocument, { id })
).businessTrip;

export const getDestinationIdNames = async (context: any) => (
    await query<DestinationIdNamesQuery>(context, DestinationIdNamesDocument)
).destinations;

export const getExpenseTypes = async (context: any) => (
    await query<ExpenseTypesQuery>(context, ExpenseTypesDocument)
).expenseTypes;