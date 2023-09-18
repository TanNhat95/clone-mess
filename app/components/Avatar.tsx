'use client'

import { User } from "@prisma/client";
import Image from "next/image";

type AvatarProps = {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({user}) => {
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
        </div>
    );
}

export default Avatar;