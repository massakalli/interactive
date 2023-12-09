import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnRa-AGcvHgtPA-XVsOkFU_CEvrAVPIsg",
  authDomain: "portfolio-e2e40.firebaseapp.com",
  databaseURL: "https://portfolio-e2e40-default-rtdb.firebaseio.com",
  projectId: "portfolio-e2e40",
  storageBucket: "portfolio-e2e40.appspot.com",
  messagingSenderId: "499968749617",
  appId: "1:499968749617:web:65f5969785ac190098e510",
  measurementId: "G-EVR4L5PB2L"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export const files = getStorage(firebaseapp);
export const clientDb = getFirestore(firebaseapp);

