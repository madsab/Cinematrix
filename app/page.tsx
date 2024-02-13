'use client';

import {signOut} from 'firebase/auth';
import {auth} from '@/app/firebase/config'; // db can be imported from here
import {useRouter} from 'next/navigation';
import {useState} from 'react';

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
      try {
        router.push("/signin");
      } catch (error) {
        /*
        Fant ikke ut hvordan jeg stopper router fra å
        lage en error, alt fungerer... håper jeg :o
        */
      }
    }
  });
  
  return (
    <div>
      {loading ? <div>Loading</div> : 
      <div>
        <div>Logged in with mail: {mail}</div>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      }
    </div>
  )
}