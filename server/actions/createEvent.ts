'use server'

import { db } from '@/drizzle/db'
import { EventTable } from '@/drizzle/schema'
import { eventFormSchema } from '@/schema/events'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export default async function createEvent(unsafeData: z.infer<typeof eventFormSchema>) {
        try {
                const { userId } = await auth()
                const { success, data } = eventFormSchema.safeParse(unsafeData)

                if (!success || !userId) {
                        throw new Error('Invalid event data or user is not authenticated')
                }

                await db.insert(EventTable).values({ ...data, clerkUserId: userId })
        } catch (error) {
                console.error('Shit is happening here' + error)
                throw new Error('Failed to create the event: ' + error)
        } finally {
                revalidatePath('/events')
        }
}
