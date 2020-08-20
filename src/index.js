import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// index.js file is where we're going to put the new component that we get from react-redux
// that will give our app access to not only the store but those reducers that we're going to also
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import App from './App';

ReactDOM.render(
  // <Provider/> is a component that will wrap the entire app (because everything inside to have access to this store obj we get from redux)
  // As a parent it allows us to get access to all of the things related to the store
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);