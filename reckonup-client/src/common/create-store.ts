import * as Redux from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import { BrowserHistory } from 'history';

import reducers from '../reducers';

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof Redux.compose;
}
declare var window: ExtendedWindow;

const composeReduxDevToolsEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

export const createStore = (history: BrowserHistory) => Redux.createStore(
  Redux.combineReducers({
    ...reducers,
    router: connectRouter(history),
  }),
  composeReduxDevToolsEnhancers(Redux.applyMiddleware(
    logger,
    thunk,
    routerMiddleware(history)
  ))
);

export default createStore;