import { DAYS_OF_WEEK_IN_ORDER } from '@/constants'
import { relations } from 'drizzle-orm'
import { integer, pgTable, text, uuid, boolean, timestamp, index, pgEnum } from 'drizzle-orm/pg-core'

const createdAt = timestamp('createdAt').notNull().defaultNow()
const updatedAt = timestamp('updatedAt')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date())

export const EventTable = pgTable(
        'events',
        {
                id: uuid('id').primaryKey().defaultRandom(),
                name: text('name').notNull(),
                description: text('description'),
                durationInMinutes: integer('durationInMinutes').notNull(),
                clearkUserId: uuid('clerkUserId').notNull(),
                isActive: boolean('isActive').notNull().default(true),
                createdAt,
                updatedAt,
        },
        (table) => [index('clerkUserIdIndex').on(table.clearkUserId)]
)

export const SchedulesTable = pgTable('schedules', {
        id: uuid('id').primaryKey().defaultRandom(),
        timezone: text('timezone').notNull(),
        clerkUserId: uuid('clerkUserId').notNull().unique(),
        createdAt,
        updatedAt,
})

export const scheduleRelations = relations(SchedulesTable, ({ many }) => ({
        availabilities: many(SchedulesAvailabilityTable),
}))

export const scheduleDayOfWeekEnum = pgEnum('day', DAYS_OF_WEEK_IN_ORDER)
export const SchedulesAvailabilityTable = pgTable(
        'scheduleAvailabilities',
        {
                id: uuid('id').primaryKey().defaultRandom(),
                scheduleId: uuid('scheduleId')
                        .notNull()
                        .references(() => SchedulesTable.id, { onDelete: 'cascade' }),
                startTime: text('startTime').notNull(),
                endTime: text('endTime').notNull(),
                dayOfWeek: scheduleDayOfWeekEnum('dayOfTheWeek').notNull(),
        },
        (table) => [index('scheduleIdIndex').on(table.scheduleId)]
)

export const scheduleAvailabilityRelations = relations(SchedulesAvailabilityTable, ({ one }) => ({
        schedule: one(SchedulesTable, {
                fields: [SchedulesAvailabilityTable.scheduleId],
		references: [SchedulesTable.id],
        }),
}))
