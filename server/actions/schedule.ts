import {db} from "@/drizzle/db";
import {ScheduleAvailabilityTable, ScheduleTable} from "@/drizzle/schema";
import {scheduleFormSchema} from "@/schema/schedule";
import {auth} from "@clerk/nextjs/server";
import {eq} from "drizzle-orm";
import {BatchItem} from "drizzle-orm/batch";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function saveSchedule(unsafeData: z.infer<typeof scheduleFormSchema>) {
	try {
		const {userId} = await auth();
		const {success, data} = scheduleFormSchema.safeParse(unsafeData);

		if (!success) {
			throw new Error("Invalid schedule data or user not authenticated");
		}

		const {availabilities, ...scheduleData} = data;

		const [{id}] = await db
			.insert(ScheduleTable)
			.values({
				...scheduleData,
				clerkUserId: userId as any,
			})
			.onConflictDoUpdate({
				target: ScheduleTable.clerkUserId,
				set: scheduleData,
			})
			.returning({id: ScheduleTable.id});

		const statements: [BatchItem<"pg">] = [
			db.delete(ScheduleAvailabilityTable).where(eq(ScheduleAvailabilityTable.scheduleId, id)),
		];

		if (availabilities.length > 0) {
			statements.push(
				db.insert(ScheduleAvailabilityTable).values(
					availabilities.map((availability) => ({
						...availability,
						scheduleId: id,
					}))
				)
			);
		}

		await db.batch(statements);
	} catch (error) {
		throw new Error(`Failed to save schedule: ${error}`);
	}
	revalidatePath("/schedule");


}
