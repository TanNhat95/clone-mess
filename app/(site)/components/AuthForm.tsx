'use client'
import Button from '@/app/components/Button'
import InputField from '@/app/components/input/input'
import React, { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsFacebook, BsGoogle } from 'react-icons/bs'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER')
        }else {
            setVariant('LOGIN')
        }
    },[variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        if(variant === 'REGISTER') {
            //Axios register
        }

        if(variant === 'LOGIN') {
            //NextAuth Signin
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        //NextAuth Signin


    }
  return (
    <div
        className='
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
        '
    >
        <div className='
            bg-white
            px-4
            py-8
            shadow
            sm:rounded-lg
            sm:px-10
        '>
            <form 
                className='space-y-6'
                onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && (
                    <InputField 
                        label='Name' 
                        id='email' 
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                )}
                <InputField 
                    label='Email'
                    type='email'
                    id='email' 
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
                <InputField 
                    label='Password'
                    type='password'
                    id='email' 
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                />
                <Button
                    disabled={isLoading}
                    type='submit'
                    fullWith
                >
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </Button>
            </form>

            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'/>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 text-gray-500 bg-white'>
                            Or continue with
                        </span>
                    </div>
                </div>
                
                <div className='flex gap-2 mt-6'>
                    <AuthSocialButton 
                        icon={BsFacebook}
                        onClick={() => socialAction('facebook')}    
                    />
                    <AuthSocialButton 
                        icon={BsGoogle}
                        onClick={() => socialAction('google')}    
                    />
                </div>
            </div>

            <div className='
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
            '>
                <div>
                    {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                </div>
                <div
                    onClick={toggleVariant}
                    className='underline cursor-pointer'
                >
                    {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthForm