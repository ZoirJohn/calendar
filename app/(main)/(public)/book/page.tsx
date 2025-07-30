'use client';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Book() {
        const { user, isLoaded } = useUser();
        if (!isLoaded) {
                return <div>Loading...</div>;
        }
        if (!user) {
                return redirect('/login');
        }
        return redirect(`/book/${user.id}`);
}
