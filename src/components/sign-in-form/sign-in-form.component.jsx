import { useState } from 'react';

import Button from "../button/button.component";
import FormInput from '../form-input/form-input.component';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss';

const SignInForm = () => {
    const defaultFormFields = {
        email: '',
        password: ''
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert('incorrect password or email');
            }
            else {
                console.log("error occured when logging in: ", error)
            }
        }
    }
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType="google" onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>

            </form>
        </div>
    )
}
export default SignInForm;