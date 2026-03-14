import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4xybvXH5fRibzv4ZebCpvUjZqEL7k3dY",
    authDomain: "hungrr-a4e97.firebaseapp.com",
    projectId: "hungrr-a4e97",
    storageBucket: "hungrr-a4e97.firebasestorage.app",
    messagingSenderId: "200801821958",
    appId: "1:200801821958:web:f33a1cebd01ec3ab6baa87",
    measurementId: "G-EL2T2G8H1J",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };