import { createStore, applyMiddleware } from 'redux';
// catches the action it & console log it for us
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;