// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUw9V9FujBUTxDkxk-jyj4P_rpWK1ns7k",
  authDomain: "my-app-b-a.firebaseapp.com",
  projectId: "my-app-b-a",
 // storageBucket: "my-app-b-a.firebasestorage.app",
  storageBucket: "my-app-b-a.appspot.com",
  messagingSenderId: "481069643810",
  //measurementId: "G-EC51K2XY3N",
  appId: "1:481069643810:web:36b29338be71df4a93727b",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
