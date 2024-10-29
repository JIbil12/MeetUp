import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtm1EXHZiVbwi2IO8F41YweWm-4YEmDhg",
  authDomain: "meetup-25fdc.firebaseapp.com",
  projectId: "meetup-25fdc",
  storageBucket: "meetup-25fdc.appspot.com",
  messagingSenderId: "579616231328",
  appId: "1:579616231328:web:d449fbc011f65c2b359ec5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
