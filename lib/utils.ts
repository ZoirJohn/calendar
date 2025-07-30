import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timeToFloat(time: string): number {
	const [hours, minutes] = time.split(":").map(Number);
	return hours + minutes / 60;
}

export function formatTimezoneOffset(timeZone: string) {
	return new Intl.DateTimeFormat(undefined, {
		timeZone,
		timeZoneName: "shortOffset",
	}).formatToParts(new Date()).find(part=> part.type === "timeZoneName")?.value;
}

export function formatEventDescription(durationInMinutes: number) : string {
	const hours = Math.floor(durationInMinutes / 60)
	const minutes = durationInMinutes % 60
	const minutesString = `${minutes} ${minutes > 1 ? "mins" : "min"}`
	const hoursString = `${hours} ${hours > 1 ? "hrs" : "hr"}`
  
	if (hours === 0) return minutesString
	if (minutes === 0) return hoursString
	return `${hoursString} ${minutesString}`
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
	timeStyle: "short",
})

export function formatTimeString(date: Date) {
	return timeFormatter.format(date)
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
})

export function formatDate(date: Date) {
	return dateFormatter.format(date)
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
	timeStyle: "short",
})

export function formatDateTime(date: Date) {
	return dateTimeFormatter.format(date)
}
