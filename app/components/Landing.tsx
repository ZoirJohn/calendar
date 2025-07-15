import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { neobrutalism } from '@clerk/themes'

export default function Landing() {
        return (
                <main className='flex items-center gap-24 p-10 animate-fade-in max-md:flex-col'>
                        <section className='flex flex-col items-center'>
                                <Image
                                        src='/assets/logo.svg'
                                        width={300}
                                        height={300}
                                        alt='Logo'
                                />
                                <h1 className='text-2xl font-bold lg:text-3xl'>Your time, perfectly planned</h1>
                                <p className='font-extralight'>Join millions of professionals who easily look meetings with the #1 scheduling tool</p>
                        </section>
                        <SignIn
                                routing='hash'
                                appearance={{
                                        baseTheme: neobrutalism,
                                }}
                        />
                </main>
        )
}
