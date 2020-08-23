import React from 'react';

import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';

const CartDropdown = ({ cartItems }) => {
  return(
    <div className="cart-dropdown">
      <div className="card-items">
        {
          cartItems.length
          ? cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
          : <span className="empty-message">Your cart is empty</span>
        }
      </div>
      <CustomButton>CHECK OUT NOW!</CustomButton>
    </div>
  );
};

// make sure that the cartDropdown component is not getting re-rendered whenever the state changes
// that's unrelated to the cart items
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);