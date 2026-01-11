"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
	return (
		<Sonner
			theme="light"
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:rounded-full group-[.toaster]:bg-white group-[.toaster]:text-sm group-[.toaster]:text-black group-[.toaster]:border-black/10 group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					actionButton:
						"group-[.toast]:rounded-full group-[.toast]:bg-black group-[.toast]:text-white group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:text-xs group-[.toast]:font-medium",
				},
			}}
			{...props}
		/>
	)
}

export { Toaster }
