import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librarie
const firebaseConfig = {
  apiKey: "AIzaSyDv31ZxHk3Tc2y9ZaByA3vGwGmhxonL6GU",
  authDomain: "onepiece-bf5b7.firebaseapp.com",
  projectId: "onepiece-bf5b7",
  storageBucket: "onepiece-bf5b7.firebasestorage.app",
  messagingSenderId: "1048582825918",
  appId: "1:1048582825918:web:d45e618d2684a074d47bef",
  measurementId: "G-PY4L9CSRFF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
