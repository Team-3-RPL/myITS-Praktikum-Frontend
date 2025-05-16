import type { Metadata } from "next";
import localFont from "next/font/local";
import NextTopLoader from "nextjs-toploader";

import "@/styles/globals.css";
import { ProviderReduxToolkit } from "@/modules/providers/redux_provider";
import ProviderTheme from "@/modules/providers/theme_provider";
import { Color } from "@/styles/color";
import QueryProvider from "@/modules/providers/query_provider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "myITS Praktikum",
	description: "Sitem manajemen informasi untuk praktikum",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ProviderReduxToolkit>
					<QueryProvider>
						<ProviderTheme>
							<NextTopLoader height={2} color={Color.Main.Base} />
							{children}
						</ProviderTheme>
					</QueryProvider>
				</ProviderReduxToolkit>
			</body>
		</html>
	);
}
