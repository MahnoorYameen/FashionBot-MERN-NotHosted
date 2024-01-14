import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKoBgMbexW_DbXCJn6Lr7dvCmaBk76FWo",
  authDomain: "fashionbot-6e023.firebaseapp.com",
  projectId: "fashionbot-6e023",
  storageBucket: "fashionbot-6e023.appspot.com",
  messagingSenderId: "929273385795",
  appId: "1:929273385795:web:ee21909d7853f85d0d95f6",
  measurementId: "G-S2L3BB91QB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app)






