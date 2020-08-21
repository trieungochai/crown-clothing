import React from 'react';
// connect is a higher order component that lets us modify our component to have access to things related to redux
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

import './header.styles.scss';
import { ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

const Header = ({ currentUser, hidden }) => {
  return (
    <div className='header'>
      <Link className='logo-container' to='/' >
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>SHOP</Link>
        <Link className='option' to ='/shop'>CONTACT</Link>
        {
          currentUser
          ? (<div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>)
          : (<Link className="option" to='/signin'>SIGN IN</Link>)
        }
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown/>}
    </div>
  );
}

// this state obj is the root reducer
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden
});

// higher components are functions that take components as arguments and then return a new souped-up component
// what we'll do with connect() is going to pass it 2 functions
// the 1st - going to be the func that allows us to access the states (with the state being are root reducer to be specific)
// the 2nd - optional (dispatch)
export default connect(mapStateToProps)(Header);