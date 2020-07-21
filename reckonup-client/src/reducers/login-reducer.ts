import { LoginAction, LoginActionTypes } from "../actions/login-action";
import { User } from "../models/login-model";

export interface LoginState {
  userID: string;
  password: string;
  rememberMe: boolean;
  jwtToken: string;
  isLoggedIn: boolean;
  loginErrorMessage: string;
  user: User;
}

const initialState: LoginState = {
  userID: "",
  password: "",
  rememberMe: false,
  jwtToken: "",
  isLoggedIn: false,
  loginErrorMessage: "",
  user: <User>{},
};

export const loginReducer = (
  state: LoginState = initialState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionTypes.setUserID: {
      return <LoginState>{
        ...state,
        userID: action.data,
      };
    }
    case LoginActionTypes.setPassword: {
      return <LoginState>{
        ...state,
        password: action.data,
      };
    }
    case LoginActionTypes.setRememberMe: {
      return <LoginState>{
        ...state,
        rememberMe: action.data,
      };
    }
    case LoginActionTypes.setJwtToken: {
      return <LoginState>{
        ...state,
        jwtToken: action.data,
      };
    }
    case LoginActionTypes.setIsLoggedIn: {
      return <LoginState>{
        ...state,
        isLoggedIn: action.data,
      };
    }
    case LoginActionTypes.setLoginErrorMessage: {
      return <LoginState>{
        ...state,
        loginErrorMessage: action.data,
      };
    }
    case LoginActionTypes.setUser: {
      return <LoginState>{
        ...state,
        user: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
