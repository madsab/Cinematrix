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
            <div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required                    
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input 
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button
                        onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl: '/'})}
                        disabled={!email || !password}
                    >
                        Sign in
                    </button>
                </div>
                <div>
                    <button onClick={() => router.push('signup')}>
                        Dont have an account?
                    </button>
                </div>
            </div>
        </>
    )
}