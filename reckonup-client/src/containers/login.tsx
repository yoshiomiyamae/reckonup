import React from "react";
import * as Bulma from "react-bulma";
import { LocalizationProps } from "../common/i18n";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { LoginState } from "../reducers/login-reducer";
import { LoginActionDispatcher } from "../actions/login-action";
import axios from "axios";
import { User } from "../models/login-model";

interface LoginProps extends LocalizationProps {
  userID?: string;
  password?: string;
  rememberMe?: boolean;
  jwtToken?: string;
  loginErrorMessage?: string;

  actions?: LoginActionDispatcher;
}

@(connect(
  (state: { loginReducer: LoginState }): LoginProps => ({
    ...state.loginReducer,
  }),
  (dispatch) => ({ actions: new LoginActionDispatcher(dispatch) })
) as any)
@(withTranslation() as any)
export default class Login extends React.Component<LoginProps> {
  login = () => {
    axios
      .post("api-auth/", {
        username: this.props.userID,
        password: this.props.password,
      })
      .then((response) => {
        this.props.actions?.setJwtToken(response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `JWT ${response.data.token}`;
        this.props.actions?.setLoginErrorMessage("");
        this.props.actions?.setIsLoggedIn(true);
        axios.get("api/system/authentication_information").then((response2) => {
          this.props.actions?.setUser({
            id: response2.data.id,
            isActive: response2.data.is_active,
            lastLogin: response2.data.last_login,
            userName: response2.data.username,
            firstName: response2.data.first_name,
            lastName: response2.data.last_name,
            email: response2.data.email,
          } as User);
        });
      })
      .catch((reason: Error) => {
        delete axios.defaults.headers.common["Authorization"];
        this.props.actions?.setLoginErrorMessage(reason.message);
        this.props.actions?.setIsLoggedIn(false);
      });
  };
  render() {
    const { t, i18n } = this.props;
    if (!t || !i18n) {
      return "";
    }

    return (
      <Bulma.Container>
        <Bulma.Card>
          <Bulma.CardHeader>
            <Bulma.CardHeaderTitle>Login</Bulma.CardHeaderTitle>
          </Bulma.CardHeader>
          <Bulma.CardContent>
            <Bulma.Content>
              <Bulma.Field>
                <Bulma.Control>
                  <Bulma.Input
                    placeholder={t("User ID")}
                    onInput={(e) =>
                      this.props.actions?.setUserID(e.currentTarget.value)
                    }
                    value={this.props.userID}
                  />
                </Bulma.Control>
                <Bulma.Control>
                  <Bulma.Input
                    placeholder={t("Password")}
                    onInput={(e) =>
                      this.props.actions?.setPassword(e.currentTarget.value)
                    }
                    value={this.props.password}
                  />
                </Bulma.Control>
                <Bulma.Control>
                  <Bulma.Label>
                    <Bulma.CheckBox
                      onChange={(e) =>
                        this.props.actions?.setRememberMe(
                          e.currentTarget.checked
                        )
                      }
                      checked={this.props.rememberMe}
                    />
                    {t("Remember me")}
                  </Bulma.Label>
                </Bulma.Control>
              </Bulma.Field>
              {this.props.loginErrorMessage ? (
                <Bulma.Notification options={[Bulma.Color.Danger]}>
                  {t(this.props.loginErrorMessage)}
                </Bulma.Notification>
              ) : null}
            </Bulma.Content>
          </Bulma.CardContent>
          <Bulma.CardFooter>
            <Bulma.CardFooterItem itemType={Bulma.CardFooterItemType.Paragraph}>
              <Bulma.Button
                buttonType={Bulma.ButtonType.Button}
                options={[Bulma.Color.Primary]}
                onClick={() => this.login()}
              >
                {t("Login")}
              </Bulma.Button>
            </Bulma.CardFooterItem>
          </Bulma.CardFooter>
        </Bulma.Card>
      </Bulma.Container>
    );
  }
}
