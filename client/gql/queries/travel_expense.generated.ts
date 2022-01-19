import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  id: Scalars['Int'];
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

export type LoginUserBusinessTripsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LoginUserBusinessTripsQuery = { __typename?: 'Query', loginUserBusinessTrips: Array<{ __typename?: 'BusinessTrip', id: number, startDateTime: string, endDateTime: string, destination: { __typename?: 'Destination', name: string }, expenses: Array<{ __typename?: 'Expense', value?: number | null | undefined }> }> };

export type BusinessTripQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type BusinessTripQuery = { __typename?: 'Query', businessTrip: { __typename?: 'BusinessTrip', id: number, startDateTime: string, endDateTime: string, destination: { __typename?: 'Destination', id: number, name: string }, expenses: Array<{ __typename?: 'Expense', id: number, dateTime: string, value?: number | null | undefined, paid: boolean, remarks?: string | null | undefined, expenseType: { __typename?: 'ExpenseType', id: number, name: string }, currency: { __typename?: 'Currency', id: number, name: string }, receipt?: { __typename?: 'File', mimeType: string, data?: string | null | undefined } | null | undefined }> } };

export type DestinationIdNamesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DestinationIdNamesQuery = { __typename?: 'Query', destinations: Array<{ __typename?: 'Destination', id: number, name: string }> };

export type ExpenseTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ExpenseTypesQuery = { __typename?: 'Query', expenseTypes: Array<{ __typename?: 'ExpenseType', id: number, name: string, description?: string | null | undefined, isVoucherNeeded: boolean }> };


export const LoginUserBusinessTripsDocument = gql`
    query LoginUserBusinessTrips {
  loginUserBusinessTrips {
    id
    destination {
      name
    }
    startDateTime
    endDateTime
    expenses {
      value
    }
  }
}
    `;
export type LoginUserBusinessTripsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>
    } & TChildProps;
export function withLoginUserBusinessTrips<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginUserBusinessTripsQuery,
  LoginUserBusinessTripsQueryVariables,
  LoginUserBusinessTripsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables, LoginUserBusinessTripsProps<TChildProps, TDataName>>(LoginUserBusinessTripsDocument, {
      alias: 'loginUserBusinessTrips',
      ...operationOptions
    });
};

