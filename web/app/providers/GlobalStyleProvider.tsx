"use client"

import { Quicksand, SpaceMono, SourceCodePro400, Iosevka, NeueHaasGrotesk, Printvetica } from "@/fonts"
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
            --font-quicksand: ${Quicksand.style.fontFamily}, sans-serif;
            --font-space_mono: ${SpaceMono.style.fontFamily}, monospace;
            --font-sourcecode400: ${SourceCodePro400.style.fontFamily}, monospace;
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
