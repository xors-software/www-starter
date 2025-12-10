"use client"

import clsx from "clsx"
import Link from "next/link"
import { Button } from "@/components/Button"
import { Home } from "@/components/icons/generated"

export default function Navigation({
	variant = "fixed",
}: { variant?: "fixed" | "static" }) {
	return (
		<nav
			className={clsx(
				variant === "fixed" ? "fixed top-0 left-0 right-0" : "relative",
			)}
		>
			<div
				className={clsx(
					"container mx-auto px-6 py-4",
					"flex justify-between items-center",
				)}
			>
				<Link href="/" className="font-bold text-xl">
					Logo
				</Link>
				<div className={clsx("flex items-center space-x-4")}>
					<Link href="/">
						<Home className={clsx("w-6 h-6")} />
					</Link>
					<div className="hidden md:flex items-center space-x-2">
						<Button variant="solid">
							<Link href="/">get started</Link>
						</Button>
						<Button
							variant="solid"
							className={clsx("text-foreground dark:text-background")}
						>
							<Link href="/login">sign in</Link>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	)
}
