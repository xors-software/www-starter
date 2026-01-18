import localFont from "next/font/local"
import { Geist, Geist_Mono } from "next/font/google"

// Geist - Modern sans-serif from Vercel
const GeistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
	display: "swap",
})

// Geist Mono - Matching monospace font
const GeistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
	display: "swap",
})

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

export { GeistSans, GeistMono, Printvetica, Iosevka, NeueHaasGrotesk }
