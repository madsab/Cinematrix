'use client';

import {signOut} from 'firebase/auth';
import {auth} from '@/app/firebase/config'; // db can be imported from here
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mail, setMail] = useState('');
  const [notLoggedIn, setNotLoggedIn] = useState(false); //false when unknown

  const router = useRouter();
  useEffect(() => {
    if (notLoggedIn) {
      router.push("/signin");
    }
  })

  auth.onAuthStateChanged((user) => {
    setLoading(false);

    if (user) {
      console.log(user.uid);
      setMail(user.email as string);
      setNotLoggedIn(false);
    } else {
      setNotLoggedIn(true);
    }
  });
  
  return (
    <div>
      {loading ? <div>Loading</div> : 
      <div>
        <div>{mail}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      }
    </div>
  )
}