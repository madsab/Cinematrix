"use client";
import Image from "@/node_modules/next/image";
import Link from "@/node_modules/next/link";
import Logo from "../assets/images/logo.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className=" bg-gradient-to-r from-black to-pink-900 w-full p-2 flex z-30">
      <div className=" flex-1 flex justify-evenly items-center">
        <Link href="/">
          <Image src={Logo} width={100} height={40} alt={"Cinematrix Logo"} />
        </Link>
        <Link href="/browse">Browse</Link>
        <Link href="/genres">Genres</Link>
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("/search/" + search);
                router.push("/search/" + search);
              }
            }}
            id="search-navbar"
            className="block w-full p-2 pl-10 text-sm text-white border border-pink-900 rounded-lg bg-black focus:ring-pink-900 focus:border-pink-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-900 dark:focus:border-pink-900 outline-none"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <ProfileDropDown />
      </div>
    </div>
  );
};
export default Navbar;
