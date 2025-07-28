import type {Metadata} from "next";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {Inter} from "next/font/google";

export const metadata: Metadata = {
	title: "Calendar",
	description: "Calendar is app for making your life easier",
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
			<html lang='en'>
				<body className={`${inter.className} antialiased`}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
