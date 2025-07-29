import ScheduleForm from "@/components/Forms/ScheduleForm";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {auth} from "@clerk/nextjs/server";

export default async function Schedule() {
	const {userId, redirectToSignIn} = await auth();
	if (!userId) return redirectToSignIn();
	const schedule = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule/${userId}`).then((res) =>
		res.json()
	);
	return (
		<Card className='max-w-md py-6 mx-auto border-8 border-blue-200 shadow-xl'>
			<CardHeader>
				<CardTitle>Schedule</CardTitle>
			</CardHeader>
			<CardContent className=''>
				<ScheduleForm />
			</CardContent>
		</Card>
	);
}
