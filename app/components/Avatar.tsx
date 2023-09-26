'use client'

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

type AvatarProps = {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({user}) => {
    const { members } = useActiveList()
    const isActive = members.indexOf(user?.email!) !== -1

    return (
        <div className="relative">
            <div className="
                relative
                inline-block
                rounded-full
                overflow-hidden
                h-9
                w-9
                md:h-11
                md:w-11
            ">
                <Image
                    alt="Avatar"
                    src={user?.image || '/images/placeholder.jpg'}
                    fill
                />
            </div>
            {isActive && (
                <span className="
                    absolute
                    top-0
                    right-0
                    block
                    rounded-full
                    bg-green-600
                    ring-2
                    ring-white
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                ">
                </span>
            )}
        </div>
    );
}

export default Avatar;