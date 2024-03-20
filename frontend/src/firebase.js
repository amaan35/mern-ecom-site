// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fullstack-mern-ecomapp.firebaseapp.com",
  projectId: "fullstack-mern-ecomapp",
  storageBucket: "fullstack-mern-ecomapp.appspot.com",
  messagingSenderId: "878455066731",
  appId: "1:878455066731:web:2694564514d687bc5c612e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);