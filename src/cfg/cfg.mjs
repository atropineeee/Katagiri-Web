import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, query as rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getFirestore, collection, where, query as fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

let app, db, rtdb, auth; 

async function loadConfig() {
    const response = await fetch('/private/clip.json'); 
    const config = await response.json();
    
    const firebaseConfig = {
        apiKey: config.FIREBASE_API_KEY,
        authDomain: config.FIREBASE_AUTH_DOMAIN,
        projectId: config.FIREBASE_PROJECT_ID,
        storageBucket: config.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
        appId: config.FIREBASE_APP_ID
    };

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    rtdb = getDatabase(app);
    auth = getAuth(app);

}

loadConfig();
export { app, db, rtdb, auth };
export { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast };
export { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, onSnapshot };
export { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut };

