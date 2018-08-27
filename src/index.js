import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2rNrVTTYArdws11RFmkhjXMj4Mslq_gE",
    authDomain: "todolist-ba63f.firebaseapp.com",
    databaseURL: "https://todolist-ba63f.firebaseio.com",
    projectId: "todolist-ba63f",
    storageBucket: "",
    messagingSenderId: "927021932901"
  };
  firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));