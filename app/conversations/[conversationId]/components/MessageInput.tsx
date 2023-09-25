'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type MessageInputProps = {
    placeholder?: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    placeholder,
    required,
    type,
    errors
}) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete={id}
                {...register(id, {required: required})}
                placeholder={placeholder}
                className="
                    w-full
                    bg-neutral-100
                    rounded-full
                    font-light
                    px-4
                    py-2
                    focus:outline-none
                "
            />
        </div>
    );
}

export default MessageInput;