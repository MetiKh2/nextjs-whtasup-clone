import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {

};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db =getFirestore(app)
export const auth=getAuth()
export const googleAuthProvider = new GoogleAuthProvider();
