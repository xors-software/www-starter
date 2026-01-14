import localFont from "next/font/local"

// Each use of a 'next/font' is hosted as an instance in the app
// To reduce the number of instances, we can define a font once and reuse it throughout the app

// Neue Haas Grotesk with multiple weights and styles
const NeueHaasGrotesk = localFont({
	src: [
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayLight.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayLightItalic.ttf",
			weight: "300",
			style: "italic",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayRoman.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayRomanItalic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayMedium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayMediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayBold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./neuehaas-grotesk/NeueHaasDisplayBoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-neue-haas-grotesk",
	display: "swap",
})

// Printvetica font (only one weight/style available)
const Printvetica = localFont({
	src: "./printvetica/Printvetica.otf",
	variable: "--font-printvetica",
	display: "swap",
})

// Iosevka with multiple weights and styles for monospace text
const Iosevka = localFont({
	src: [
		{
			path: "./iosevka/Iosevka-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "./iosevka/Iosevka-LightItalic.ttf",
			weight: "300",
			style: "italic",
		},
		{
			path: "./iosevka/Iosevka-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "./iosevka/Iosevka-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "./iosevka/Iosevka-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "./iosevka/Iosevka-MediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "./iosevka/Iosevka-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "./iosevka/Iosevka-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
	],
	variable: "--font-iosevka",
	display: "swap",
})

// Exports from here should be added to:
// - GlobalStyleProvider, as CSS variables for use site-wide
// - The 'fontFamily' block of tailwind.config.js, so we can conveniently use them in Tailwind classes like 'font-mono'

export { Printvetica, Iosevka, NeueHaasGrotesk }
