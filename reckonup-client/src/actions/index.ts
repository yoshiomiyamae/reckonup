import Redux from 'redux';

export interface Action<T> extends Redux.Action {
  type: T;
}

export interface ActionTypes {

}

export class ActionDispatcher<T> {
  constructor(protected dispatch: (action: Action<T>) => void) {}

  protected dispatcher = (func: Function) => (...args: any[]): Promise<any> => new Promise((resolve) => {
    this.dispatch(func(...args));
    resolve();
  });
}