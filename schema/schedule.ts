import { DAYS_OF_WEEK_IN_ORDER } from '@/constants';
import { timeToFloat } from '@/lib/utils';
import z from 'zod';

export const scheduleFormSchema = z.object({
        timezone: z.string().min(1, 'Required'),
        availabilities: z
                .array(
                        z.object({
                                startTime: z.string().regex(/^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
                                endTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
                                dayOfWeek: z.enum(DAYS_OF_WEEK_IN_ORDER),
                        })
                )
                .refine((availabilities) => {
                        for (let index = 0; index < availabilities.length; index++) {
                                const availability = availabilities[index];

                                const overlaps = availabilities.some((a, i) => {
                                        return (
                                                i !== index &&
                                                a.dayOfWeek === availability.dayOfWeek &&
                                                timeToFloat(a.startTime) < timeToFloat(availability.endTime) &&
                                                timeToFloat(a.endTime) > timeToFloat(availability.startTime)
                                        );
                                });
                                if (overlaps) {
                                        return false;
                                }

                                if (timeToFloat(availability.startTime) >= timeToFloat(availability.endTime)) {
                                        return false;
                                }
                        }
                        return true;
                }, 'Invalid availability times or overlapping slots'),
});
