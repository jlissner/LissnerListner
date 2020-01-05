import { combineReducers } from 'redux';
import globalState from '../globalState';

const reducers = (asyncReducers) => combineReducers({
  ...globalState,
  ...asyncReducers,
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) { return; }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(reducers(store.asyncReducers));
}

export default reducers