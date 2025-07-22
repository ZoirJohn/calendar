import { TEvent } from '@/app/api/events/[userId]/route'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { Copy, CopyCheck } from 'lucide-react'

export default function EventCard({ clerkUserId, createdAt, id, description, name }: TEvent) {
        let copied = false
        return (
                <Card className='px-6 gap-1'>
                        <CardTitle>
                                <h1 className='text-2xl'>{name}</h1>
                        </CardTitle>
                        <CardDescription className='mb-8'>
                                <p>{description}</p>
                        </CardDescription>
                        <CardContent className='flex justify-end gap-2 px-0'>
                                <Button
                                        variant='outline'
                                        className='cursor-pointer'
                                >
                                        {copied ? <CopyCheck /> : <Copy />}
                                        Copy Link
                                </Button>

                                <Button
                                        className='h-full px-4 py-2 font-bold text-white bg-blue-500 border cursor-pointer hover:bg-blue-700'
                                        asChild
                                >
                                        <Link
                                                href='/events/new'
                                                className='flex items-center gap-2'
                                        >
                                                Edit
                                        </Link>
                                </Button>
                        </CardContent>
                </Card>
        )
}
