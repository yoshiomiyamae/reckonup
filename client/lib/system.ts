import { UpdateLoginUserDocument, UpdateLoginUserMutation } from "../gql/mutations/system.generated";
import { CalendarsDocument, CalendarsQuery, CurrenciesDocument, CurrenciesQuery, DepartmentsDocument, DepartmentsQuery, GradesDocument, GradesQuery, LoginUserDocument, LoginUserQuery } from "../gql/queries/system.generated";
import { query, mutate } from "./apollo";

export const getLoginUser = async (context: any) => (
    await query<LoginUserQuery>(context, LoginUserDocument)
).loginUser;

export const getCalendars = async (context: any) => (
    await query<CalendarsQuery>(context, CalendarsDocument)
).calendars;

export const getGrades = async (context: any) => (
    await query<GradesQuery>(context, GradesDocument)
).grades;

export const getDepartments = async (context: any) => (
    await query<DepartmentsQuery>(context, DepartmentsDocument)
).departments;

export const updateLoginUser = async (context: any, variables: { id: number, firstName?: string, lastName?: string, email?: string, gradeId?: number, departmentId?: number }) => (
    await mutate<UpdateLoginUserMutation>(context, UpdateLoginUserDocument, variables, ['LoginUser'])
)?.updateLoginUser;

export const getCurrencies = async (context: any) => (
    await query<CurrenciesQuery>(context, CurrenciesDocument)
).currencies;