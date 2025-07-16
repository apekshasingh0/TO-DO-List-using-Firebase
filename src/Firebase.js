// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7s3_aVVkO_AXwGFGII8wFHAXBQE1vykA",
  authDomain: "fir-crud-todo-6594d.firebaseapp.com",
  projectId: "fir-crud-todo-6594d",
  storageBucket: "fir-crud-todo-6594d.firebasestorage.app",
  messagingSenderId: "607356939497",
  appId: "1:607356939497:web:83a08c3f82c6b4f35fd478",
  measurementId: "G-EVL54YMH9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);