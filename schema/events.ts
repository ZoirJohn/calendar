import z, { number } from 'zod'

export const eventFormSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string().optional(),
        durationInMinutes: z.coerce
                .number()
                .int()
                .positive('Duration must be a greater than 0')
                .max(60 * 12, 'Duration must be less than 12 hours'),
        isActive: z.boolean(),
})
