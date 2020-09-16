import { combineReducers } from 'redux-immer';
import { connectRouter } from 'connected-react-router';
import produce from 'immer';
import history from 'utils/history';

export default (injectedReducers = {}) =>
  combineReducers(produce, {
    router: connectRouter(history),
    ...injectedReducers,
  });
