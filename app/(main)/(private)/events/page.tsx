import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarPlus } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'

export default async function Events() {
        const { userId, redirectToSignIn } = await auth()
        if (!userId) {
                redirectToSignIn()
        }
        const {events} = await fetch(`http://localhost:3000/api/events/${userId}`).then((res) => res.json())
        return (
                <section className='flex flex-col items-center gap-16 animate-fade-in'>
                        <div className='flex items-center gap-4'>
                                <h1 className='text-4xl font-bold xl:text-5xl'>Events</h1>
                                <Button
                                        className='h-full px-4 py-2 font-bold text-white bg-blue-500 border cursor-pointer hover:bg-blue-700'
                                        asChild
                                >
                                        <Link
                                                href='/events/new'
                                                className='flex items-center gap-2'
                                        >
                                                <CalendarPlus />
                                                Create Event
                                        </Link>
                                </Button>
                        </div>
                        <div>
                                {events.map((event: any) => (
                                        <div
                                                key={event.id}
                                                className='p-4 border rounded-lg mb-4'
                                        >
                                                <h2 className='text-xl font-semibold'>{event.title}</h2>
                                                <p>{event.description}</p>
                                                <p className='text-sm text-gray-500'>{new Date(event.date).toLocaleDateString()}</p>
                                        </div>
                                ))}
                        </div>
                </section>
        )
}
