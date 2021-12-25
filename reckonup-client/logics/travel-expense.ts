import axios from "axios";
import { SERVER_SETTINGS } from "../common/config";
import { BusinessTrip, BusinessTripCollection, BusinessTripResponse, BusinessTripResponseCollection, Destination, DestinationCollection, DestinationResponseCollection } from "../models/travel-expense";

export const getBusinessTrips = async () => {
  const response = await axios.get<BusinessTripResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip`);
  try {
    return new BusinessTripCollection(
      ...response.data.map(d => new BusinessTrip({
        id: d.id,
        userId: d.user,
        startDateTime: new Date(d.start_date_time),
        endDateTime: new Date(d.end_date_time),
        destinationId: d.destination,
      }))
    );
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const getBusinessTrip = async (id: number | string) => {
  const response = await axios.get<BusinessTripResponse>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/business_trip/${id}`);
  try {
    return new BusinessTrip({
      id: response.data.id,
      userId: response.data.user,
      startDateTime: new Date(response.data.start_date_time),
      endDateTime: new Date(response.data.end_date_time),
      destinationId: response.data.destination,
    });
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}

export const getDestinations = async () => {
  const response = await axios.get<DestinationResponseCollection>(`${SERVER_SETTINGS.getUrl()}/api/travel_expense/destination`);
  try {
    return new DestinationCollection(
      ...response.data.map(d => ({
        id: d.id,
        name: d.name,
        latitude: d.latitude,
        longitude: d.longitude,
      } as Destination))
    );
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};