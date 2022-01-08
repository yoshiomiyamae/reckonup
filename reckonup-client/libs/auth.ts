import axios, { AxiosResponse } from "axios";
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
  const { isLoggedIn, user, loginErrorMessage } = await checkLoginUser();
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
    const { isLoggedIn, user, loginErrorMessage } = await checkLoginUser();
    return {
      isLoggedIn,
      jwtToken,
      refreshToken,
      user,
      loginErrorMessage,
    };
  } catch (e) {
    console.log(e);
    clearLoginUser();
    return {
      isLoggedIn: false,
      loginErrorMessage: e.message,
    };
  }
};

export const checkLoginUser = async (): Promise<LoginResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${SERVER_SETTINGS.getUrl()}/api/system/login_user`);
    return {
      isLoggedIn: true,
      user: User.fromUserResponse(response.data),
      loginErrorMessage: '',
    };
  }
  catch (e) {
    console.log(e);
    clearLoginUser();
    return {
      isLoggedIn: false,
      loginErrorMessage: e.message,
    };
  }
};
export const clearLoginUser = () => {
  delete axios.defaults.headers.common["Authorization"];
};

export const updateLoginUser = async (user: User) => {
  try {
    if (user.id) {
      await axios.put<any, AxiosResponse, UserResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/system/login_user`,
        {
          id: user.id,
          is_active: user.isActive,
          username: user.userName,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          classification_id: user.classificationId,
          department_id: user.departmentId,
        });
    } else {
      await axios.post<any, AxiosResponse, UserResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/system/login_user`,
        {
          is_active: user.isActive,
          username: user.userName,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        });
    }
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}