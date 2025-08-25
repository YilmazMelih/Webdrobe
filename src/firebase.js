import { initializeApp } from "firebase/app";
import {
    getFirestore,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    serverTimestamp,
    orderBy,
    deleteDoc,
    documentId,
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvJgTz1vsm_7AixNCvb9dRC1jqe6Y-y1M",
    authDomain: "webdrobe-fab36.firebaseapp.com",
    projectId: "webdrobe-fab36",
    storageBucket: "webdrobe-fab36.firebasestorage.app",
    messagingSenderId: "793626265931",
    appId: "1:793626265931:web:ff0f7f38f2f087af5180ce",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export function signInGoogle(setSignedIn) {
    signInWithPopup(auth, provider)
        .then(() => {
            setSignedIn(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Sign in error: ", errorMessage);
        });
}

export async function signUpUser(setSignedIn) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    try {
        if (!/^[a-zA-Z0-9]{3,16}$/.test(username)) {
            throw new Error("bad-username");
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: username });
        setSignedIn(true);
    } catch (error) {
        const errorCode = error.code;
        const dialogEl = document.getElementById("errorDialog");
        const dialogMsg = document.getElementById("errorText");
        console.error("Sign up error: ", error.message);
        if (errorCode == "auth/invalid-email" || errorCode == "auth/missing-email") {
            dialogMsg.innerText = "Invalid email";
        } else if (
            errorCode == "auth/weak-password" ||
            errorCode == "auth/password-does-not-meet-requirements"
        ) {
            dialogMsg.innerText = "Password must be 6-16 characters";
        } else if (error.message == "bad-username") {
            dialogMsg.innerText = "Username must be 3-16 characters with no special characters";
        }
        dialogEl.show();
    }
}

export function logInUser(setSignedIn) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setSignedIn(true);
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Logging in error: ", errorMessage);
            document.getElementById("errorDialog").show();
        });
}

export async function addItemToWardrobe(name, desc, icon, color) {
    await addDoc(collection(db, "clothing"), {
        name: name,
        desc: desc,
        icon: icon,
        color: color,
        uid: auth.currentUser.uid,
        lastEdited: serverTimestamp(),
    });
}

export async function addOutfit(name, items) {
    await addDoc(collection(db, "outfits"), {
        name: name,
        items: items,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
    });
}

export async function getWardrobe() {
    const q = query(
        collection(db, "clothing"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("lastEdited", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

export async function getOutfits() {
    const q = query(
        collection(db, "outfits"),
        where("uid", "==", auth.currentUser.uid),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

export async function getItem(id) {
    const docRef = doc(db, "clothing", id);
    const docSnap = await getDoc(docRef);
    return docSnap;
}

export async function getOutfit(idArr) {
    const q = query(
        collection(db, "clothing"),
        where("uid", "==", auth.currentUser.uid),
        where(documentId(), "in", idArr),
        orderBy("lastEdited", "desc")
    );
    const querySnapshot = await getDocs(q);
    const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return results;
}

export async function editItem(name, desc, icon, color, id) {
    const docRef = doc(db, "clothing", id);
    await setDoc(docRef, {
        name: name,
        desc: desc,
        icon: icon,
        color: color,
        uid: auth.currentUser.uid,
        lastEdited: serverTimestamp(),
    });
}

export async function deleteItem(id, icon) {
    const q = query(
        collection(db, "outfits"),
        where("uid", "==", auth.currentUser.uid),
        where("items", "array-contains-any", [{ icon: icon, id: id }])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map(async (document) => {
        await deleteDoc(doc(db, "outfits", document.id));
    });

    await deleteDoc(doc(db, "clothing", id));
}

export async function deleteOutfit(id) {
    await deleteDoc(doc(db, "outfits", id));
}
