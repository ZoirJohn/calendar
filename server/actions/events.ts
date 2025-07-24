'use server'

import { db } from '@/drizzle/db'
import { EventTable } from '@/drizzle/schema'
import { eventFormSchema } from '@/schema/events'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import z from 'zod'

export async function createEvent(unsafeData: z.infer<typeof eventFormSchema>) {
        try {
                const { userId } = await auth()
                const { success, data } = eventFormSchema.safeParse(unsafeData)

                if (!success || !userId) {
                        throw new Error('Invalid event data or user is not authenticated')
                }

                await db.insert(EventTable).values({ ...data, clerkUserId: userId })
        } catch (error) {
                throw new Error('Failed to create the event: ' + error)
        } finally {
                revalidatePath('/events')
        }
}

export async function deleteEvent(id: string) {
        try {
                const { userId } = await auth()
                if (!userId) {
                        throw new Error('User is not authenticated')
                }
                const { rowCount } = await db.delete(EventTable).where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))

                if (rowCount === 0) {
                        throw new Error('Event not found or user is not authorized to delete this event')
                }
        } catch (error) {
                throw new Error('Failed to delete the event: ' + error)
        } finally {
                revalidatePath('/events')
        }
}

export async function updateEvent(id: string, unsafeData: z.infer<typeof eventFormSchema>) {
        try {
                const { userId } = await auth()
                const { success, data } = eventFormSchema.safeParse(unsafeData)

                if (!success || !userId) {
                        throw new Error('Invalid event data or user is not authenticated')
                }

                const { rowCount } = await db
                        .update(EventTable)
                        .set({ ...data })
                        .where(and(eq(EventTable.id, id), eq(EventTable.clerkUserId, userId)))

                if (rowCount === 0) {
                        throw new Error('Event not found or user is not authorized to update this event')
                }
        } catch (error) {
                throw new Error('Failed to update the event: ' + error)
        } finally {
                revalidatePath('/events')
        }
}
