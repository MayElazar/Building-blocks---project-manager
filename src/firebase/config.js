import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbF-ChuZRfwFYaKZV3oiXvSp82K7BzMfU",
  authDomain: "project-manager-3586e.firebaseapp.com",
  projectId: "project-manager-3586e",
  storageBucket: "project-manager-3586e.appspot.com",
  messagingSenderId: "590061125071",
  appId: "1:590061125071:web:ad0d8ab978d2eedab5e6ba",
  measurementId: "G-D34H50CB58",
};
//init firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//init firestore
const db = getFirestore();

//init storage
const storage = getStorage();
//init auth
const auth = getAuth();

export { app, db, auth, storage };
