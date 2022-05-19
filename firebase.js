import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCClnCHdHBDVD5frnfu7ukRVvZmRA9FdRM",
  authDomain: "whatsup-clone-dfd37.firebaseapp.com",
  projectId: "whatsup-clone-dfd37",
  storageBucket: "whatsup-clone-dfd37.appspot.com",
  messagingSenderId: "910382088451",
  appId: "1:910382088451:web:d165518abcaa9b3b272936",
  measurementId: "G-NKEC7Q39N6"
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db =getFirestore(app)
export const auth=getAuth()
export const googleAuthProvider = new GoogleAuthProvider();
