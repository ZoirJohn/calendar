import {TEvent} from "@/app/api/events/[userId]/route";
import EventForm from "@/components/Forms/EventForm";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Edit({params}: {params: Promise<{eventId: string}>}) {
	const {eventId} = await params;
	const {event} = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${eventId}`).then((res) => res.json());
	return (
		<Card className='max-w-md py-6 mx-auto border-8 border-blue-200 shadow-xl'>
			<CardHeader>
				<CardTitle>New Event</CardTitle>
			</CardHeader>
			<CardContent className=''>
				<EventForm event={{...event[0]}} />
			</CardContent>
		</Card>
	);
}
