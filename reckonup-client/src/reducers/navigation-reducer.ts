import { NavigationAction, NavigationActionTypes } from "../actions/navigation-action"

export interface NavigationState {
  isBurgerActive: boolean;
}

const initialState: NavigationState = {
  isBurgerActive: false,
}

export const navigationReducer = (state: NavigationState = initialState, action: NavigationAction): NavigationState => {
  switch(action.type) {
    case NavigationActionTypes.toggleBurger: {
      return <NavigationState>{
        ...state,
        isBurgerActive: !state.isBurgerActive,
      }
    }
    default: {
      return state;
    }
  }
}