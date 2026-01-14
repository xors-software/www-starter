import "./globals.css"
import "./custom.css"
import { cn } from "@/utils/cn"
import { APP_CONFIG } from "@/config"
import type { Metadata } from "next"
import { NeueHaasGrotesk, Printvetica, Iosevka } from "@/fonts/fonts"
import { Toaster } from "@/components/toasts/Toaster"
import { Web3Provider } from "@/providers/Web3Provider"

export const metadata: Metadata = {
	title: APP_CONFIG.NAME,
	description: APP_CONFIG.DESCRIPTION,
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="en"
			className={cn(
				Printvetica.variable,
				Iosevka.variable,
				NeueHaasGrotesk.variable,
			)}
		>
			<body>
				<Web3Provider>
					{children}
				</Web3Provider>
				<Toaster />
			</body>
		</html>
	)
}
