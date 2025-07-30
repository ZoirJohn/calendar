import { db } from '@/drizzle/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(requet: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
        const { userId } = await params;
        const events = await db.query.EventTable.findMany({
                where: ({ clerkUserId, isActive }, { eq, and }) => and(eq(clerkUserId, userId), eq(isActive, true)),
                orderBy: ({ name }, { asc, sql }) => asc(sql`lower(${name})`),
        });

        return NextResponse.json({ events });
}
