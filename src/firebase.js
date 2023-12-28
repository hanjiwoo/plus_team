// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrJ4X77pDXNyuQEYp1TDDOdLVwma2-qw0",
  authDomain: "plus-team-2e449.firebaseapp.com",
  projectId: "plus-team-2e449",
  storageBucket: "plus-team-2e449.appspot.com",
  messagingSenderId: "833251976403",
  appId: "1:833251976403:web:9230070b9573adf790e026"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);