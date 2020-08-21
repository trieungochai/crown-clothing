import React from 'react';

import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = () => {
  return(
    <div className="cart-dropdown">
      <div className="card-items"/>
      <CustomButton>CHECK OUT NOW!</CustomButton>
    </div>
  );
};

export default CartDropdown;