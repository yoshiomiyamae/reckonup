export interface IBusinessTrip {
  id?: number;
  userId?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  destinationId?: number;
  expenses?: ExpenseCollection;
}

export class BusinessTrip implements IBusinessTrip {
  id?: number;
  userId?: number;
  startDateTime?: Date;
  endDateTime?: Date;
  destinationId?: number;
  expenses?: ExpenseCollection;

  constructor(businessTrip: IBusinessTrip | null = null) {
    if (businessTrip) {
      this.id = businessTrip.id;
      this.userId = businessTrip.userId;
      this.startDateTime = businessTrip.startDateTime;
      this.endDateTime = businessTrip.endDateTime;
      this.destinationId = businessTrip.destinationId;
      this.expenses = businessTrip.expenses;
    } else {
      this.id = 0;
      this.userId = 0;
      this.startDateTime = new Date();
      this.endDateTime = new Date();
      this.destinationId = 0;
      this.expenses = new ExpenseCollection();
    }
  }

  static fromBusinessTripResponse = (businessTripResponse: BusinessTripResponse) => new BusinessTrip({
    id: businessTripResponse.id,
    userId: businessTripResponse.user,
    startDateTime: new Date(businessTripResponse.start_date_time),
    endDateTime: new Date(businessTripResponse.end_date_time),
    destinationId: businessTripResponse.destination,
    expenses: ExpenseCollection.fromExpenseResponseCollection(businessTripResponse.expenses),
  });
}

export class BusinessTripCollection extends Array<BusinessTrip>{
  get = (id: number): BusinessTrip => (
    this.find(d => d.id === id) ||
    new BusinessTrip()
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
  expenses?: ExpenseResponseCollection;
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
      expenses: new ExpenseResponseCollection(),
    }
  );
}

export interface IExpense {
  id?: number;
  businessTripId?: number;
  dateTime?: Date;
  value?: number;
  currencyId?: number;
  paid?: boolean;
  remarks?: string;
  receiptId?: number;
}

export class Expense {
  id?: number;
  businessTripId?: number;
  dateTime?: Date;
  value?: number;
  currencyId?: number;
  paid?: boolean;
  remarks?: string;
  receiptId?: number;

  constructor(expense: Expense | null = null) {
    if (expense) {
      this.id = expense.id;
      this.businessTripId = expense.businessTripId;
      this.dateTime = expense.dateTime;
      this.value = expense.value;
      this.currencyId = expense.currencyId;
      this.paid = expense.paid;
      this.remarks = expense.remarks;
      this.receiptId = expense.receiptId;
    } else {
      this.id = 0;
      this.businessTripId = 0;
      this.dateTime = new Date();
      this.value = 0;
      this.currencyId = 0;
      this.paid = false;
      this.remarks = '';
      this.receiptId = 0;
    }
  }

  static fromExpenseResponse = (expenseResponse: ExpenseResponse) => new Expense({
    id: expenseResponse.id,
    businessTripId: expenseResponse.business_trip,
    dateTime: new Date(expenseResponse.date_time),
    value: expenseResponse.value,
    currencyId: expenseResponse.currency,
    paid: expenseResponse.paid,
    remarks: expenseResponse.remarks,
    receiptId: expenseResponse.receipt,
  });

  toExpenseResponse?= () => <ExpenseResponse>{
    id: this.id,
    business_trip: this.businessTripId,
    date_time: this.dateTime.toISOString(),
    value: this.value,
    currency: this.currencyId,
    paid: this.paid,
    remarks: this.remarks,
    receipt: this.receiptId,
  };
}

export class ExpenseCollection extends Array<Expense>{
  get = (id: number): Expense => (
    this.find(d => d.id === id) ||
    new Expense()
  );

  constructor(expenses: Expense[] = []) {
    super();
    if (!Array.isArray(expenses)) {
      return;
    }
    this.push(...expenses);
  }

  static fromExpenseResponseCollection = (expenseResponses: ExpenseResponseCollection) => new ExpenseCollection(
    expenseResponses.map(d => Expense.fromExpenseResponse(d))
  );

  toExpenseResponseCollection = () => new ExpenseResponseCollection(this.map(d => d.toExpenseResponse()));
}

export interface ExpenseResponse {
  id?: number;
  business_trip?: number;
  date_time?: string;
  value?: number;
  currency?: number;
  paid?: boolean;
  remarks?: string;
  receipt?: number;
}

