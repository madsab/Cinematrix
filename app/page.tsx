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

  console.log(session?.data?.user?.id);

  return (
    <div className="p-8">
      <div>Logged in with mail: {session?.data?.user?.email} ID: {session?.data?.user?.id as string}</div>
      <button onClick={() => signOut()}>Logout</button>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Begynn med den linken her&nbsp;
            <code className="font-mono font-bold">app/page.tsx</code>
          </p>
        </div>
      </main>
    </div>
  )
}

Home.requireAuth = true
