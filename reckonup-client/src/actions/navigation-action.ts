import { Action, ActionDispatcher } from ".";

export enum NavigationActionTypes {
  toggleBurger = "navigation-toggle-burger",
}

export interface NavigationAction extends Action<NavigationActionTypes> {
  data: any;
}

export class NavigationActionDispatcher extends ActionDispatcher<NavigationActionTypes> {
  toggleBurger = this.dispatcher((): NavigationAction => ({
    type: NavigationActionTypes.toggleBurger,
    data: null,
  }));
}