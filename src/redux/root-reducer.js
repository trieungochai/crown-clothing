// base reducer obj that represents all of the state of our app (combines all of our other states together).
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
// what we'll here is the actual local storage obj on our window browser.
// this is telling a redux-persist that we want to use local storage as our default storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

// define new persist config
// JSON obj that represents the possible configurations that we want for redux-persist to use
const persistConfig = {
  key: 'root',
  storage,
  // is an arr containing the string names of any of the reducer that we want to store.
  // 'user' is being handled by firebase authentication (so there's no reason to persist this).
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);