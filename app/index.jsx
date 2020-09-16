import '@babel/polyfill';

import 'intl';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';
import 'utils/buildVars';
import 'utils/fontFaceObserver';
import 'utils/offlinePlugin';
import 'App.css';
import App from 'containers/App';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!file-loader?name=[name].[ext]!./images/favicon.ico';

import store from 'store';

(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    window.document.getElementById('app'),
  );
})();
