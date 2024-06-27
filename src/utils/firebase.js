// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFByZEJzljyJBSY_ZGFPOSIERd4UaXF8g",
  authDomain: "say-bingo.firebaseapp.com",
  projectId: "say-bingo",
  databaseURL: "https://say-bingo-default-rtdb.firebaseio.com",
  storageBucket: "say-bingo.appspot.com",
  messagingSenderId: "690097997910",
  appId: "1:690097997910:web:a452d7f13dd0343e7993f7",
  measurementId: "G-14P18NBN46",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
