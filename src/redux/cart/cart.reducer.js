import CartActionTypes from './cart.types';

const INITIAL_STATE = {
  // to hide the dropdown when they first comes to our Web
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    default:
      return state;
  };
};

export default cartReducer;