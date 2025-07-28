import PrivateNavBar from "@/components/PrivateNavBar";
import PublicNavBar from "@/components/PublicNavBar";
import { auth, currentUser } from "@clerk/nextjs/server";
import {ReactNode} from "react";

export default async function MainLayout({children}: {children: ReactNode}) {
	const user = await auth();
	return (
		<main className='relative'>
			{user ? <PrivateNavBar /> : <PublicNavBar />}
			<section className='pt-6'>{children}</section>
		</main>
	);
}
