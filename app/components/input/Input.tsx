'use client'
import clsx from 'clsx'
import React from 'react'
import { FieldValues, FieldErrors, UseFormRegister } from 'react-hook-form'

type InputProps = {
    label: string,
    id: string,
    type?: string,
    required?: boolean,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
}

const InputField: React.FC<InputProps> = ({
    label, id, type, required, errors, disabled, register
}) => {
  return (
    <div>
        <label className='block text-sm font-medium leading-6 text-gray-800' htmlFor={id}>
            {label}
        </label>
        <div className='mt-2'>
            <input 
                id={id}
                type={type}
                autoComplete={id}
                disabled={disabled}
                {...register(id, {required})}
                className={clsx(`
                    form-input
                    block
                    w-full
                    rounded-md
                    border-0
                    py-1.5
                    text-gray-800
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6
                `,
                    errors[id] && "focus:ring-rose-600",
                    disabled && "opacity-50 cursor-default"
                )}
            />
        </div>
    </div>
  )
}

export default InputField