import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";

export type TEvent = typeof EventTable.$inferSelect


export async function GET(
      request: Request,
      { params }: { params: Promise<{ eventId: string }> }
) {
      const { eventId } = await params;

      const event =await db.query.EventTable.findMany({
            where: ({ id },{eq}) => eq(id, eventId),
      });

      return NextResponse.json({
            event,
      });
}
