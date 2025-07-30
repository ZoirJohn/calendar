import { startOfDay } from "date-fns"
import { z } from "zod"

const meetingSchemaBase = z.object({
        startTime: z.date().min(new Date()),
        guestEmail: z.email().min(1, "Required"),
        guestName: z.string().min(1, "Required"),
        guestNotes: z.string().optional(),
        timezone: z.string().min(1, "Required"),
})

export const meetingFormSchema = meetingSchemaBase.extend({
        date: z.date().min(startOfDay(new Date()), "Must be in the future"),
})

export const meetingActionSchema = meetingSchemaBase.extend({
        eventId: z.string().min(1, "Required"),
        clerkUserId: z.string().min(1, "Required"),
})
