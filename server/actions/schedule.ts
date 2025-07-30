'use server';
import { DAYS_OF_WEEK_IN_ORDER } from '@/constants';
import { db } from '@/drizzle/db';
import { ScheduleAvailabilityTable, ScheduleTable } from '@/drizzle/schema';
import { scheduleFormSchema } from '@/schema/schedule';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { BatchItem } from 'drizzle-orm/batch';
import { revalidatePath } from 'next/cache';
import z from 'zod';
import { isMonday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, isSunday, isWithinInterval, addMinutes, areIntervalsOverlapping, setHours, setMinutes } from 'date-fns';
import { getCalendarEventTimes } from '../google/googleCalendar';
import { fromZonedTime } from "date-fns-tz"

export async function saveSchedule(unsafeData: z.infer<typeof scheduleFormSchema>) {
        try {
                const { userId } = await auth();
                const { success, data } = scheduleFormSchema.safeParse(unsafeData);

                if (!success) {
                        throw new Error('Invalid schedule data or user not authenticated');
                }

                const { availabilities, ...scheduleData } = data;

                const [{ id }] = await db
                        .insert(ScheduleTable)
                        .values({
                                ...scheduleData,
                                clerkUserId: userId as any,
                        })
                        .onConflictDoUpdate({
                                target: ScheduleTable.clerkUserId,
                                set: scheduleData,
                        })
                        .returning({ id: ScheduleTable.id });

                const statements: [BatchItem<'pg'>] = [
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
        revalidatePath('/schedule');
}

export async function getValidTimesFromSchedule(
        timesInOrder: Date[],
        event: { clerkUserId: string; durationInMinutes: number }
): Promise<Date[]> {
        const { clerkUserId: userId, durationInMinutes } = event;

        const start = timesInOrder[0];
        const end = timesInOrder.at(-1);

        if (!start || !end) return [];

        const {schedule} = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule/${userId}`).then((res) => res.json());

        if (schedule == null) return [];

        const groupedAvailabilities = Object.groupBy(schedule.availabilities, (a:any) => a.dayOfWeek);

        const eventTimes = await getCalendarEventTimes(userId, {
                start,
                end,
        });

        return timesInOrder.filter((intervalDate) => {
                const availabilities = getAvailabilities(groupedAvailabilities, intervalDate, schedule.timezone);

                const eventInterval = {
                        start: intervalDate,
                        end: addMinutes(intervalDate, durationInMinutes),
                };

                return (
                        eventTimes.every((eventTime) => {
                                return !areIntervalsOverlapping(eventTime, eventInterval);
                        }) &&
                        availabilities.some((availability) => {
                                return (
                                        isWithinInterval(eventInterval.start, availability) &&
                                        isWithinInterval(eventInterval.end, availability)
                                );
                        })
                );
        });
}

function getAvailabilities(
        groupedAvailabilities: Partial<
                Record<
                        (typeof DAYS_OF_WEEK_IN_ORDER)[number],
                        (typeof ScheduleAvailabilityTable.$inferSelect)[]
                >
        >,
        date: Date,
        timezone: string
): { start: Date; end: Date }[] {
        const dayOfWeek = (() => {
                if (isMonday(date)) return "monday"
                if (isTuesday(date)) return "tuesday"
                if (isWednesday(date)) return "wednesday"
                if (isThursday(date)) return "thursday"
                if (isFriday(date)) return "friday"
                if (isSaturday(date)) return "saturday"
                if (isSunday(date)) return "sunday"
                return null
        })()

        if (!dayOfWeek) return []

        const dayAvailabilities = groupedAvailabilities[dayOfWeek]

        if (!dayAvailabilities) return []

        return dayAvailabilities.map(({ startTime, endTime }) => {
                const [startHour, startMinute] = startTime.split(":").map(Number)
                const [endHour, endMinute] = endTime.split(":").map(Number)

                const start = fromZonedTime(
                        setMinutes(setHours(date, startHour), startMinute),
                        timezone
                )

                const end = fromZonedTime(
                        setMinutes(setHours(date, endHour), endMinute),
                        timezone
                )

                return { start, end }
        })
}

