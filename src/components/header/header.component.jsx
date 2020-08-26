import React from 'react';
// connect is a higher order component that lets us modify our component to have access to things related to redux
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

// import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

import { ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to='/' >
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to ='/shop'>CONTACT</OptionLink>
        {
          currentUser
            ? (<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>)
            : (<OptionLink to='/signin'>SIGN IN</OptionLink>)
        }
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown/>}
    </HeaderContainer>
  );
};

// this state obj is the root reducer
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });

// createStructuredSelector() will automatically pass are top level state
// that we get as our map states props into each subsequent selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

// higher components are functions that take components as arguments and then return a new souped-up component
// what we'll do with connect() is going to pass it 2 functions
// the 1st - going to be the func that allows us to access the states (with the state being are root reducer to be specific)
// the 2nd - optional (dispatch)
export default connect(mapStateToProps)(Header);