import { Action, ActionDispatcher } from ".";
import { User } from "../models/login-model";

export enum LoginActionTypes {
  setUserID = "login-set-user-id",
  setPassword = "login-set-password",
  setRememberMe = "login-set-remember-me",
  setJwtToken = "login-set-jwt-token",
  setIsLoggedIn = "login-set-is-logged-in",
  setLoginErrorMessage = "login-set-login-error-message",
  setUser = "login-set-user",
  setIsLoginChecked = "login-set-is-login-checked",
}

export interface LoginAction extends Action<LoginActionTypes> {
  data: any;
}

export class LoginActionDispatcher extends ActionDispatcher<LoginActionTypes> {
  setUserID = this.dispatcher(
    (userID: string): LoginAction => ({
      type: LoginActionTypes.setUserID,
      data: userID,
    })
  );
  setPassword = this.dispatcher(
    (password: string): LoginAction => ({
      type: LoginActionTypes.setPassword,
      data: password,
    })
  );
  setRememberMe = this.dispatcher(
    (rememberMe: boolean): LoginAction => ({
      type: LoginActionTypes.setRememberMe,
      data: rememberMe,
    })
  );
  setJwtToken = this.dispatcher(
    (jwtToken: string): LoginAction => ({
      type: LoginActionTypes.setJwtToken,
      data: jwtToken,
    })
  );
  setIsLoggedIn = this.dispatcher(
    (isLoggedIn: boolean): LoginAction => ({
      type: LoginActionTypes.setIsLoggedIn,
      data: isLoggedIn,
    })
  );
  setLoginErrorMessage = this.dispatcher(
    (loginErrorMessage: string): LoginAction => ({
      type: LoginActionTypes.setLoginErrorMessage,
      data: loginErrorMessage,
    })
  );
  setUser = this.dispatcher(
    (user: User): LoginAction => ({
      type: LoginActionTypes.setUser,
      data: user,
    })
  );
  setIsLoginChecked = this.dispatcher(
    (isLoginChecked: boolean): LoginAction => ({
      type: LoginActionTypes.setIsLoginChecked,
      data: isLoginChecked,
    })
  );
}
