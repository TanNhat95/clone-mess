'use client'

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/type";
import { Message, User } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

type BodyProps = {
    initialMessages: FullMessageType[]
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    //subscribe pusher and expect all events
    useEffect(() => {
        pusherClient.subscribe(conversationId)
        bottomRef?.current?.scrollIntoView()

        const messageHandle = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((currentMessages) => {
                if (find(currentMessages, {id: message.id})) {
                    return currentMessages
                }
                return [...currentMessages, message]
            })

            bottomRef?.current?.scrollIntoView()
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage
                }
                return currentMessage
            }))
        }

        pusherClient.bind('messages:new', messageHandle)
        pusherClient.bind('message:update', updateMessageHandler)


        return () => {
            pusherClient.unbind('messages:new',messageHandle)
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('message:update', updateMessageHandler)
        }
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.map((message,index) => (
                <MessageBox
                    key = {message.id}
                    isLast = {index === messages.length - 1}
                    data = {message}
                />
            ))}
            <div ref={bottomRef} className="pt-24"/>
        </div>
    );
}

export default Body;