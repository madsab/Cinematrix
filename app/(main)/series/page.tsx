"use client";

import {useEffect, useState} from "react";
import {User as FirebaseUser} from "@firebase/auth";
import {redirect} from "next/navigation";
import {signOut} from "firebase/auth";
import {auth} from "@/firebase/config";

export default function Series()  {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  useEffect( () => {

    if (notLoggedIn) {
      redirect("/signin")
    }

  }, [notLoggedIn]);

  auth.onAuthStateChanged((user) => {
    setLoading(false);

    if (user) {
      console.log(user.uid);
      setUser(user);
      setNotLoggedIn(false);
    } else {
      setNotLoggedIn(true);
    }
  });



    return(
        <main>
          {loading ? (
                  <div>Loading</div>
              ) : (
              <div>
                Series
                <div>{user?.email}</div>
                <button onClick={() => signOut(auth)}>Logout</button>
              </div>
          )}
        </main>

    )
}
