import { cn } from "@/lib/utils";

type TypographyVariants =
	| "4xl"
	| "3xl"
	| "2xl"
	| "xl"
	| "lg"
	| "md"
	| "sm"
	| "base"
	| "xs";

type TypographyElement =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "p"
	| "span"
	| "div";

type TypographyColor = "foreground" | "white" | "black" | "red" | "blue";

type TypographyWeight = "normal" | "medium" | "semibold" | "bold";

type TypographyProps = {
	variant?: TypographyVariants;
	className?: string;
	children: React.ReactNode;
	color?: TypographyColor;
	weight?: TypographyWeight;
	as?: TypographyElement;
};

export default function Typography({
	as = "p",
	variant = "base",
	className,
	weight = "normal",
	children,
	color = "foreground",
}: TypographyProps) {
	const Component = as;

	return (
		<Component
			className={cn(
				{
					"text-xs sm:text-sm": variant === "xs",
					"text-sm sm:text-base": variant === "sm",
					"text-base sm:text-lg": variant === "base",
					"text-lg sm:text-xl": variant === "lg",
					"text-xl sm:text-2xl": variant === "xl",
					"text-2xl sm:text-3xl": variant === "2xl",
					"text-3xl sm:text-4xl": variant === "3xl",
					"text-4xl sm:text-5xl": variant === "4xl",
				},
				{
					"text-foreground": color === "foreground",
					"text-white": color === "white",
					"text-black": color === "black",
					"text-destructive": color === "red",
					"text-primary-blue": color === "blue",
				},
				{
					"font-normal": weight === "normal",
					"font-medium": weight === "medium",
					"font-semibold": weight === "semibold",
					"font-bold": weight === "bold",
				},
				className,
			)}
		>
			{children}
		</Component>
	);
}
