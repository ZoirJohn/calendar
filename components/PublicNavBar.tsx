import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function PublicNavBar() {
        return (
                <nav className='flex justify-between items-center sticky z-50 w-full h-28 bg-gray-300/30 px-10 gap-4 backdrop-blur-2xl border-b border-white/10'>
                        <Link
                                href='/login'
                                className='flex items-center gap-1 hover:scale-120 duration-200'
                        >
                                <Image
                                        src='/assets/logo.svg'
                                        width={60}
                                        height={60}
                                        alt='Logo'
                                />
                        </Link>
                        <section className='sticky top-0 flex justify-between'>
                                <div className='flex flex-1 max-sm:gap-0 sm:gap-6'>
                                        <SignInButton>
                                                <Button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border cursor-pointer '>Login</Button>
                                        </SignInButton>
                                        <SignUpButton>
                                                <Button
                                                        className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border cursor-pointer '
                                                        variant='outline'
                                                >
                                                        Sign up
                                                </Button>
                                        </SignUpButton>
                                </div>
                        </section>
                </nav>
        )
}
