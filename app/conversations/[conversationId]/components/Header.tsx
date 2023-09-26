'use client'

import Avatar from "@/app/components/Avatar";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

type HeaderProps = {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1
    const statusText = useMemo(() => {
        if(conversation.isGroup) {
            return `${conversation.users.length} members`
        }
        return  isActive ? 'Active' : 'Offline'
    }, [conversation, isActive, members, otherUser])
    return (
        <>
            <div className="
                flex
                justify-between
                items-center
                w-full
                border-b-[1px]
                px-4
                lg:px-6
                sm:px-4
                py-3
                shadow-sm
                bg-white
            ">
                <div className="flex items-center gap-3">
                    <Link href={'/conversations'}
                        className="
                            block
                            lg:hidden
                            text-sky-500
                            hover:text-sky-600
                            transition
                            cursor-pointer
                        "
                    >
                        <HiChevronLeft size={32}/>
                    </Link>
                    <Avatar user={otherUser}/>
                    <div className="flex flex-col">
                        <div>
                            {conversation.name || otherUser.name }
                        </div>
                        <div className="text-sm font-light text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisHorizontal size={32}
                    className="
                        text-sky-400
                        hover:text-sky-600
                        cursor-pointer
                        transition
                    "
                />
            </div>
        </>
    );
}

export default Header;