/**
 * __useLoginUserBusinessTripsQuery__
 *
 * To run a query within a React component, call `useLoginUserBusinessTripsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginUserBusinessTripsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginUserBusinessTripsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginUserBusinessTripsQuery(baseOptions?: Apollo.QueryHookOptions<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>(LoginUserBusinessTripsDocument, options);
      }
export function useLoginUserBusinessTripsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>(LoginUserBusinessTripsDocument, options);
        }
export type LoginUserBusinessTripsQueryHookResult = ReturnType<typeof useLoginUserBusinessTripsQuery>;
export type LoginUserBusinessTripsLazyQueryHookResult = ReturnType<typeof useLoginUserBusinessTripsLazyQuery>;
export type LoginUserBusinessTripsQueryResult = Apollo.QueryResult<LoginUserBusinessTripsQuery, LoginUserBusinessTripsQueryVariables>;
export const BusinessTripDocument = gql`
    query BusinessTrip($id: Int!) {
  businessTrip(id: $id) {
    id
    destination {
      id
      name
    }
    startDateTime
    endDateTime
    expenses {
      id
      expenseType {
        id
        name
      }
      dateTime
      value
      currency {
        id
        name
      }
      paid
      remarks
      receipt {
        mimeType
        data
      }
    }
  }
}
    `;
export type BusinessTripProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<BusinessTripQuery, BusinessTripQueryVariables>
    } & TChildProps;
export function withBusinessTrip<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  BusinessTripQuery,
  BusinessTripQueryVariables,
  BusinessTripProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, BusinessTripQuery, BusinessTripQueryVariables, BusinessTripProps<TChildProps, TDataName>>(BusinessTripDocument, {
      alias: 'businessTrip',
      ...operationOptions
    });
};

/**
 * __useBusinessTripQuery__
 *
 * To run a query within a React component, call `useBusinessTripQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessTripQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessTripQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBusinessTripQuery(baseOptions: Apollo.QueryHookOptions<BusinessTripQuery, BusinessTripQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessTripQuery, BusinessTripQueryVariables>(BusinessTripDocument, options);
      }
export function useBusinessTripLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessTripQuery, BusinessTripQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessTripQuery, BusinessTripQueryVariables>(BusinessTripDocument, options);
        }
export type BusinessTripQueryHookResult = ReturnType<typeof useBusinessTripQuery>;
export type BusinessTripLazyQueryHookResult = ReturnType<typeof useBusinessTripLazyQuery>;
export type BusinessTripQueryResult = Apollo.QueryResult<BusinessTripQuery, BusinessTripQueryVariables>;
export const DestinationIdNamesDocument = gql`
    query DestinationIdNames {
  destinations {
    id
    name
  }
}
    `;
export type DestinationIdNamesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>
    } & TChildProps;
export function withDestinationIdNames<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DestinationIdNamesQuery,
  DestinationIdNamesQueryVariables,
  DestinationIdNamesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, DestinationIdNamesQuery, DestinationIdNamesQueryVariables, DestinationIdNamesProps<TChildProps, TDataName>>(DestinationIdNamesDocument, {
      alias: 'destinationIdNames',
      ...operationOptions
    });
};

/**
 * __useDestinationIdNamesQuery__
 *
 * To run a query within a React component, call `useDestinationIdNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDestinationIdNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDestinationIdNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDestinationIdNamesQuery(baseOptions?: Apollo.QueryHookOptions<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>(DestinationIdNamesDocument, options);
      }
export function useDestinationIdNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>(DestinationIdNamesDocument, options);
        }
export type DestinationIdNamesQueryHookResult = ReturnType<typeof useDestinationIdNamesQuery>;
export type DestinationIdNamesLazyQueryHookResult = ReturnType<typeof useDestinationIdNamesLazyQuery>;
export type DestinationIdNamesQueryResult = Apollo.QueryResult<DestinationIdNamesQuery, DestinationIdNamesQueryVariables>;
export const ExpenseTypesDocument = gql`
    query ExpenseTypes {
  expenseTypes {
    id
    name
    description
    isVoucherNeeded
  }
}
    `;
export type ExpenseTypesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ExpenseTypesQuery, ExpenseTypesQueryVariables>
    } & TChildProps;
export function withExpenseTypes<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ExpenseTypesQuery,
  ExpenseTypesQueryVariables,
  ExpenseTypesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ExpenseTypesQuery, ExpenseTypesQueryVariables, ExpenseTypesProps<TChildProps, TDataName>>(ExpenseTypesDocument, {
      alias: 'expenseTypes',
      ...operationOptions
    });
};

/**
 * __useExpenseTypesQuery__
 *
 * To run a query within a React component, call `useExpenseTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpenseTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpenseTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExpenseTypesQuery(baseOptions?: Apollo.QueryHookOptions<ExpenseTypesQuery, ExpenseTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpenseTypesQuery, ExpenseTypesQueryVariables>(ExpenseTypesDocument, options);
      }
export function useExpenseTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpenseTypesQuery, ExpenseTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpenseTypesQuery, ExpenseTypesQueryVariables>(ExpenseTypesDocument, options);
        }
export type ExpenseTypesQueryHookResult = ReturnType<typeof useExpenseTypesQuery>;
export type ExpenseTypesLazyQueryHookResult = ReturnType<typeof useExpenseTypesLazyQuery>;
export type ExpenseTypesQueryResult = Apollo.QueryResult<ExpenseTypesQuery, ExpenseTypesQueryVariables>;