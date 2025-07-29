ALTER TABLE "schedules" RENAME TO "schedule";--> statement-breakpoint
ALTER TABLE "schedule" DROP CONSTRAINT "schedules_clerkUserId_unique";--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" DROP CONSTRAINT "scheduleAvailabilities_scheduleId_schedules_id_fk";
--> statement-breakpoint
ALTER TABLE "scheduleAvailabilities" ADD CONSTRAINT "scheduleAvailabilities_scheduleId_schedule_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedule"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_clerkUserId_unique" UNIQUE("clerkUserId");