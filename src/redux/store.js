import { createStore, applyMiddleware } from 'redux';
// catches the action it & console log it for us
import logger from 'redux-logger';
// all thunk is a piece of middleware that allows us fire functions
import thunk from 'redux-thunk';

// allows our browser to cache our store now depending on certain config options
// that we're going to set
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

// const middlewares = [logger];
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };