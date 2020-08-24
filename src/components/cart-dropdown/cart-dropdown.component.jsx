import React from 'react';

import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

import { withRouter } from 'react-router-dom';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ cartItems, history, dispatch }) => {
  return(
    <div className="cart-dropdown">
      <div className="card-items">
        {
          cartItems.length
          ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
          : <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden())
        }}
      >CHECK OUT NOW!</CustomButton>
    </div>
  );
};

// make sure that the cartDropdown component is not getting re-rendered whenever the state changes
// that's unrelated to the cart items
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

// connect() will pass the dispatch into our components as a props
// if we don't supply the 2nd arg to connect
// (if we don't supply maDispatchToProps as the 2nd param)
// 27. Dispatch Action Shorthand
export default withRouter(connect(mapStateToProps)(CartDropdown));