import React from "react";
import * as Bulma from "react-bulma";
import { LocalizationProps } from "../common/i18n";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { TravelExpenseActionDispatcher } from "../actions/travel-expense-action";
import { TravelExpenseState } from "../reducers/travel-expense-reducer";
import { Mode } from "../models/travel-expense-model";

interface TravelExpenseProps extends LocalizationProps {
  mode?: Mode;

  actions?: TravelExpenseActionDispatcher;
}

@(connect(
  (state: {
    travelExpenseReducer: TravelExpenseState;
  }): TravelExpenseProps => ({
    ...state.travelExpenseReducer,
  }),
  (dispatch) => ({ actions: new TravelExpenseActionDispatcher(dispatch) })
) as any)
@(withTranslation() as any)
export default class TravelExpense extends React.Component<TravelExpenseProps> {
  render() {
    const { t, i18n } = this.props;
    if (!t || !i18n) {
      return "";
    }

    return (
      <Bulma.Container>
        <Bulma.Columns>
          <Bulma.Column options={[Bulma.ColumnSize.Two]}>
            <Bulma.Menu>
              <Bulma.MenuLabel>{t("General")}</Bulma.MenuLabel>
              <Bulma.MenuList>
                <Bulma.MenuItem>
                  <a className={Bulma.State.Active}>{t("History")}</a>
                </Bulma.MenuItem>
                <Bulma.MenuItem>
                  <a>{t("New")}</a>
                </Bulma.MenuItem>
              </Bulma.MenuList>
            </Bulma.Menu>
          </Bulma.Column>
          <Bulma.Column options={[Bulma.ColumnSize.Ten]}>
            <Bulma.Table>
              <Bulma.TableHeader>
                <Bulma.TableHeaderCell>ID</Bulma.TableHeaderCell>
                <Bulma.TableHeaderCell>TEST</Bulma.TableHeaderCell>
              </Bulma.TableHeader>
              <Bulma.TableBody>
                <Bulma.TableRow>
                  <Bulma.TableHeaderCell>1</Bulma.TableHeaderCell>
                  <Bulma.TableCell>TEST</Bulma.TableCell>
                </Bulma.TableRow>
              </Bulma.TableBody>
            </Bulma.Table>
          </Bulma.Column>
        </Bulma.Columns>
      </Bulma.Container>
    );
  }
}
