import { getRedirectResult } from 'firebase/auth';
import { useEffect } from 'react';
import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    // useEffect(() => {
    //     doSomething();
    // }, []);
    // const doSomething = async () => {
    //     const response = await getRedirectResult(auth);
    //     console.log(response);
    // }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();
        console.log({user})
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={logGoogleRedirectUser}>
                Sign in with Google Redirect
            </button>
        </div>
    )
}

export default SignIn