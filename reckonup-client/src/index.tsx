import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import * as History from 'history';

import App from './containers/app';
import createStore from './common/create-store';

const history = History.createBrowserHistory();
const store = createStore(history);

import './initialize';

render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </Provider>,
  document.getElementById('main')
);