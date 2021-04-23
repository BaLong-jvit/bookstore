import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import reportWebVitals from './reportWebVitals';
import Component from './components/Component';

ReactDOM.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
