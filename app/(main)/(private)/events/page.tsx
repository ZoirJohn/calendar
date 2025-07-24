import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarPlus, CalendarRange } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'
import { TEvent } from '@/app/api/events/[userId]/route'
import EventCard from '@/components/EventCard'

export default async function Events() {
        const { userId, redirectToSignIn } = await auth()
        if (!userId) {
                redirectToSignIn()
        }
        const { events } = await fetch(`http://localhost:3000/api/events/${userId}`).then((res) => res.json())
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
                        <div className='grid grid-cols-4 gap-4 w-9/10 mx-auto'>
                                {events.length ? (
                                        events.map((event: TEvent) => (
                                                <EventCard
                                                        key={event.id}
                                                        {...event}
                                                />
                                        ))
                                ) : (
                                        <div className='flex flex-col items-center gap-4'>
                                                <CalendarRange className='size-16 mx-auto text-black' />
                                                You do not have any events yet. Create your first event to get started!
                                                <Button
                                                        className='h-full px-4 py-2 font-bold text-white bg-blue-500 border cursor-pointer hover:bg-blue-700'
                                                        asChild
                                                >
                                                        <Link href='/events/new'>
                                                                <CalendarPlus />
                                                                Create Event
                                                        </Link>
                                                </Button>
                                        </div>
                                )}
                        </div>
                </section>
        )
}
