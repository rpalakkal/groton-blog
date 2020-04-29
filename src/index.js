import React from 'react';
import ReactDOM from 'react-dom';
import "typeface-roboto";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Cookies from 'js-cookie';
let auth = Cookies.get('auth')

if(auth){
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}else{
  window.location="http://groton2021.com"
  //console.log(Cookies.get())
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
