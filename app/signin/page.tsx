'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

    return (
        <>
            <div className="bg-gradient-to-tr from-grape to-night h-screen flex items-center justify-center">
                <div className="bg-black bg-opacity-40 rounded-lg px-5 py-5 ring-1 ring-slate-900/5 shadow-xl flex items-center justify-center w-1/3 flex-wrap space-y-10">
                    <div className="w-full flex items-center justify-center">
                        <h2 className="text-white text-5xl font-bold">
                            Login
                        </h2>
                    </div>
                    <div className="flex w-full flex-wrap space-y-4">
                        <div className="w-full flex items-center justify-center">
                            <input 
                                className="bg-white rounded-md text-black px-2 py-2"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required                    
                            />
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <input 
                                className="bg-white rounded-md text-black px-2 py-2" 
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            className="bg-gradient-to-tr from-fire to-salmon px-5 py-2 rounded-md text-white hover:underline hover:from-fire hover:to-fire transition duration-150 ease-in-out"
                            disabled={!email || !password}
                            onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl: '/'})}
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button className="text-fire hover:underline hover:text-white transition duration-50 ease-in-out" onClick={() => router.push('signup')}>Dont have an account?
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}