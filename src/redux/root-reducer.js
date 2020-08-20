// base reducer obj that represents all of the state of our app (combines all of our other states together).
import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer
});