import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const buttonVariants = cva(
	"px-6 py-2 rounded-full text-sm font-neuehaasgrotesk font-normal leading-[0.83] tracking-[-0.02em] transition-colors inline-flex items-center justify-center",
	{
		variants: {
			variant: {
				default: "bg-black text-white hover:bg-gray-800",
				faded: "bg-white/30 text-black hover:bg-white/40",
				solid: "bg-white text-black hover:bg-gray-100",
				outline: "border border-black text-black hover:bg-gray-100",
			},
			// We can add other variants here, like size
			size: {
				default: "px-3 py-1.5 text-xs",
				small: "px-3 py-0.5 text-2xs",
				large: "px-6 py-2 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<button
				type="button"
				className={twMerge(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		)
	},
)
Button.displayName = "Button"

export { Button, buttonVariants }
