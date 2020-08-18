import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-n-sign-up/sign-in-n-sign-up.component';
import Header from './components/header/header.component';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  // We don't have to manually fetch every time we want to check if that stt changed.
  // this connection is always open as long as our React.Component{} is mounted on our job.
  // Because it's an subscription, we have to close subscriptions when this unmount because we don't want any memory leak in our JS app.
  unsubscribeFromAuth = null;

  // mount where used to firing a fetch to the BE to fetch data
  // Once the code calls fetch, it won't call fetch again until the componentDidMount() gets called again
  // But we don't want to remount our app, we just want to always know when firebase has realized that the authentication has changed.
  // (whenever user signs in/signs out, we want to be aware of that change without having to manually fetch)
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  };

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  };

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        {/* 'Switch' does not render anything else but that 'Route'.
            That's useful if we don't want to accidentally render multiple components.
            EX: the '/' has but 'Switch' will match '/' first and then it'll not render anything else later.      
        */}
        <Switch> 
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;

// component - the component we want to render
// path - will be a string that's equal to the path itself from the current place