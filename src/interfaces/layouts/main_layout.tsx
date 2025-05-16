import type React from "react";
import { Fragment } from "react";

import Navbar from "@/interfaces/layouts/navbar";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
	children: React.ReactNode;
	withNavbar?: boolean;
} & React.ComponentProps<"main">;

const MainLayout = ({
	children,
	className,
	withNavbar = true,
}: MainLayoutProps) => {
	return (
		<Fragment>
			{withNavbar && (<Navbar />)}
			<main className={cn(
				className,
				"min-h-screen bg-secondary-background p-8"
			)}>
				{children}
			</main>
		</Fragment>
	);
};

export default MainLayout;
