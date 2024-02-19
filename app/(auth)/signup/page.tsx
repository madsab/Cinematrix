'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '@/app/firebase/config';

function errorDiv(error: String) {
    return <div className="w-full flex items-center justify-center"><p className="text-fire">{error}</p></div>;
}

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initialState = {
    passwordError: '',
    emailError: '',
    combinedError: ''
  }

  const [errorHandler, setErrorStates] = useState(initialState);

  const router = useRouter();
  const passwordMinLen = 8;

  const signup = () => {
    var errors = {...initialState};

    //Check for basic errors
    if (password.length < passwordMinLen) 
        errors.passwordError = 'Password has to be at least ' + passwordMinLen + ' characters';
    

    if (!email.includes('@')) 
        errors.emailError = 'Email must have @';
    

    if (JSON.stringify(errors) != JSON.stringify(initialState)) {
        setErrorStates(errors);
        return;
    }

    createUserWithEmailAndPassword(auth, email, password).then(
        () => {
            //Push user to main page if creation successfull
            setErrorStates(initialState); 
            //This isnt super necessary, however it takes some time
            //to create the account, so its nice to show the user
            //that there are no errors in the meantime
            //by removing the red from the input fields
            router.push('/')
        }
    ).catch((error) => {
        //Errors firebase gives
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        errors.combinedError = "Error signing up";
        setErrorStates(errors);
    });
    };

  return (
    <>
        <div className="bg-gradient-to-tr from-grape to-night h-screen flex items-center justify-center">
            <div className="bg-black bg-opacity-40 rounded-lg px-5 py-5 ring-1 ring-slate-900/5 shadow-xl flex items-center justify-center w-1/3 flex-wrap space-y-10">
                <div className="w-full flex items-center justify-center">
                    <h2 className="text-white text-5xl font-bold">
                        Account
                    </h2>
                </div>
                <div className="flex w-full flex-wrap space-y-4">
                    <div className="w-full flex items-center justify-center">
                        <input 
                            className={(errorHandler.emailError.concat(errorHandler.combinedError) != '' && "border-2 border-fire") + " bg-white text-black rounded-md px-2 py-2"}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required                    
                        />
                    </div>
                    {errorDiv(errorHandler.emailError)}
                    <div className="w-full flex items-center justify-center">
                        <input 
                            className={(errorHandler.passwordError.concat(errorHandler.combinedError) != '' && "border-2 border-fire") + " bg-white text-black rounded-md px-2 py-2"}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorDiv(errorHandler.passwordError)}
                    {errorDiv(errorHandler.combinedError)}
                </div>
                
                <div className="w-full flex items-center justify-center">
                    <button
                        className="bg-gradient-to-tr from-fire to-salmon px-5 py-2 rounded-md text-white hover:underline hover:from-fire hover:to-fire transition duration-150 ease-in-out"
                        disabled={!email || !password}
                        onClick={() => signup()}
                    >
                        Sign up
                    </button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button className="text-fire hover:underline hover:text-white transition duration-50 ease-in-out" onClick={() => router.push('signin')}>Go back
                    </button>
                </div>
            </div>
        </div>
    </>
)
}