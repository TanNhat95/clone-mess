'use client'
import React from 'react'
import clsx from 'clsx'

type ButtonProps = {
    type?: 'button' | 'submit' | 'reset' | undefined
    fullWith?: boolean,
    children?: React.ReactNode
    onClick?: () => void
    secondary?: boolean
    danger?: boolean
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWith,
    children,
    danger,
    disabled,
    onClick,
    secondary
}) => {
  return (
    <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(
            `
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            `,
            disabled && 'opacity-50 cursor-default',
            fullWith && 'w-full',
            secondary ? 'text-gray-800' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-700 focus-visible:outline-rose-700',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-700 focus-visible:outline-sky-700'
        )}
    >
        {children}
    </button>
  )
}

export default Button