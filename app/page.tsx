'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
    <div className="p-8">
      <div>{session?.data?.user?.email }</div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}

Home.requireAuth = true




/*import {db} from './firebaseConfig';
import {collection, addDoc} from 'firebase/firestore';
import React, {useState} from 'react';

async function addDataToFireStore(name: string, email: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding document ", error);
    return false;
  }
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      const added = await addDataToFireStore(name, email, message);
      if (added) {
        setName("");
        setEmail("");
        setMessage("");

        alert("Data added to DB!");
      }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold m-10">
        Add data to Firestore Database
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
        <div className='mb-4'>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name:
          </label>
          <input
            type='text'
            id = 'name'
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type='text'
            id = 'email'
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
            Message:
          </label>
          <textarea
            rows={5}
            id = 'message'
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className='text-center'>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >Submit</button>
        </div>
      </form>
    </main>
  );
}*/
