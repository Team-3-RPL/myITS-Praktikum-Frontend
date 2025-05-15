"use client";
import type React from "react";
import { Fragment, useEffect, useState } from "react";

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
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return children;
	}

	return (
		<Fragment>
			{withNavbar && <div>Navbar</div>}
			<main className={cn(className, "")}>{children}</main>
		</Fragment>
	);
};

export default MainLayout;
