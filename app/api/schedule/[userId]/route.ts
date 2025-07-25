import {db} from "@/drizzle/db";
import {SchedulesTable} from "@/drizzle/schema";
import {NextRequest, NextResponse} from "next/server";

export type TSchedule = typeof SchedulesTable.$inferSelect;

export async function GET(request: NextRequest, {params}: {params: Promise<{userId: string}>}) {
	const {userId} = await params;
	const schedule = await db.query.SchedulesTable.findFirst({
		where: ({clerkUserId}, {eq}) => eq(clerkUserId, userId),
		with: {
			availabilities: true,
		},
	})!;
	return NextResponse.json({schedule: JSON.stringify(schedule)});
}
