import { auth } from '@clerk/nextjs/server'
import Landing from '../components/Landing'
import { redirect } from 'next/navigation'

export default async function Home() {
        const user = await auth()
        if (!user) return <Landing />

         return redirect('/events')

}
