import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarPlus } from 'lucide-react'

export default function Events() {
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
                </section>
        )
}
