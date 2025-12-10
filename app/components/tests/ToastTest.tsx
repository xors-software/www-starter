"use client"

import { Button } from "../Button"
import { toast } from "../toasts"
import { Check, Warning, WifiOff } from "../icons/generated"

export function ToastTest() {
	return (
		<div className="flex flex-wrap items-center gap-2 py-4">
			<Button
				variant="outline"
				onClick={() => {
					toast("Settings saved", {
						icon: <Check className="w-5 h-5" />,
					})
				}}
			>
				Show Success Toast
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast("There was an error", {
						icon: <Warning className="w-5 h-5" />,
						action: {
							label: "Retry",
							onClick: () => console.log("Retry!"),
						},
					})
				}}
			>
				Show Error Toast
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast("Connection lost", {
						icon: <WifiOff className="w-5 h-5" />,
						action: {
							label: "Retry",
							onClick: () => console.log("Retry!"),
						},
					})
				}}
			>
				Show Connection Lost Toast
			</Button>
			<Button
				variant="outline"
				onClick={() => {
					toast("Something went wrong. Try again later.")
				}}
			>
				Show Default Toast
			</Button>
		</div>
	)
}
