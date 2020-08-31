import { createStore, applyMiddleware } from 'redux';

// allows our browser to cache our store now depending on certain config options
// that we're going to set
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';
import logger from 'redux-logger';
// const middlewares = [logger];

// import thunk from 'redux-thunk';
// const middlewares = [thunk];

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistStore };