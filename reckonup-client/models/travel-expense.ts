export interface IBusinessTrip {
  id?: number;
  userId?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  destinationId?: number;
}

export class BusinessTrip implements IBusinessTrip {
  id?: number;
  userId?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  destinationId?: number;

  constructor(businessTrip: IBusinessTrip) {
    this.id = businessTrip.id;
    this.userId = businessTrip.userId;
    this.startDateTime = businessTrip.startDateTime;
    this.endDateTime = businessTrip.endDateTime;
    this.destinationId = businessTrip.destinationId;
  }

  static fromBusinessTripResponse = (businessTripResponse: BusinessTripResponse) => new BusinessTrip({
    id: businessTripResponse.id,
    userId: businessTripResponse.user,
    startDateTime: new Date(businessTripResponse.start_date_time),
    endDateTime: new Date(businessTripResponse.end_date_time),
    destinationId: businessTripResponse.destination,
  });
}

export class BusinessTripCollection extends Array<BusinessTrip>{
  get = (id: number): BusinessTrip => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      userId: 0,
      startDateTime: new Date(),
      endDateTime: new Date(),
      destinationId: 0,
    }
  );

  constructor(businessTrips: BusinessTrip[] = []) {
    super();
    if (!Array.isArray(businessTrips)) {
      return;
    }
    this.push(...businessTrips);
  }

  static fromBusinessTripResponseCollection = (businessTripResponses: BusinessTripResponseCollection) => new BusinessTripCollection(
    businessTripResponses.map(d => BusinessTrip.fromBusinessTripResponse(d))
  );
}

export interface BusinessTripResponse {
  id?: number;
  user?: number;
  start_date_time?: string;
  end_date_time?: string;
  destination?: number;
}

export class BusinessTripResponseCollection extends Array<BusinessTripResponse> {
  get = (id: number): BusinessTripResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      user: 0,
      start_date_time: "",
      end_date_time: "",
      destination: 0,
    }
  );
}

export interface IDestination {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export class Destination implements IDestination {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;

  constructor(destination: IDestination) {
    this.id = destination.id;
    this.name = destination.name;
    this.description = destination.description;
    this.latitude = destination.latitude;
    this.longitude = destination.longitude;
  }

  static fromDestinationResponse = (destinationResponse: DestinationResponse) => new Destination({
    id: destinationResponse.id,
    name: destinationResponse.name,
    description: destinationResponse.description,
    latitude: destinationResponse.latitude,
    longitude: destinationResponse.longitude,
  });
}

export class DestinationCollection extends Array<Destination>{
  get = (id: number): Destination => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: "",
      description: "",
      latitude: 0,
      longitude: 0,
    }
  );

  constructor(destinations: Destination[] = []) {
    super();
    if (!Array.isArray(destinations)) {
      return;
    }
    this.push(...destinations);
  }

  static fromDestinationResponseCollection = (destinationResponses: DestinationResponseCollection) => new DestinationCollection(
    destinationResponses.map(d => Destination.fromDestinationResponse(d))
  );
}

export class DestinationResponse {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export class DestinationResponseCollection extends Array<DestinationResponse> {
  get = (id: number): DestinationResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: "",
      description: "",
      latitude: 0,
      longitude: 0,
    }
  );
}
