'use client'
import axios from 'axios'
import Button from '@/app/components/Button'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler} from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { signIn, useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import InputField from '@/app/components/input/Input'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session =  useSession()
    const router =  useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(session?.status === 'authenticated')  {
            router.push('/users')
        }
    },[router, session?.status])

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
            axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong !!!'))
            .finally(() => setIsLoading(false))
        }

        if(variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid username or password')
                }

                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in !!!')
                }
            })
            .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        signIn(action, { redirect: false})
        .then((callback) => {
            if(callback?.error) {
                toast.error('Invalid credentials')
            }

            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!')
            }
        })
        .finally(() => setIsLoading(false))

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
                        id='name'
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
                    id='password'
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
                        icon={BsGithub}
                        onClick={() => socialAction('github')}
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