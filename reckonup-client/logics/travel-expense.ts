import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { SERVER_SETTINGS } from "../common/config";
import { BusinessTrip, BusinessTripCollection, BusinessTripResponse, BusinessTripResponseCollection, Destination, DestinationCollection, DestinationResponseCollection } from "../models/travel-expense";

export const getBusinessTrips = async () => {
  try {
    const response = await axios.get<BusinessTripResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/`);
    return BusinessTripCollection.fromBusinessTripResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const getBusinessTrip = async (id: number | string) => {
  try {
    const response = await axios.get<BusinessTripResponse>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${id}/`);
    return BusinessTrip.fromBusinessTripResponse(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}

export const putBusinessTrip = async (businessTrip: BusinessTrip) => {
  try {
    if (businessTrip.id) {
      await axios.put<any, AxiosResponse<any, any>, BusinessTripResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${businessTrip.id}/`,
        {
          id: businessTrip.id,
          user: businessTrip.userId,
          destination: businessTrip.destinationId,
          start_date_time: businessTrip.startDateTime.toISOString(),
          end_date_time: businessTrip.endDateTime.toISOString(),
        });
    } else {
      await axios.post<any, AxiosResponse<any, any>, BusinessTripResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/`,
        {
          user: businessTrip.userId,
          destination: businessTrip.destinationId,
          start_date_time: businessTrip.startDateTime.toISOString(),
          end_date_time: businessTrip.endDateTime.toISOString(),
        });
    }
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}

export const deleteBusinessTrip = async (id: number) => {
  try {
    const response = await axios.delete<BusinessTripResponse>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${id}/`);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}

export const getDestinations = async () => {
  try {
    const response = await axios.get<DestinationResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/destination/`);
    return DestinationCollection.fromDestinationResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};