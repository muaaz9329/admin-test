// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getEnvVar } from "../utils";

const firebaseConfig = {
  apiKey: getEnvVar("FIREBASE_API_KEY"),
  authDomain: getEnvVar("FIREBASE_AUTH_DOMAIN"),
  projectId: getEnvVar("FIREBASE_PROJECT_ID"),
  storageBucket: getEnvVar("FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getEnvVar("FIREBASE_MESSAGING_SENDER_ID"),
  appId: getEnvVar("FIREBASE_APP_ID"),
  measurementId: getEnvVar("FIREBASE_MEASUREMENT_ID"),
};

// Initialize Firebase
const fireApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const fireAnalytics = getAnalytics(fireApp);

const fireAuth = getAuth(fireApp);
const firestore = getFirestore(fireApp);

export { fireAuth, firestore, fireApp, fireAnalytics };
