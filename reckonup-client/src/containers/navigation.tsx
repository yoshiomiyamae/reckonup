import React from "react";
import * as Bulma from "react-bulma";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { LocalizationProps } from "../common/i18n";
import { NavigationState } from "../reducers/navigation-reducer";
import { NavigationActionDispatcher } from "../actions/navigation-action";
import { Dispatch } from "redux";
import crypto from "crypto";

import { ReckonupLogo } from "../image";
import { LoginState } from "../reducers/login-reducer";
import { User } from "../models/login-model";

const md5 = (data: string | undefined) =>
  data && crypto.createHash("md5").update(data, "utf8").digest("hex");

interface NavigationProps extends LocalizationProps {
  isBurgerActive?: boolean;
  isLoggedIn?: boolean;
  user?: User;

  actions?: NavigationActionDispatcher;
}

@(connect(
  (state: {
    navigationReducer: NavigationState;
    loginReducer: LoginState;
  }): NavigationProps => ({
    ...state.navigationReducer,
    isLoggedIn: state.loginReducer.isLoggedIn,
    user: state.loginReducer.user,
  }),
  (dispatch) => ({ actions: new NavigationActionDispatcher(dispatch) })
) as any)
@(withTranslation() as any)
export default class Navigation extends React.Component<NavigationProps> {
  render() {
    const { t, i18n } = this.props;
    if (!t || !i18n) {
      return "";
    }

    return (
      <Bulma.Navbar
        navbarType={Bulma.NavbarType.Nav}
        options={[Bulma.Color.Light]}
      >
        <Bulma.NavbarBrand>
          <Bulma.NavbarItem itemType={Bulma.NavbarItemType.Anchor}>
            <ReckonupLogo height={34} style={{ maxHeight: "34px" }} />
          </Bulma.NavbarItem>
          <Bulma.NavbarBurger
            onClick={() => this.props.actions?.toggleBurger()}
            options={[this.props.isBurgerActive ? Bulma.State.Active : null]}
          />
        </Bulma.NavbarBrand>
        <Bulma.NavbarMenu
          options={[this.props.isBurgerActive ? Bulma.State.Active : null]}
        >
          {this.props.isLoggedIn
            ? [
                <Bulma.NavbarStart>
                  <Bulma.NavbarItem itemType={Bulma.NavbarItemType.Anchor}>
                    <a href="/">{t("test")}</a>
                  </Bulma.NavbarItem>
                </Bulma.NavbarStart>,
                <Bulma.NavbarEnd>
                  <Bulma.NavbarItem
                    itemType={Bulma.NavbarItemType.Anchor}
                    options={[Bulma.NavbarItemOption.DropDown]}
                  >
                    <Bulma.NavbarLink>
                      <img
                        src={`https://www.gravatar.com/avatar/${md5(
                          this.props.user?.email
                        )}?r=pg`}
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                        }}
                      />
                      {this.props.user?.firstName}
                      {this.props.user?.lastName}
                    </Bulma.NavbarLink>
                    <Bulma.NavbarDropDown></Bulma.NavbarDropDown>
                  </Bulma.NavbarItem>
                </Bulma.NavbarEnd>,
              ]
            : null}
        </Bulma.NavbarMenu>
      </Bulma.Navbar>
    );
  }
}
