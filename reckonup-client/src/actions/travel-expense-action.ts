import { Action, ActionDispatcher } from ".";
import { Mode } from "../models/travel-expense-model";

export enum TravelExpenseActionTypes {
  setMode = "travel-expense-set-mode",
}

export interface TravelExpenseAction extends Action<TravelExpenseActionTypes> {
  data: any;
}

export class TravelExpenseActionDispatcher extends ActionDispatcher<
  TravelExpenseActionTypes
> {
  setMode = this.dispatcher(
    (mode: Mode): TravelExpenseAction => ({
      type: TravelExpenseActionTypes.setMode,
      data: mode,
    })
  );
}
