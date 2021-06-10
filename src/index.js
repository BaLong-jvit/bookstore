import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import reportWebVitals from './reportWebVitals';
import Component from './components/Component';

// Store
import { applyMiddleware, createStore } from "redux";
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(myReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Component />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
