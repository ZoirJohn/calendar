import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Landing from './components/Landing'

export default async function Home() {
        const user = await currentUser()
        if (!user) return <Landing />

        return redirect('/events')
}
