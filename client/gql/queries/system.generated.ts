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

export type LoginUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LoginUserQuery = { __typename?: 'Query', loginUser: { __typename?: 'User', id: number, username: string, firstName?: string | null | undefined, lastName?: string | null | undefined, email?: string | null | undefined, isSuperuser: boolean, isStaff: boolean, isActive: boolean, lastLogin?: string | null | undefined, dateJoined: string, profile?: { __typename?: 'Profile', grade?: { __typename?: 'Grade', id: number, name: string } | null | undefined, department?: { __typename?: 'Department', id: number, name: string } | null | undefined } | null | undefined } };

export type CalendarsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CalendarsQuery = { __typename?: 'Query', calendars: Array<{ __typename?: 'Calendar', date: string, isHoliday: boolean }> };

export type GradesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GradesQuery = { __typename?: 'Query', grades: Array<{ __typename?: 'Grade', id: number, name: string }> };

export type DepartmentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', id: number, name: string }> };

export type CurrenciesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrenciesQuery = { __typename?: 'Query', currencies: Array<{ __typename?: 'Currency', id: number, name: string, code: string, codeNumber: number }> };


export const LoginUserDocument = gql`
    query LoginUser {
  loginUser {
    id
    username
    firstName
    lastName
    email
    isSuperuser
    isStaff
    isActive
    profile {
      grade {
        id
        name
      }
      department {
        id
        name
      }
    }
    lastLogin
    dateJoined
  }
}
    `;
export type LoginUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<LoginUserQuery, LoginUserQueryVariables>
    } & TChildProps;
export function withLoginUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginUserQuery,
  LoginUserQueryVariables,
  LoginUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, LoginUserQuery, LoginUserQueryVariables, LoginUserProps<TChildProps, TDataName>>(LoginUserDocument, {
      alias: 'loginUser',
      ...operationOptions
    });
};

/**
 * __useLoginUserQuery__
 *
 * To run a query within a React component, call `useLoginUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginUserQuery(baseOptions?: Apollo.QueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
      }
export function useLoginUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginUserQuery, LoginUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginUserQuery, LoginUserQueryVariables>(LoginUserDocument, options);
        }
export type LoginUserQueryHookResult = ReturnType<typeof useLoginUserQuery>;
export type LoginUserLazyQueryHookResult = ReturnType<typeof useLoginUserLazyQuery>;
export type LoginUserQueryResult = Apollo.QueryResult<LoginUserQuery, LoginUserQueryVariables>;
export const CalendarsDocument = gql`
    query Calendars {
  calendars {
    date
    isHoliday
  }
}
    `;
export type CalendarsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CalendarsQuery, CalendarsQueryVariables>
    } & TChildProps;
export function withCalendars<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CalendarsQuery,
  CalendarsQueryVariables,
  CalendarsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CalendarsQuery, CalendarsQueryVariables, CalendarsProps<TChildProps, TDataName>>(CalendarsDocument, {
      alias: 'calendars',
      ...operationOptions
    });
};

/**
 * __useCalendarsQuery__
 *
 * To run a query within a React component, call `useCalendarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalendarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalendarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCalendarsQuery(baseOptions?: Apollo.QueryHookOptions<CalendarsQuery, CalendarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalendarsQuery, CalendarsQueryVariables>(CalendarsDocument, options);
      }
export function useCalendarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalendarsQuery, CalendarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalendarsQuery, CalendarsQueryVariables>(CalendarsDocument, options);
        }
export type CalendarsQueryHookResult = ReturnType<typeof useCalendarsQuery>;
export type CalendarsLazyQueryHookResult = ReturnType<typeof useCalendarsLazyQuery>;
export type CalendarsQueryResult = Apollo.QueryResult<CalendarsQuery, CalendarsQueryVariables>;
export const GradesDocument = gql`
    query Grades {
  grades {
    id
    name
  }
}
    `;
export type GradesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GradesQuery, GradesQueryVariables>
    } & TChildProps;
export function withGrades<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GradesQuery,
  GradesQueryVariables,
  GradesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GradesQuery, GradesQueryVariables, GradesProps<TChildProps, TDataName>>(GradesDocument, {
      alias: 'grades',
      ...operationOptions
    });
};

/**
 * __useGradesQuery__
 *
 * To run a query within a React component, call `useGradesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGradesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGradesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGradesQuery(baseOptions?: Apollo.QueryHookOptions<GradesQuery, GradesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GradesQuery, GradesQueryVariables>(GradesDocument, options);
      }
export function useGradesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GradesQuery, GradesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GradesQuery, GradesQueryVariables>(GradesDocument, options);
        }
export type GradesQueryHookResult = ReturnType<typeof useGradesQuery>;
export type GradesLazyQueryHookResult = ReturnType<typeof useGradesLazyQuery>;
export type GradesQueryResult = Apollo.QueryResult<GradesQuery, GradesQueryVariables>;
export const DepartmentsDocument = gql`
    query Departments {
  departments {
    id
    name
  }
}
    `;
export type DepartmentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<DepartmentsQuery, DepartmentsQueryVariables>
    } & TChildProps;
export function withDepartments<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DepartmentsQuery,
  DepartmentsQueryVariables,
  DepartmentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, DepartmentsQuery, DepartmentsQueryVariables, DepartmentsProps<TChildProps, TDataName>>(DepartmentsDocument, {
      alias: 'departments',
      ...operationOptions
    });
};

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
      }
export function useDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const CurrenciesDocument = gql`
    query Currencies {
  currencies {
    id
    name
    code
    codeNumber
  }
}
    `;
export type CurrenciesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<CurrenciesQuery, CurrenciesQueryVariables>
    } & TChildProps;
export function withCurrencies<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CurrenciesQuery,
  CurrenciesQueryVariables,
  CurrenciesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, CurrenciesQuery, CurrenciesQueryVariables, CurrenciesProps<TChildProps, TDataName>>(CurrenciesDocument, {
      alias: 'currencies',
      ...operationOptions
    });
};

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
      }
export function useCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
        }
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<typeof useCurrenciesLazyQuery>;
export type CurrenciesQueryResult = Apollo.QueryResult<CurrenciesQuery, CurrenciesQueryVariables>;