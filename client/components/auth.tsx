import { NextComponentType } from "next";
import { useEffect, useState } from "react";
import nookies from 'nookies';
import jwt from "jsonwebtoken";
import { useRefreshTokenMutation } from "../gql/mutations/system.generated";
import Loading from "./loading";
import { JwtData } from "../models";
import Login from "../pages/login";

interface AuthProps {
  children: React.ReactNode;
}

const Auth: NextComponentType<AuthProps> = ({ children }) => {
  const [refreshToken, { error: refreshTokenError, data: refreshTokenData, loading: refreshTokenLoading }] = useRefreshTokenMutation({});
  const [tokenIsValid, setTokenIsValid] = useState(false);
  const [isUserValidating, setIsUserValidating] = useState(true);

  useEffect(() => {
    const now = new Date().getTime() / 1000;
    const cookies = nookies.get(null);

    if (Number(cookies['tokenExpiredIn']) >= now) {
      console.log('token is valid');
      setTokenIsValid(true);
      return;
    }
    console.log('token is invalid');
    if (Number(cookies['refreshExpiresIn']) > now) {
      console.log('refresh token is valid');
      refreshToken({
        variables: {
          refreshToken: cookies['refreshToken']
        }
      });
      return;
    }
    console.log('refresh token is invalid');
  }, []);
  useEffect(() => {
    if (refreshTokenLoading) {
      return;
    }
    setIsUserValidating(false);
    if (refreshTokenError) {
      console.log(refreshTokenError);
      return;
    }
    if (refreshTokenData) {
      const jwtData = jwt.decode(refreshTokenData.refreshToken.token) as JwtData;
      nookies.set(null, 'token', refreshTokenData.refreshToken.token, { path: '/' });
      nookies.set(null, 'tokenExpiredIn', `${jwtData.exp}`, { path: '/' });
      nookies.set(null, 'refreshToken', `${refreshTokenData.refreshToken.refreshToken}`, { path: '/' });
      nookies.set(null, 'refreshExpiresIn', `${refreshTokenData.refreshToken.refreshExpiresIn}`, { path: '/' });
      setTokenIsValid(true);
    }
  }, [refreshTokenLoading]);

  return <>
    {refreshTokenLoading || isUserValidating
      ? <Loading />
      : tokenIsValid
        ? children
        : <Login />
    }
  </>
}

export default Auth;