export class ExpenseResponseCollection extends Array<ExpenseResponse> {
  get = (id: number): ExpenseResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      business_trip: 0,
      date_time: '',
      value: 0,
      currency: 0,
      paid: false,
      remarks: '',
      receipt: 0,
    }
  );

  constructor(expenseResponses: ExpenseResponse[] = []) {
    super();
    if (!Array.isArray(expenseResponses)) {
      return;
    }
    this.push(...expenseResponses);
  }
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

  constructor(destination: IDestination | null = null) {
    if (destination) {
      this.id = destination.id;
      this.name = destination.name;
      this.description = destination.description;
      this.latitude = destination.latitude;
      this.longitude = destination.longitude;
    } else {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.latitude = 0;
      this.longitude = 0;
    }
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
    new Destination()
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


export interface IDailyAllowance {
  id: number;
  classificationId: number;
  value: number;
  currencyId: number;
};

export class DailyAllowance implements IDailyAllowance {
  id: number;
  classificationId: number;
  value: number;
  currencyId: number;

  constructor(dailyAllowance: IDailyAllowance | null = null) {
    if (dailyAllowance) {
      this.id = dailyAllowance.id;
      this.classificationId = dailyAllowance.classificationId;
      this.value = dailyAllowance.value;
      this.currencyId = dailyAllowance.currencyId;
    } else {
      this.id = 0;
      this.classificationId = 0;
      this.value = 0;
      this.currencyId = 0;
    }
  }

  static fromDailyAllowanceResponse = (dailyAllowanceResponse: DailyAllowanceResponse) => new DailyAllowance({
    id: dailyAllowanceResponse.id,
    classificationId: dailyAllowanceResponse.classification,
    value: dailyAllowanceResponse.value,
    currencyId: dailyAllowanceResponse.currency,
  });
}

export class DailyAllowanceCollection extends Array<DailyAllowance>{
  get = (classificationId: number): DailyAllowance => (
    this.find(d => d.classificationId === classificationId) ||
    new DailyAllowance()
  );

  constructor(dailyAllowances: DailyAllowance[] = []) {
    super();
    if (!Array.isArray(dailyAllowances)) {
      return;
    }
    this.push(...dailyAllowances);
  }

  static fromDailyAllowanceResponseCollection = (dailyAllowanceResponses: DailyAllowanceResponseCollection) => new DailyAllowanceCollection(
    dailyAllowanceResponses.map(d => DailyAllowance.fromDailyAllowanceResponse(d))
  );
}

export interface DailyAllowanceResponse {
  id: number;
  classification: number;
  value: number;
  currency: number;
}

export class DailyAllowanceResponseCollection extends Array<DailyAllowanceResponse> {
  get = (classificationId: number): DailyAllowanceResponse => (
    this.find(d => d.classification === classificationId) ||
    {
      id: 0,
      classification: 0,
      value: 0,
      currency: 0,
    }
  );
}

export interface ITravelExpenseArea {
  id: number;
  name: string;
  description: string;
}

export class TravelExpenseArea implements ITravelExpenseArea {
  id: number;
  name: string;
  description: string;

  constructor(dailyAllowance: ITravelExpenseArea | null = null) {
    if (dailyAllowance) {
      this.id = dailyAllowance.id;
      this.name = dailyAllowance.name;
      this.description = dailyAllowance.description;
    } else {
      this.id = 0;
      this.name = '';
      this.description = '';
    }
  }

  static fromTravelExpenseAreaResponse = (travelExpenseAreaResponse: TravelExpenseAreaResponse) => new TravelExpenseArea({
    id: travelExpenseAreaResponse.id,
    name: travelExpenseAreaResponse.name,
    description: travelExpenseAreaResponse.description,
  });
}

export class TravelExpenseAreaCollection extends Array<TravelExpenseArea> {
  get = (id: number): TravelExpenseArea => (
    this.find(d => d.id === id) ||
    new TravelExpenseArea()
  );

  constructor(travelExpenseAreas: TravelExpenseArea[] = []) {
    super();
    if (!Array.isArray(travelExpenseAreas)) {
      return;
    }
    this.push(...travelExpenseAreas);
  }

  static fromTravelExpenseAreaResponseCollection = (travelExpenseAreaResponses: TravelExpenseAreaResponseCollection) => new TravelExpenseAreaCollection(
    travelExpenseAreaResponses.map(d => TravelExpenseArea.fromTravelExpenseAreaResponse(d))
  );
}

export interface TravelExpenseAreaResponse {
  id: number;
  name: string;
  description: string;
}

export class TravelExpenseAreaResponseCollection extends Array<TravelExpenseAreaResponse> {
  get = (id: number): TravelExpenseAreaResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      name: '',
      description: '',
    }
  );
}

export interface IAccommondationFee {
  id: number;
  travelExpenseAreaId: number;
  classificationId: number;
  value: number;
  currencyId: number;
}

export class AccommondationFee implements IAccommondationFee {
  id: number;
  travelExpenseAreaId: number;
  classificationId: number;
  value: number;
  currencyId: number;

  constructor(accommondationFee: IAccommondationFee | null = null) {
    if (accommondationFee) {
      this.id = accommondationFee.id;
      this.travelExpenseAreaId = accommondationFee.travelExpenseAreaId;
      this.classificationId = accommondationFee.classificationId;
      this.value = accommondationFee.value;
      this.currencyId = accommondationFee.currencyId;
    } else {
      this.id = 0;
      this.travelExpenseAreaId = 0;
      this.classificationId = 0;
      this.value = 0;
      this.currencyId = 0;
    }
  }

  static fromAccommondationFeeResponse = (accommondationFeeResponse: AccommondationFeeResponse) => new AccommondationFee({
    id: accommondationFeeResponse.id,
    travelExpenseAreaId: accommondationFeeResponse.travelExpenseArea,
    classificationId: accommondationFeeResponse.classification,
    value: accommondationFeeResponse.value,
    currencyId: accommondationFeeResponse.currency,
  });
}

export class AccommondationFeeCollection extends Array<AccommondationFee> {
  get = (id: number): AccommondationFee => (
    this.find(d => d.id === id) ||
    new AccommondationFee()
  );

  constructor(accommondationFees: AccommondationFee[] = []) {
    super();
    if (!Array.isArray(accommondationFees)) {
      return;
    }
    this.push(...accommondationFees);
  }

  static fromAccommondationFeeResponseCollection = (accommondationFeeResponses: AccommondationFeeResponseCollection) => new AccommondationFeeCollection(
    accommondationFeeResponses.map(d => AccommondationFee.fromAccommondationFeeResponse(d))
  );
}

export interface AccommondationFeeResponse {
  id: number;
  travelExpenseArea: number;
  classification: number;
  value: number;
  currency: number;
}

export class AccommondationFeeResponseCollection extends Array<AccommondationFeeResponse> {
  get = (id: number): AccommondationFeeResponse => (
    this.find(d => d.id === id) ||
    {
      id: 0,
      travelExpenseArea: 0,
      classification: 0,
      value: 0,
      currency: 0,
    }
  );
}