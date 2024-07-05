"use client";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import "../globals.css";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>();
  const router = useRouter();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/signin");
      }
      setUser(user);
    });
  }, [user, router]);
  return (
    <>
      {user && (
        <>
          <Navbar />
          <div>{children}</div>
        </>
      )}
    </>
  );
}
