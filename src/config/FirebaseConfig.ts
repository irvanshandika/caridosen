import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXQQh0iNsBoeqYHKovN4vGjHL1S4Vqk2k",
  authDomain: "caridosen-f6b46.firebaseapp.com",
  projectId: "caridosen-f6b46",
  storageBucket: "caridosen-f6b46.appspot.com",
  messagingSenderId: "790104182466",
  appId: "1:790104182466:web:c0933a29b668905238755b",
  measurementId: "G-0ERRFS2ZC9",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };
