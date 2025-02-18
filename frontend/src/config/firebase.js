import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_SJhEYBTmkHXb6fzHZc3nwYaKSbMVrfA",
  authDomain: "blog-app-e2093.firebaseapp.com",
  projectId: "blog-app-e2093",
  storageBucket: "blog-app-e2093.appspot.com",
  messagingSenderId: "327230916193",
  appId: "1:327230916193:web:d41983ef43107b792fcc20",
  measurementId: "G-STKQ6XT9NV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;