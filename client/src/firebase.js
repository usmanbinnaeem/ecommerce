import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDmG6Kc3P6YJg9CyEnGJy6pEXPBJFSzVUU",
    authDomain: "ecommerce-5e08d.firebaseapp.com",
    projectId: "ecommerce-5e08d",
    storageBucket: "ecommerce-5e08d.appspot.com",
    messagingSenderId: "286138753192",
    appId: "1:286138753192:web:1025e517d074ef08eea29d"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }


export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();