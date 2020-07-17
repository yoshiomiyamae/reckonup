import React from 'react';
import * as Bulma from 'react-bulma';
import {withTranslation} from 'react-i18next';
import { connect } from 'react-redux';
import { LocalizationProps } from '../common/i18n';
import { NavigationState } from '../reducers/navigation-reducer';
import { NavigationActionDispatcher } from '../actions/navigation-action';
import { Dispatch } from 'redux';

interface NavigationProps extends LocalizationProps {
  isBurgerActive?: boolean;
  actions?: NavigationActionDispatcher;
}

@(connect(
  (state: {navigationReducer: NavigationState}): NavigationProps => ({
    isBurgerActive: state.navigationReducer.isBurgerActive
  }),
  (dispatch) => ({actions: new NavigationActionDispatcher(dispatch)})
) as any)
@(withTranslation() as any)
export default class Navigation extends React.Component<NavigationProps> {
  render(){
    const {t, i18n} = this.props;
    if(!t || !i18n){
      return '';
    }

    return <Bulma.Navbar navbarType={Bulma.NavbarType.Nav} options={[Bulma.Color.Light]}>
      <Bulma.NavbarBrand>
        <Bulma.NavbarItem itemType={Bulma.NavbarItemType.Anchor}>
          <img src="/static/image/reckonup-logo.png" style={{height: '34px', maxHeight: '34px'}}/>
        </Bulma.NavbarItem>
        <Bulma.NavbarBurger onClick={()=>this.props.actions?.toggleBurger()} options={[this.props.isBurgerActive?Bulma.State.Active:null]} />
      </Bulma.NavbarBrand>
      <Bulma.NavbarMenu options={[this.props.isBurgerActive?Bulma.State.Active:null]}>
        <Bulma.NavbarStart>
          <Bulma.NavbarItem itemType={Bulma.NavbarItemType.Anchor}>
            <a href="/" >{t('test')}</a>
          </Bulma.NavbarItem>
        </Bulma.NavbarStart>
      </Bulma.NavbarMenu>
    </Bulma.Navbar>;
  }
}