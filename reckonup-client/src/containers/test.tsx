import React from 'react';
import * as Bulma from 'react-bulma';
import { LocalizationProps } from '../common/i18n';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

interface TestProps extends LocalizationProps {

}

@(connect((state) => ({

}),{

}) as any)
@(withTranslation() as any)
export default class Test extends React.Component<TestProps> {
  render(){
    const {t, i18n} = this.props;
    if(!t || !i18n){
      return '';
    }
    
    return <div>
      <Bulma.Button buttonType={Bulma.ButtonType.Button} onClick={()=>i18n.changeLanguage('ja')}>{t('Japanese')}</Bulma.Button>
      <Bulma.Button buttonType={Bulma.ButtonType.Button} onClick={()=>i18n.changeLanguage('en')}>{t('English')}</Bulma.Button>
    </div>
  }
}