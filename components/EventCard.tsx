import { TEvent } from "@/app/api/events/[userId]/route";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Buttons from "./Buttons";

export default async function EventCard({
      id,
      description,
      name,
      durationInMinutes,
}: TEvent) {
      return (
            <Card className="px-6 gap-1 w-full">
                  <CardTitle>
                        <h1 className="text-2xl">{name}</h1>
                  </CardTitle>
                  <CardDescription>
                        <p>{durationInMinutes} minutes</p>
                  </CardDescription>
                  <CardContent className="flex flex-col gap-2 px-0">
                        <p className="my-4 text-xl">{description}</p>
                        <Buttons eventId={id} />
                  </CardContent>
            </Card>
      );
}
