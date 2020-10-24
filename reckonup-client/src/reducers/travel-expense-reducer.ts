import {
  TravelExpenseAction,
  TravelExpenseActionTypes,
} from "../actions/travel-expense-action";
import { Mode } from "../models/travel-expense-model";

export interface TravelExpenseState {
  mode: Mode;
}

const initialState: TravelExpenseState = {
  mode: Mode.Main,
};

export const travelExpenseReducer = (
  state: TravelExpenseState = initialState,
  action: TravelExpenseAction
): TravelExpenseState => {
  switch (action.type) {
    case TravelExpenseActionTypes.setMode: {
      return <TravelExpenseState>{
        ...state,
        mode: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
