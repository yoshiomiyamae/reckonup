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

export type TokenAuthMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type TokenAuthMutation = { __typename?: 'Mutation', tokenAuth: { __typename?: 'TokenAuthResponse', token: string, payload: any, refreshToken: string, refreshExpiresIn: number } };

export type VerifyTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type VerifyTokenMutation = { __typename?: 'Mutation', verifyToken: { __typename?: 'VerifyTokenResponse', payload: any } };

export type RefreshTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'TokenAuthResponse', token: string, payload: any, refreshToken: string, refreshExpiresIn: number } };

export type RevokeTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String'];
}>;


export type RevokeTokenMutation = { __typename?: 'Mutation', revokeToken: { __typename?: 'RevokeTokenResponse', revoked: boolean } };

export type UpdateLoginUserMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  firstName?: Types.InputMaybe<Types.Scalars['String']>;
  lastName?: Types.InputMaybe<Types.Scalars['String']>;
  email?: Types.InputMaybe<Types.Scalars['String']>;
  gradeId?: Types.InputMaybe<Types.Scalars['Int']>;
  departmentId?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UpdateLoginUserMutation = { __typename?: 'Mutation', updateLoginUser: { __typename?: 'UserUpdateResponse', id: number } };


export const TokenAuthDocument = gql`
    mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type TokenAuthMutationFn = Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;
export type TokenAuthProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>
    } & TChildProps;
export function withTokenAuth<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  TokenAuthMutation,
  TokenAuthMutationVariables,
  TokenAuthProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, TokenAuthMutation, TokenAuthMutationVariables, TokenAuthProps<TChildProps, TDataName>>(TokenAuthDocument, {
      alias: 'tokenAuth',
      ...operationOptions
    });
};

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: Apollo.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, options);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = Apollo.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = Apollo.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const VerifyTokenDocument = gql`
    mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}
    `;
export type VerifyTokenMutationFn = Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>;
export type VerifyTokenProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<VerifyTokenMutation, VerifyTokenMutationVariables>
    } & TChildProps;
export function withVerifyToken<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VerifyTokenMutation,
  VerifyTokenMutationVariables,
  VerifyTokenProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, VerifyTokenMutation, VerifyTokenMutationVariables, VerifyTokenProps<TChildProps, TDataName>>(VerifyTokenDocument, {
      alias: 'verifyToken',
      ...operationOptions
    });
};

/**
 * __useVerifyTokenMutation__
 *
 * To run a mutation, you first call `useVerifyTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokenMutation, { data, loading, error }] = useVerifyTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokenMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokenMutation, VerifyTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTokenMutation, VerifyTokenMutationVariables>(VerifyTokenDocument, options);
      }
export type VerifyTokenMutationHookResult = ReturnType<typeof useVerifyTokenMutation>;
export type VerifyTokenMutationResult = Apollo.MutationResult<VerifyTokenMutation>;
export type VerifyTokenMutationOptions = Apollo.BaseMutationOptions<VerifyTokenMutation, VerifyTokenMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
    payload
    refreshToken
    refreshExpiresIn
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;
export type RefreshTokenProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>
    } & TChildProps;
export function withRefreshToken<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RefreshTokenMutation,
  RefreshTokenMutationVariables,
  RefreshTokenProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RefreshTokenMutation, RefreshTokenMutationVariables, RefreshTokenProps<TChildProps, TDataName>>(RefreshTokenDocument, {
      alias: 'refreshToken',
      ...operationOptions
    });
};

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RevokeTokenDocument = gql`
    mutation RevokeToken($refreshToken: String!) {
  revokeToken(refreshToken: $refreshToken) {
    revoked
  }
}
    `;
export type RevokeTokenMutationFn = Apollo.MutationFunction<RevokeTokenMutation, RevokeTokenMutationVariables>;
export type RevokeTokenProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<RevokeTokenMutation, RevokeTokenMutationVariables>
    } & TChildProps;
export function withRevokeToken<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RevokeTokenMutation,
  RevokeTokenMutationVariables,
  RevokeTokenProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, RevokeTokenMutation, RevokeTokenMutationVariables, RevokeTokenProps<TChildProps, TDataName>>(RevokeTokenDocument, {
      alias: 'revokeToken',
      ...operationOptions
    });
};

/**
 * __useRevokeTokenMutation__
 *
 * To run a mutation, you first call `useRevokeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeTokenMutation, { data, loading, error }] = useRevokeTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRevokeTokenMutation(baseOptions?: Apollo.MutationHookOptions<RevokeTokenMutation, RevokeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeTokenMutation, RevokeTokenMutationVariables>(RevokeTokenDocument, options);
      }
export type RevokeTokenMutationHookResult = ReturnType<typeof useRevokeTokenMutation>;
export type RevokeTokenMutationResult = Apollo.MutationResult<RevokeTokenMutation>;
export type RevokeTokenMutationOptions = Apollo.BaseMutationOptions<RevokeTokenMutation, RevokeTokenMutationVariables>;
export const UpdateLoginUserDocument = gql`
    mutation UpdateLoginUser($id: Int!, $firstName: String, $lastName: String, $email: String, $gradeId: Int, $departmentId: Int) {
  updateLoginUser(
    id: $id
    firstName: $firstName
    lastName: $lastName
    email: $email
    gradeId: $gradeId
    departmentId: $departmentId
  ) {
    id
  }
}
    `;
export type UpdateLoginUserMutationFn = Apollo.MutationFunction<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>;
export type UpdateLoginUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>
    } & TChildProps;
export function withUpdateLoginUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateLoginUserMutation,
  UpdateLoginUserMutationVariables,
  UpdateLoginUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateLoginUserMutation, UpdateLoginUserMutationVariables, UpdateLoginUserProps<TChildProps, TDataName>>(UpdateLoginUserDocument, {
      alias: 'updateLoginUser',
      ...operationOptions
    });
};

/**
 * __useUpdateLoginUserMutation__
 *
 * To run a mutation, you first call `useUpdateLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoginUserMutation, { data, loading, error }] = useUpdateLoginUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      gradeId: // value for 'gradeId'
 *      departmentId: // value for 'departmentId'
 *   },
 * });
 */
export function useUpdateLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>(UpdateLoginUserDocument, options);
      }
export type UpdateLoginUserMutationHookResult = ReturnType<typeof useUpdateLoginUserMutation>;
export type UpdateLoginUserMutationResult = Apollo.MutationResult<UpdateLoginUserMutation>;
export type UpdateLoginUserMutationOptions = Apollo.BaseMutationOptions<UpdateLoginUserMutation, UpdateLoginUserMutationVariables>;