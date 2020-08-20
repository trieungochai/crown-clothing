import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // Redirect - don't want to still access the sign-in page if already signed in
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';

// receiving the currentUser value from our reducer
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  // We don't have to manually fetch every time we want to check if that stt changed.
  // this connection is always open as long as our React.Component{} is mounted on our job.
  // Because it's an subscription, we have to close subscriptions when this unmount because we don't want any memory leak in our JS app.
  unsubscribeFromAuth = null;

  // mount where used to firing a fetch to the BE to fetch data
  // Once the code calls fetch, it won't call fetch again until the componentDidMount() gets called again
  // But we don't want to remount our app, we just want to always know when firebase has realized that the authentication has changed.
  // (whenever user signs in/signs out, we want to be aware of that change without having to manually fetch)
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        // to check if our DB has updated
        const userRef = await createUserProfileDocument(userAuth);

        // the snapShot obj - where we're going to get the data related to this user that we possibly stored.
        // if it was a new authentication or the data related to the user that is already stored in our DB.
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div>
        <Header />
        {/* 'Switch' does not render anything else but that 'Route'.
            That's useful if we don't want to accidentally render multiple components.
            EX: the '/' has but 'Switch' will match '/' first and then it'll not render anything else later.      
        */}
        <Switch> 
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route
            exact
            path='/signin'
            // "render" is a JS in location that determines what component to return
            render={() =>
              this.props.currentUser
              ? <Redirect to='/' />
              : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

// component - the component we want to render
// path - will be a string that's equal to the path itself from the current place