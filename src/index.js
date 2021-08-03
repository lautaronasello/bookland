import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: 'AIzaSyA2AKPMO8Y4FeIYik_UD-kuvyY3diJ221w',
  authDomain: 'bookgrand.firebaseapp.com',
  projectId: 'bookgrand',
  storageBucket: 'bookgrand.appspot.com',
  messagingSenderId: '473405642470',
  appId: '1:473405642470:web:d7c24fb8216c8363360d27',
  measurementId: 'G-SDLNHH0NM5',
});

const db = firebase.firestore();
const fs = firebase;
var storage = firebase.storage();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
export { db, fs, storage };
