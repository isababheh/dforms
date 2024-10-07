// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc , doc, deleteDoc, setDoc, updateDoc} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPqSCQvRxKnsFsMf_fHx6tZ3Jc902Hy8M",
  authDomain: "formbuilder-e4255.firebaseapp.com",
  projectId: "formbuilder-e4255",
  storageBucket: "formbuilder-e4255.appspot.com",
  messagingSenderId: "106432306261",
  appId: "1:106432306261:web:f2761c6f0d7f038061c8dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, getDoc, doc , deleteDoc, setDoc, updateDoc};

