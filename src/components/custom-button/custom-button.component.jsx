import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => {
  return (
    // if we have a type submit (...otherProps) being passed into 'Custom Button', the btn will get that */}
    <button 
      className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;

// for both btn and input
// can both take this props of type submit and can both submit the <FormInput />
// both trigger when clicked