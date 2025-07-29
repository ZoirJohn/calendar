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
