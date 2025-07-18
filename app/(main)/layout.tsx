import { currentUser } from '@clerk/nextjs/server'
import { ReactNode } from 'react'
import PublicNavBar from '../../components/PublicNavBar'
import PrivateNavBar from '../../components/PrivateNavBar'

export default async function Layout({ children }: { children: ReactNode }) {
        const user = await currentUser()
        return (
                <main className='relative'>
                        {user ? <PrivateNavBar /> : <PublicNavBar />}
                        <section className='pt-6'>{children}</section>
                </main>
        )
}
