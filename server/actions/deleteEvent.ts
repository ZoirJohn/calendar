'use server'

import { db } from '@/drizzle/db'
import { EventTable } from '@/drizzle/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function deleteEvent(id: string) {
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
