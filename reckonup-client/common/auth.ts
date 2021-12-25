import axios from "axios";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { SERVER_SETTINGS } from "./config";


export interface LoginResponse {
  isLoggedIn: boolean;
  jwtToken?: string;
  refreshToken?: string;
  user?: User;
  loginErrorMessage?: string;
}

export interface JwtTokenRefreshResponse {
  jwtToken?: string;
}

interface JwtData {
  exp: number;
  iat: number;
  jti: string;
  token_type: 'access' | 'refresh';
  user_id: number;
}

export const loginCheck = async (jwtToken: string, refreshToken: string) => {
  const jwtData = jwt.decode(jwtToken) as JwtData;
  if (jwtData.exp <= new Date().getTime() / 1000) {
    await jwtTokenRefresh(refreshToken);
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

export const jwtTokenRefresh = async (refreshToken: string): Promise<JwtTokenRefreshResponse> => {
  const response = await axios.post(`${SERVER_SETTINGS.getUrl()}/api-auth/refresh/`, {
    refresh: refreshToken,
  });
  const jwtToken = response.data.access;
  axios.defaults.headers.common.Authorization = `JWT ${jwtToken}`;
  return {
    jwtToken,
  };
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
    const response = await axios.get(`${SERVER_SETTINGS.getUrl()}/api/system/authentication_information`);
    return {
      isLoggedIn: true,
      user: {
        id: response.data.id,
        isActive: response.data.is_active,
        lastLogin: response.data.last_login,
        userName: response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
      },
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