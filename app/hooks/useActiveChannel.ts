'use client'

import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = () => {
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
    const { add, remove, set } = useActiveList()

    useEffect(() => {
        let channel = activeChannel

        if (!channel) {
            channel = pusherClient.subscribe('presence-messenger')
            setActiveChannel(channel)
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initialMembers: string[] = []

            //only using "each" b/c Members is special type of pusher-js
            members.each((member: Record<string, any>) => initialMembers.push(member.id))

            set(initialMembers)
        })

        channel.bind('pusher:member_added', (member: Record<string, any>) => {
            add(member.id)
        })

        channel.bind('pusher:member_removed', (member: Record<string, any>) => {
            remove(member.id)
        })

        return () => {
            if (activeChannel) {
                pusherClient.unsubscribe('presence-messenger')
                setActiveChannel(null)
            }
        }

    }, [activeChannel, add, remove, set])
}

export default useActiveChannel;