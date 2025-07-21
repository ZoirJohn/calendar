import { db } from '@/drizzle/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
        const { userId } = await params
        const events = await db.query.EventTable.findMany({
                where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
                orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
        })
        return NextResponse.json({ events })
}
