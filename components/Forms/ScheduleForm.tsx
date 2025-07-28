"use client";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {scheduleFormSchema} from "@/schema/schedule";
import {DAYS_OF_WEEK_IN_ORDER} from "@/constants";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {timeToFloat} from "@/lib/utils";

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
	async function onSubmit(values: z.infer<typeof scheduleFormSchema>) {}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{form.formState.errors.root && (
					<div className='text-sm text-destructive'>{form.formState.errors.root.message}</div>
				)}
				<FormField
					name='timezone'
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Timezone</FormLabel>
							{/* <Select></Select> */}
							<FormDescription>The name users will see when booking</FormDescription>
							<FormMessage />
						</FormItem>
					)}></FormField>

				<FormField
					name='availabilities'
					control={form.control}
					render={({field}) => (
						<FormItem>
							<FormLabel>Timezone</FormLabel>
							{/* <Select></Select> */}
							<FormDescription>The name users will see when booking</FormDescription>
							<FormMessage />
						</FormItem>
					)}></FormField>
			</form>
		</Form>
	);
}
