import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Avatar from "../assets/images/avatar.png";
import Image from "next/image";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

const ProfileDropDown = () => {
  const router = useRouter();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center justify-center">
          <Image src={Avatar} width={60} height={60} alt={"Avatar"} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[100px] font-medium bg-slate-900 rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Arrow className="fill-slate-900" />
          <DropdownMenu.Item
            onClick={() => router.push("/profile")}
            className="hover:bg-slate-800 hover:cursor-pointer w-full rounded-t-md p-3 flex justify-center "
          >
            Watchlist
          </DropdownMenu.Item>
          <DropdownMenu.Separator className=" h-[1px] bg-slate-500 mx-2" />
          <DropdownMenu.Item
            onClick={() => router.push("/favourites")}
            className="hover:bg-slate-800 hover:cursor-pointer w-full p-4"
          >
            Your favorites
          </DropdownMenu.Item>
          <DropdownMenu.Separator className=" h-[1px] bg-slate-500 mx-2" />
          <DropdownMenu.Item
            onClick={() => {
              signOut(auth), router.push("/signin");
            }}
            className="hover:bg-slate-800 hover:cursor-pointer w-full rounded-b-md p-3 flex justify-center "
          >
            Log out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropDown;
