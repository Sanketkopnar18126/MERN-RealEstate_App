// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
   authDomain: "mern-estate-74add.firebaseapp.com",
   projectId: "mern-estate-74add",
   storageBucket: "mern-estate-74add.appspot.com",
   messagingSenderId: "1008523139175",
   appId: "1:1008523139175:web:e5bf2fa9fbba96a63c5cc2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
