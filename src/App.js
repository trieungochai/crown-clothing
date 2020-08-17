import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

function App() {
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
      </Switch>
    </div>
  );
}

export default App;

// component - the component we want to render
// path - will be a string that's equal to the path itself from the current place