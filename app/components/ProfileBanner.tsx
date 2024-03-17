"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Image from "@/node_modules/next/image"


import Poster from "../assets/images/profile_banner_faded.png";
import Avatar from "../assets/images/avatar.png";


interface ProfileBannerProps {
    username: string;
    type: string;
}

const ProfileBanner: FC<ProfileBannerProps> = ({
    username,
    type
}) => {
    return (
        <div className="relative container mx-auto mt-3 flex justify-content h-[19rem] w-full mb-5 ">
        <Image src={Poster} alt="Profile Poster" className="h-full w-full object-cover absolute z-0" />
            <div className="-mt-[1%] backdrop-blur-[1px] min-h-40 ml-10 flex items-center justify-center ">
                <Image src={Avatar} width={90} height={90} alt={"Avatar"}/>
                <p className="flex ml-5">{username ? `${username}'s ` + type.toLowerCase() : type}</p>
            </div>
        </div>

    );
};

export default ProfileBanner;