// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvho-095JnOAwTMCaQ8LxIROlpMCbAppw",
  authDomain: "blinkly-online-4169a.firebaseapp.com",
  projectId: "blinkly-online-4169a",
  storageBucket: "blinkly-online-4169a.firebasestorage.app",
  messagingSenderId: "1006187399372",
  appId: "1:1006187399372:web:0f4aafedfa74bcb2631a69",
  measurementId: "G-50JPVBRMR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);