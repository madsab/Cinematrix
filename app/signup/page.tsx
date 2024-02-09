'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../firebase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then(
        () => router.push('/')
    );
  };
  
  return (
    <>
    <div>
        <div>
          <div>
            <div>
              <label htmlFor="email">
                Email address
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <div>
                <label htmlFor="password">
                  Password
                </label>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button
                disabled={(!email || !password)}
                onClick={() => signup()}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}