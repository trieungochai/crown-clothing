import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrappedComponent => {
  const Spinner = ({ isLoading, ...otherProps }) => {
  return isLoading
      ? 
        <SpinnerOverlay>
          <SpinnerContainer />
        </SpinnerOverlay>
      // this way we pass through the props to the component we wrap
      : <WrappedComponent {...otherProps}/>
  };

  return Spinner;
};

export default WithSpinner;