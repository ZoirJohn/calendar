"use client";
import {useForm} from "react-hook-form";
import {Form} from "../ui/form";
import {scheduleFormSchema} from "@/schema/scheduleFormSchema";
import {DAYS_OF_WEEK_IN_ORDER} from "@/constants";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

type Availability = {
	startTime: string;
	endTime: string;
	dayOfWeek: (typeof DAYS_OF_WEEK_IN_ORDER)[number];
};

export default function ScheduleForm({schedule}: {schedule?: {timezone: string; availabilities: Availability[]}}) {
	const form = useForm<z.infer<typeof scheduleFormSchema>>({
		resolver: zodResolver(scheduleFormSchema),
		defaultValues: {
			availabilities:
				schedule?.availabilities.toSorted((a, b) => {
					return timeToFloat(a.startTime) - timeToFloat(b.startTime);
				}) || [],
			timezone: schedule?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
		},
	});
	return (
		<Form {...form}>
			<p>Hello</p>
		</Form>
	);
}
