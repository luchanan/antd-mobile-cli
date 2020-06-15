import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import {default as routes} from '@/router/index'
// process.env.NODE_ENV === 'development'
ReactDOM.render(
  <React.StrictMode>
    <Router>{renderRoutes(routes)}</Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
