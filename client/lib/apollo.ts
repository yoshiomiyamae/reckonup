import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, fromPromise, DocumentNode, OperationVariables, InternalRefetchQueriesInclude, FetchResult } from '@apollo/client';
import nookies from 'nookies'
import jwt from "jsonwebtoken";
import { JwtData } from '../models';
import { RefreshTokenDocument, RefreshTokenMutation } from '../gql/mutations/system.generated';
import { offsetLimitPagination } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
  const now = new Date().getTime() / 1000;
  const cookies = nookies.get(operation.getContext());
  const jwtData = jwt.decode(cookies['token']) as JwtData;
  if (!jwtData) {
    return forward(operation);
  }
  if (jwtData.exp > now) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `JWT ${cookies['token']}` || null,
      }
    }));
    return forward(operation);
  }
  else if (jwtData.exp < now && Number(cookies['refreshExpiresIn']) > now) {
    return fromPromise((async () => {
      const { data, errors } = await anonymousClient.mutate<RefreshTokenMutation>({ mutation: RefreshTokenDocument, variables: { refreshToken: cookies['refreshToken'] } });
      if (errors) {
        throw errors;
      }
      if (!data || !data.refreshToken) {
        throw 'Token could not be refreshed';
      }
      return data.refreshToken.token;
    })()).flatMap((token) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: `JWT ${token}` || null,
        }
      }));
      return forward(operation);
    });
  }
  return forward(operation);
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    authMiddleware,
    httpLink,
  ]),
});

const anonymousClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    httpLink,
  ]),
});

export const query = async <Q>(context: any, document: DocumentNode, variables?: OperationVariables) => {
  const { data, error } = await client.query<Q>({ query: document, context, variables, fetchPolicy: 'network-only' });
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
}

export const mutate = async<M>(context: any, document: DocumentNode, variables?: OperationVariables, refetchQueries?: InternalRefetchQueriesInclude) => {
  const { data, errors } = await client.mutate<M>({ mutation: document, context, variables, refetchQueries, awaitRefetchQueries: true });
  if (errors) {
    console.log(errors);
    throw errors;
  }
  return data;
}