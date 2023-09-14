import React from 'react'
import { IconType } from 'react-icons'

type AuthSocialButtonProps = {
    icon: IconType,
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({icon: Icon, onClick}) => {
  return (
    <button className='
        inline-flex
        w-full
        justify-center
        rounded-md
        py-2
        px-4
        bg-white
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
    '>
        <Icon />
    </button>
  )
}

export default AuthSocialButton