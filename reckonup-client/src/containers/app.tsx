import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import Navigation from './navigation';
import 'react-bulma/dist/main.css';
import { connect } from 'react-redux';
import Test from './test';
import { LocalizationProps } from '../common/i18n';
import { withTranslation } from 'react-i18next';

interface AppProps extends LocalizationProps {

}

@(connect((state) => ({

}),{

}) as any)
@(withTranslation() as any)
export default class App extends React.Component<AppProps> {
  render(){
    const {t, i18n} = this.props;
    if(!t || !i18n){
      return '';
    }
    
    return <div>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <div>
            <a href="/test">test</a>
          </div>
        </Route>
        <Route path="/test" component={Test} />
      </Switch>
    </div>;
  }
}