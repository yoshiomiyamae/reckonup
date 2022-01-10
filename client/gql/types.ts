export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  GenericScalar: any;
};

export type AccommodationFee = {
  __typename?: 'AccommodationFee';
  currency: Currency;
  grade: Grade;
  travelExpenseArea: TravelExpenseArea;
  value: Scalars['Float'];
};

export type ApprovalRoute = {
  __typename?: 'ApprovalRoute';
  nextUser: User;
  user: User;
};

export type BusinessTrip = {
  __typename?: 'BusinessTrip';
  destination: Destination;
  endDateTime: Scalars['String'];
  expenses: Array<Expense>;
  id: Scalars['Int'];
  startDateTime: Scalars['String'];
  user?: Maybe<User>;
};

export type Calendar = {
  __typename?: 'Calendar';
  date: Scalars['String'];
  isHoliday: Scalars['Boolean'];
};

export type Country = {
  __typename?: 'Country';
  code?: Maybe<Scalars['String']>;
  code2?: Maybe<Scalars['String']>;
  countryFlag?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  numeric?: Maybe<Scalars['Int']>;
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String'];
  codeNumber: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type DailyAllowance = {
  __typename?: 'DailyAllowance';
  currency: Currency;
  grade: Grade;
  value: Scalars['Float'];
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Destination = {
  __typename?: 'Destination';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type Expense = {
  __typename?: 'Expense';
  currency: Currency;
  dateTime: Scalars['String'];
  expenseType: ExpenseType;
  paid: Scalars['Boolean'];
  receipt?: Maybe<File>;
  remarks?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ExpenseType = {
  __typename?: 'ExpenseType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isVoucherNeeded: Scalars['Boolean'];
  name: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  data?: Maybe<Scalars['String']>;
  mimeType: Scalars['String'];
  owner: User;
};

export type Grade = {
  __typename?: 'Grade';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshToken: TokenAuthResponse;
  revokeToken: RevokeTokenResponse;
  tokenAuth: TokenAuthResponse;
  updateLoginUser: UserUpdateResponse;
  verifyToken: VerifyTokenResponse;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateLoginUserArgs = {
  departmentId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  gradeId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  lastName?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  department?: Maybe<Department>;
  grade?: Maybe<Grade>;
};

export type Query = {
  __typename?: 'Query';
  businessTrip: BusinessTrip;
  calendars: Array<Calendar>;
  currencies: Array<Currency>;
  departments: Array<Department>;
  destinations: Array<Destination>;
  expenseTypes: Array<ExpenseType>;
  grades: Array<Grade>;
  loginUser: User;
  loginUserBusinessTrips: Array<BusinessTrip>;
};


export type QueryBusinessTripArgs = {
  id: Scalars['Int'];
};

export type RevokeTokenResponse = {
  __typename?: 'RevokeTokenResponse';
  revoked: Scalars['Boolean'];
};

export type TokenAuthResponse = {
  __typename?: 'TokenAuthResponse';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type TravelExpenseArea = {
  __typename?: 'TravelExpenseArea';
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  dateJoined: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  isStaff: Scalars['Boolean'];
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  username: Scalars['String'];
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  id: Scalars['Int'];
};

export type VerifyTokenResponse = {
  __typename?: 'VerifyTokenResponse';
  payload: Scalars['GenericScalar'];
};
