import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjEZ4PszfObtU_LlQ-nNu9IAH7I_OSeUg",
  authDomain: "crud-s.firebaseapp.com",
  projectId: "crud-s",
  storageBucket: "crud-s.appspot.com",
  messagingSenderId: "344213799080",
  appId: "1:344213799080:web:1740ff40f4e2c6d734429d"
};




const app = initializeApp(firebaseConfig);
export const Googleprovider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app); 