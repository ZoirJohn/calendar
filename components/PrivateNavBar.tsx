'use client'
import { usePathname } from 'next/navigation'
import { PRIVATE_NAV_LINKS } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'

export default function PrivateNavBar() {
        const pathname = usePathname()
        return (
                <nav className='sticky top-0 z-50 flex items-center justify-between w-full gap-4 px-10 border-b h-28 bg-gray-300/30 backdrop-blur-2xl border-white/10'>
                        <Link
                                href='/events'
                                className='flex items-center gap-1 duration-200 hover:scale-120'
                        >
                                <Image
                                        src='/assets/logo.svg'
                                        width={60}
                                        height={60}
                                        alt='Logo'
                                />
                        </Link>
                        <section className='flex justify-between text-black'>
                                <div className='flex flex-1 max-sm:gap-0 sm:gap-6'>
                                        {PRIVATE_NAV_LINKS.map((link) => {
                                                const isActive = pathname == link.href || pathname.startsWith(link.href + '/')
                                                return (
                                                        <Link
                                                                href={link.href}
                                                                key={link.imgUrl}
                                                                className={cn('flex items-center gap-4 p-4 rounded-lg justify-start', isActive && 'bg-blue-100')}
                                                        >
                                                                <Image
                                                                        src={link.imgUrl}
                                                                        width={30}
                                                                        height={30}
                                                                        alt={link.label}
                                                                />
                                                                <p className={cn('text-lg font-semibold max-lg:hidden')}>{link.label}</p>
                                                        </Link>
                                                )
                                        })}
                                </div>
                        </section>
                        <div className='flex items-center'>
                                <SignedIn>
                                        <UserButton />
                                </SignedIn>
                        </div>
                </nav>
        )
}
