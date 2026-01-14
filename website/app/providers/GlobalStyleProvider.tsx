"use client"

import { Iosevka, NeueHaasGrotesk, Printvetica } from "@/fonts"
import { useHasMounted } from "@/hooks"

type ProviderType = {
	children: React.ReactNode
}

export function GlobalStyleProvider({ children }: ProviderType) {
	const hasMounted = useHasMounted()

	return (
		<>
			{hasMounted && (
				<style>
					{`
          html {
            --font-iosevka: ${Iosevka.style.fontFamily}, monospace;
            --font-fraktion: ${Iosevka.style.fontFamily}, monospace;
            --font-neue-haas-grotesk: ${NeueHaasGrotesk.style.fontFamily}, sans-serif;
            --font-printvetica: ${Printvetica.style.fontFamily}, sans-serif;
          }
        `}
				</style>
			)}

			{children}
		</>
	)
}
