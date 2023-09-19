import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB15nv_Q3fUzhktogBjHZuZtk3an5fPPi8",
    authDomain: "expense-tracker-78364.firebaseapp.com",
    projectId: "expense-tracker-78364",
    storageBucket: "expense-tracker-78364.appspot.com",
    messagingSenderId: "5496333250",
    appId: "1:5496333250:web:8a80f1eb188ebde2526c5b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
