import { TEvent } from '@/app/api/event/[eventId]/route';
import Buttons from '@/components/Buttons';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { clerkClient } from '@clerk/nextjs/server';
import { Suspense } from 'react';

async function PublicProfileEvents({ id }:{id:string}) {
        const userId  = id;
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        const { fullName } = user;
        const { events } = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/publicEvents/${userId}`).then((res) => res.json());
        return (
                <>
                        <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-bold xl:text-5xl">{fullName}</h1>
                        </div>
                        <div className="grid grid-cols-4 gap-4 w-9/10 mx-auto">
                                {events.length &&
                                        events.map(({ name, durationInMinutes, description, id }: TEvent) => (
                                                <Card
                                                        className="px-6 gap-1 w-full"
                                                        key={id}>
                                                        <CardTitle>
                                                                <h1 className="text-2xl">{name}</h1>
                                                        </CardTitle>
                                                        <CardDescription>
                                                                <p>{durationInMinutes} minutes</p>
                                                        </CardDescription>
                                                        <CardContent className="flex flex-col gap-2 px-0">
                                                                <p className="my-4 text-xl">{description}</p>
                                                                <Buttons
                                                                        eventId={id}
                                                                        onlyCopy
                                                                />
                                                        </CardContent>
                                                </Card>
                                        ))}
                        </div>
                </>
        );
}

export default async function PublicProfile({ params }: { params: Promise<{ userId: string }> }) {
        const { userId } = await params;
        return (
                <section className="flex flex-col items-center gap-16 animate-fade-in">
                        <Suspense fallback={<Skeleton className="w-9/10 h-50 mb-4" />}>
                                <PublicProfileEvents id={userId} />
                        </Suspense>
                </section>
        );
}
