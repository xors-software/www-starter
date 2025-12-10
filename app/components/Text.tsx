import { Slot } from "@radix-ui/react-slot"

import { clsx } from "clsx"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

// ⭐️ only the variants object changed
export const text = cva("font-primary", {
	variants: {
		variant: {
			"heading-xl": ["text-6xl", "md:text-7xl", "font-hl", "font-normal"],
			"heading-lg": ["text-5xl", "md:text-6xl", "font-hl", "font-normal"],
			"heading-md": ["text-4xl", "md:text-5xl", "font-hl", "font-normal"],
			"heading-sm": ["text-3xl", "md:text-4xl", "font-hl", "font-normal"],
			"heading-xs": ["text-2xl", "md:text-3xl", "font-hl", "font-normal"],
			"heading-xxs": ["text-xl", "md:text-2xl", "font-hl", "font-normal"],

			"paragraph-xxl": ["text-4xl", "leading-10", "font-sans"],
			"paragraph-xl": ["text-2xl", "leading-8", "font-sans"],
			"paragraph-lg": ["text-xl", "leading-7", "font-sans"],
			"paragraph-md": ["text-base", "leading-5", "font-sans"],
			"paragraph-sm": ["text-sm", "font-sans"],
			"paragraph-xs": ["text-xs", "font-sans"],

			"accent-lg": ["text-xl", "leading-6", "font-mono"],
			"accent-md": ["text-base", "leading-5", "font-mono"],
			"accent-sm": ["text-sm", "leading-5", "font-mono"],
			"accent-xs": ["text-xs", "leading-4", "font-mono"],
		},
	},
	defaultVariants: {
		variant: "paragraph-md",
	},
})

export type TextVariant = VariantProps<typeof text>["variant"]

interface TextProps extends VariantProps<typeof text> {
	// interface TextProps extends VariantProps<typeof text> {
	asChild?: boolean
	children: React.ReactNode
	fontWeight?: // Tailwind font-weight variants. We can update as necessary.
	// For now, just the most common ones to reduce potential errors.
	// See https://tailwindcss.com/docs/font-weight
		| "font-normal"
		| "font-medium"
		| "font-semibold"
		| "font-bold"
		| "font-extrabold"
	isInline?: boolean
	className?: string
}

export function Text({
	asChild = false,
	variant,
	children,
	fontWeight,
	isInline, // Override + set line-height to 1
	className,
	...rest
}: TextProps) {
	const Component = asChild ? Slot : "div"
	return (
		<Component
			className={twMerge(
				// twMerge ensures default Tailwind CVA styles can be overridden correctly
				text({ variant }),
				clsx(
					fontWeight,
					{
						"leading-none": isInline,
					},
					className,
				),
			)}
			{...rest}
		>
			{children}
		</Component>
	)
}
