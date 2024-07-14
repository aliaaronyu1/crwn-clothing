import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQrH1OhqIagU3nGduWHIDqaPjFYsIJpXg",
    authDomain: "crwn-clothing-db-c5c98.firebaseapp.com",
    projectId: "crwn-clothing-db-c5c98",
    storageBucket: "crwn-clothing-db-c5c98.appspot.com",
    messagingSenderId: "425070969860",
    appId: "1:425070969860:web:a8f62b9ebefa3363f52151"
};

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exist
    //create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    //if user data exists
    else {
        console.log(userDocRef)
    }
    //return userDocRef
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}