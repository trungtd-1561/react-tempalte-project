import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { merge } from 'lodash/fp';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from 'reducers';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    // eslint-disable-next-line no-underscore-dangle
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      // eslint-disable-next-line no-underscore-dangle
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  if (window.Environment === 'local') {
    middlewares.push(logger);
  }
  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  const configuredStore = merge(store, {
    runSaga: sagaMiddleware.run,
    injectedReducers: {},
    injectedSagas: {},
  });

  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return configuredStore;
}
