import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import Navigation from "./navigation";
import "react-bulma/dist/main.css";
import { connect } from "react-redux";
import Test from "./test";
import { LocalizationProps } from "../common/i18n";
import { withTranslation } from "react-i18next";
import Login from "./login";
import { LoginState } from "../reducers/login-reducer";
import TravelExpense from "./travel-expense";

interface AppProps extends LocalizationProps {
  isLoggedIn?: boolean;
}

@(connect(
  (state: { loginReducer: LoginState }): AppProps => ({
    isLoggedIn: state.loginReducer.isLoggedIn,
  }),
  (dispatch) => ({})
) as any)
@(withTranslation() as any)
export default class App extends React.Component<AppProps> {
  render() {
    const { t, i18n } = this.props;
    if (!t || !i18n) {
      return "";
    }

    return (
      <div>
        <Navigation />
        {this.props.isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Test} />
            <Route path="/travel-expense" component={TravelExpense} />
          </Switch>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
