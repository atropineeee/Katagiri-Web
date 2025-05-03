import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../cfg/cfg.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../cfg/cfg.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../cfg/cfg.mjs";

const s_emx = document.getElementById('emx');
const s_psx = document.getElementById('pwx');
const s_usx = document.getElementById('usx');

const s_ctnbtn = document.querySelector('.s-m-p-r-form-lbtn');
s_ctnbtn.addEventListener('click', vlds);

let emx, psx, usx;

async function vlds() {
    const emx = s_emx.value.trim();
    const psx = s_psx.value.trim();
    const usx = s_usx.value.trim();

    if (!emx || !psx || !usx) {
        console.log("Error! All fields are required.");
        return;
    }

    try {
        const cref = collection(db, "accounts");

        const q = fsQuery(cref, where("email", "==", emx));
        const q2 = fsQuery(cref, where("username", "==", usx));

        const emailSnapshot = await getDocs(q);
        const usernameSnapshot = await getDocs(q2);

        if (!emailSnapshot.empty) {
            console.log("Error! Email already exists.");
            return;
        }

        if (!usernameSnapshot.empty) {
            console.log("Error! Username already exists.");
            return;
        }

        const userRef = doc(db, "accounts", usx);
        await setDoc(userRef, {
            username: usx,
            email: emx,
            password: psx,
        });

        console.log("Account registered successfully!");

    } catch (err) {
        console.log("Error!", err);
    }
}