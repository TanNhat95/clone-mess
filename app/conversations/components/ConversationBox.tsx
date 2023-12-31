'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { User, Message, Conversation } from '@prisma/client'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import { FullConversationType } from '@/app/type'
import useOtherUser from '@/app/hooks/useOtherUser'
import Avatar from '@/app/components/Avatar'

type ConversationBoxProps = {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const router = useRouter()
    const session = useSession()
    const otherUser = useOtherUser(data)

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []
        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    const hasSeen = useMemo(() => {
        if(!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || []

        if(!userEmail) {
            return false
        }
        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if(lastMessage?.iamge) {
            return 'Sent an image'
        }

        if(lastMessage?.body) {
            return lastMessage.body
        }

        return 'Started an conversation'
    }, [lastMessage])
    return (
        <div onClick={handleClick} className={clsx(`
            w-full
            relative
            flex
            items-center
            p-3
            space-x-3
            hover:bg-neutral-100
            rounded-lg
            transition
            cursor-pointer
        `,
            selected ? 'bg-neutral-100' : 'bg-white'
        )}>
            <Avatar user={otherUser}/>
            <div className='min-w-0 flex-1'>
                <div className='focus:outline-none'>
                    <div className='
                        flex
                        justify-between
                        items-center
                        mb-1
                    '>
                        <p className='
                            text-base
                            font-medium
                            text-gray-900
                            '
                        >
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className='
                                text-xs
                                text-gray-400
                                font-light
                            '>
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                        truncate
                        text-sm
                    `,
                        hasSeen ? 'text-gray-500' : 'text-black font-medium'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox;