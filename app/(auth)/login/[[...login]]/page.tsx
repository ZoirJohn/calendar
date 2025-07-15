import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Login() {
        return (
                <main className='flex flex-col items-center gap-10 p-5 animate-fade-in'>
                        <Image
                                src='/assets/logo.svg'
                                width={100}
                                height={100}
                                alt='Logo of the application'
                        />
                        <div className='mt-3'>
                                <SignIn />
                        </div>
                </main>
        )
}
