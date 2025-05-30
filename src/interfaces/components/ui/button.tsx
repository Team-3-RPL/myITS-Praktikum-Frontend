import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2, type LucideIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
				primaryBlue:
					"bg-primary-blue text-white shadow hover:bg-primary-blue/90 rounded-[10px]",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border-[3px] border-primary-blue bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({
	className,
	variant,
	size,
	children,
	disabled,
	isLoading,
	leftIcon: LeftIcon,
	rightIcon: RightIcon,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	} & {
		isLoading?: boolean;
		leftIcon?: LucideIcon;
		rightIcon?: LucideIcon;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			disabled={disabled || isLoading}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
			{!isLoading && LeftIcon && <LeftIcon className="mr-2 h-4 w-4" />}
			<Slottable>{children}</Slottable>
			{!isLoading && RightIcon && <RightIcon className="ml-2 h-4 w-4" />}
		</Comp>
	);
}
Button.displayName = "Button";

export { Button, buttonVariants };
