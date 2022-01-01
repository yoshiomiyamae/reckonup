import axios, { AxiosResponse } from "axios";
import { SERVER_SETTINGS } from "../common/config";
import {
  Classification,
  ClassificationCollection,
  ClassificationResponse,
  ClassificationResponseCollection,
  Department,
  DepartmentCollection,
  DepartmentResponse,
  User,
  UserResponse
} from "../models/system";

export const getUser = async (id: number) => {
  try {
    const response = await axios.get<UserResponse>(
      `${SERVER_SETTINGS.getUrl()}/api/system/user/${id}/`
    );
    return User.fromUserResponse(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}

export const putUser = async (user: User) => {
  try {
    if (user.id) {
      await axios.put<any, AxiosResponse, UserResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/system/user/${user.id}/`,
        {
          id: user.id,
          is_active: user.isActive,
          username: user.userName,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
        });
    } else {
      await axios.post<any, AxiosResponse, UserResponse>(
        `${SERVER_SETTINGS.getUrl()}/api/system/user/`,
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

export const getClassifications = async () => {
  try {
    const response = await axios.get<ClassificationResponseCollection>(
      `${SERVER_SETTINGS.getUrl()}/api/system/classification/`
    );
    return ClassificationCollection.fromClassificationResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const getDepartments = async () => {
  try {
    const response = await axios.get<ClassificationResponseCollection>(
      `${SERVER_SETTINGS.getUrl()}/api/system/department/`
    );
    return DepartmentCollection.fromDepartmentResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};