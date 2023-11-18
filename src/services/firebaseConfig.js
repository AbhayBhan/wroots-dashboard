import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_vP8PQjWnPaSkuiABHmbuf9WQ7x3BUUc",
  authDomain: "wraeapp.firebaseapp.com",
  projectId: "wraeapp",
  storageBucket: "wraeapp.appspot.com",
  messagingSenderId: "892806202484",
  appId: "1:892806202484:web:bc042605a7185e336ffd21",
  measurementId: "G-39TEE55R7W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

export { app, auth };
