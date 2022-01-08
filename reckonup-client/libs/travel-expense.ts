import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { SERVER_SETTINGS } from "../common/config";
import { BusinessTrip, BusinessTripCollection, BusinessTripResponse, BusinessTripResponseCollection, Destination, DestinationCollection, DestinationResponseCollection, DailyAllowanceCollection, DailyAllowanceResponseCollection } from "../models/travel-expense";
import { get } from "./common";

export const putBusinessTrip = async (uesrId: number, businessTrip: BusinessTrip) => {
  try {
    if (businessTrip.id) {
      await axios.put<any, AxiosResponse<any, any>, BusinessTripResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${uesrId}/${businessTrip.id}/`,
        {
          id: businessTrip.id,
          user: businessTrip.userId,
          destination: businessTrip.destinationId,
          start_date_time: businessTrip.startDateTime.toISOString(),
          end_date_time: businessTrip.endDateTime.toISOString(),
          expenses: businessTrip.expenses.toExpenseResponseCollection(),
        });
    } else {
      await axios.post<any, AxiosResponse<any, any>, BusinessTripResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${uesrId}/new/`,
        {
          user: businessTrip.userId,
          destination: businessTrip.destinationId,
          start_date_time: businessTrip.startDateTime.toISOString(),
          end_date_time: businessTrip.endDateTime.toISOString(),
          expenses: businessTrip.expenses.toExpenseResponseCollection(),
        });
    }
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const deleteBusinessTrip = async (userId: number, id: number) => {
  try {
    const response = await axios.delete<BusinessTripResponse>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${userId}/${id}/`);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const getBusinessTrips = async (userId: number) => get<BusinessTripCollection, BusinessTripResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${userId}/`, BusinessTripCollection.fromBusinessTripResponseCollection);
export const getBusinessTrip = async (userId: number, id: number | string) => get<BusinessTrip, BusinessTripResponse>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${userId}/${id}/`, BusinessTrip.fromBusinessTripResponse);
export const getDestinations = async () => get<DestinationCollection, DestinationResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/destination/`, DestinationCollection.fromDestinationResponseCollection);
export const getDailyAllowances = async () => get<DailyAllowanceCollection, DailyAllowanceResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/daily_allowance/`, DailyAllowanceCollection.fromDailyAllowanceResponseCollection);