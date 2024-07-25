// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCIplazK0pmvJtkYd6DKBoYb5PuYUH3Bxo",

  authDomain: "crop-recommendation-01301.firebaseapp.com",

  projectId: "crop-recommendation-01301",

  storageBucket: "crop-recommendation-01301.appspot.com",

  messagingSenderId: "603135870716",

  appId: "1:603135870716:web:31d9a483ea0fb6d7237979",
};

// Initialize Firebase
//it config between ui and backend firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

//create auth instance
//it communicate with firebase
//auth it keeps track of authentication of entire app
export const auth = getAuth();

//creating popup with google provider
//auth is to authentication it check whether the auth_token is valid or not
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

////////////////////////////////////////////////////////////////
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      //it sets data in doc at particular ref setDoc(ref,{})
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("some error occured", error.message);
    }
  }
  return userSnapshot;
};

//////////////////////////////////////////////////////
//signup using email And password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

//////////////////////////////////////////////////////
//signIn using email And password
export const authSignInWithEmailAndPassword = async (email, password) => {
  if (!email && !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};
////////////////////////////////////////////
export const userSignOut = async () => signOut(auth);

//onAuthStateChangedListener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);