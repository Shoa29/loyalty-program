import firebase from 'firebase';

import 'firebase/auth';
import admin from 'firebase-admin'
import serviceAccount from './service_account.json'

  const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyDEvZwVOVRD_bDwVCSMPjTjM1-jsZ2F8_c",
    authDomain: "loyalty-app-cdb1c.firebaseapp.com",
    databaseURL: "https://loyalty-app-cdb1c.firebaseio.com",
    projectId: "loyalty-app-cdb1c",
    storageBucket: "loyalty-app-cdb1c.appspot.com",
    messagingSenderId: "623957646706",
    appId: "1:623957646706:web:f64a62d1698bda7e35d1eb",
    measurementId: "G-YT9ZVQEN5K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  
  export default firebase;
