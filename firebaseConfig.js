// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2mV1OStXvJPaGg1-3RRPEDUkawZJrJQI",
  authDomain: "shopping-list-aaf90.firebaseapp.com",
  projectId: "shopping-list-aaf90",
  storageBucket: "shopping-list-aaf90.appspot.com",
  messagingSenderId: "670404976206",
  appId: "1:670404976206:web:4d15f84324826068336d1f",
  measurementId: "G-L08FSV0RXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
