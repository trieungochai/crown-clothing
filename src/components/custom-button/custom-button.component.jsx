import React from 'react';

// import './custom-button.styles.scss';
import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, ...props }) => {
  return (
    <CustomButtonContainer {...props}>
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;

// for both btn and input
// can both take this props of type submit and can both submit the <FormInput />
// both trigger when clicked