import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import makeReducers from './reducers'



const store = (initialState = {}) => {
  const middleware = [
    thunk,
  ];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      collapsed: true,
      duration: true,
    });

    middleware.push(logger);
  }

  const store = createStore(
    makeReducers(),
    applyMiddleware(...middleware)
  )

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;

      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store;
}

export default store
