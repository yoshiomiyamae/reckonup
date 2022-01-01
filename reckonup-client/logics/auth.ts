import axios from "axios";
import jwt from "jsonwebtoken";
import { Jwt, LoginResponse } from "../models/auth";

import { User, UserResponse } from "../models/system";
import { JwtData } from "../models/auth";
import { SERVER_SETTINGS } from "../common/config";


export const loginCheck = async (jwtToken: string, refreshToken: string) => {
  const jwtData = jwt.decode(jwtToken) as JwtData;
  if (!jwtData || jwtData.exp <= new Date().getTime() / 1000) {
    jwtToken = await jwtTokenRefresh(refreshToken);
  } else {
    axios.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
  }
  const { isLoggedIn, user, loginErrorMessage } = await checkAuthenticationInformation();
  return {
    isLoggedIn,
    jwtToken,
    user,
    loginErrorMessage,
  };
};

export const jwtTokenRefresh = async (refreshToken: string): Promise<string> => {
  const response = await axios.post<Jwt>(`${SERVER_SETTINGS.getUrl()}/api-auth/refresh/`, {
    refresh: refreshToken,
  });
  const jwtToken = response.data.access;
  axios.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
  return jwtToken;
};

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${SERVER_SETTINGS.getUrl()}/api-auth/`, {
      username: userName,
      password: password,
    });
    const jwtToken = response.data.access;
    const refreshToken = response.data.refresh;
    axios.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
    const { isLoggedIn, user, loginErrorMessage } = await checkAuthenticationInformation();
    return {
      isLoggedIn,
      jwtToken,
      refreshToken,
      user,
      loginErrorMessage,
    };
  } catch (e) {
    console.log(e);
    clearAuthenticationInformation();
    return {
      isLoggedIn: false,
      loginErrorMessage: e.message,
    };
  }
};

export const checkAuthenticationInformation = async (): Promise<LoginResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${SERVER_SETTINGS.getUrl()}/api/system/authentication_information`);
    return {
      isLoggedIn: true,
      user: User.fromUserResponse(response.data),
      loginErrorMessage: '',
    };
  }
  catch (e) {
    console.log(e);
    clearAuthenticationInformation();
    return {
      isLoggedIn: false,
      loginErrorMessage: e.message,
    };
  }
};
export const clearAuthenticationInformation = () => {
  delete axios.defaults.headers.common["Authorization"];
};