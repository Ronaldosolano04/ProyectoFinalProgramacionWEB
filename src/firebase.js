import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2NEAH5zwqXqCzEFacqXjwmouktDn_5wo",
  authDomain: "universidadmural.firebaseapp.com",
  projectId: "universidadmural",
  storageBucket: "universidadmural.firebasestorage.app",
  messagingSenderId: "646431661426",
  appId: "1:646431661426:web:2ce29b52f18620de7691eb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
