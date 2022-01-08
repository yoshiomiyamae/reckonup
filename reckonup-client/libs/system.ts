import axios, { AxiosResponse } from "axios";
import { SERVER_SETTINGS } from "../common/config";
import {
  CalendarCollection,
  CalendarResponseCollection,
  ChangePasswordResponse,
  ClassificationCollection,
  ClassificationResponseCollection,
  DepartmentCollection,
  DepartmentResponseCollection,
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
    const response = await axios.get<DepartmentResponseCollection>(
      `${SERVER_SETTINGS.getUrl()}/api/system/department/`
    );
    return DepartmentCollection.fromDepartmentResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
};

export const changePassword = async (newPassword: string) => {
  await axios.put<any, AxiosResponse, ChangePasswordResponse>(
    `${SERVER_SETTINGS.getUrl()}/api/system/change_password`,
    {
      new_password: newPassword
    });
}

export const getCalendar = async () => {
  try {
    const response = await axios.get<CalendarResponseCollection>(
      `${SERVER_SETTINGS.getUrl()}/api/system/calendar/`
    );
    return CalendarCollection.fromCalendarResponseCollection(response.data);
  }
  catch (e) {
    console.error(e.response.data.error);
  }
}