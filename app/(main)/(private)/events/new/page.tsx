import EventForm from '@/components/Forms/EventForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewEvent() {
        return (
                <Card className='max-w-md py-6 mx-auto border-8 border-blue-200 shadow-xl'>
                        <CardHeader>
                                <CardTitle>New Event</CardTitle>
                        </CardHeader>
			<CardContent className=''>
				<EventForm />
			</CardContent>
                </Card>
        )
}
