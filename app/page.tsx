'use client';

import {signOut} from 'firebase/auth';
import {auth} from '@/app/firebase/config'; // db can be imported from here
import {useRouter} from 'next/navigation';
import {useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mail, setMail] = useState<string>('');
  const router = useRouter();

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      setLoading(false);
      setMail(user.email as string);
    }
    else {
      router.push("/signin");
    }
  });
  
  return (
    <div className="">
      {loading ? <div>Loading</div> : 
      <div>
        <div>Logged in with mail: {mail}</div>
          <button onClick={() => {
            signOut(auth);
            sessionStorage.removeItem('user');
            }}>Logout</button>
      </div>
      }
    </div>
  )
}


Home.requireAuth = true
