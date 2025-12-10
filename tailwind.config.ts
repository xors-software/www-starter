import { themes } from "./app/constants/themes"
import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config"
const { fontFamily } = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

export default {
	darkMode: ["class"],
	content: ["./app/**/*.{ts,tsx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		fontFamily: {
			hl: ["var(--font-printvetica)", ...fontFamily.sans],
			mono: ["var(--font-iosevka)", ...fontFamily.mono],
			sans: ["var(--font-neue-haas-grotesk)", ...fontFamily.sans],
		},
		dropShadow: {
			"2xs": "0px 0px 16px rgba(0, 0, 0, 0.1)",
			xs: "0px 4px 24px rgba(0, 0, 0, 0.15)",
			sm: "0px 4px 50px rgba(0, 0, 0, 0.15)",
		},
		fontSize: {
			"2xs": "0.625rem", // 10px
			xs: "0.75rem", // 12px
			sm: "0.875rem", // 14px
			base: "1rem", // 16px
			lg: "1.125rem", // 18px
			xl: "1.25rem", // 20px
			"2xl": "1.5rem", // 24px
			"3xl": "2rem", // 32px
			"4xl": "2.5rem", // 40px
			"5xl": "3rem", // 48px
			"6xl": "3.5rem", // 56px
			"7xl": "4rem", // 64px
			"8xl": "4.5rem", // 72px
			"9xl": "6rem", // 96px
			"10xl": "8rem", // 128px
		},
		variants: {
			extend: {
				opacity: ["group-hover"],
			},
		},
		extend: {
			colors: ({ colors }) => ({
				...themes.light,
			}),
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				"4xl": "2rem",
				"5xl": "2.5rem",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					from: {
						opacity: "0",
					},
					to: {
						opacity: "1",
					},
				},
				marquee: {
					"100%": {
						transform: "translateY(-50%)",
					},
				},
				"spin-reverse": {
					to: {
						transform: "rotate(-360deg)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s linear forwards",
				marquee: "marquee var(--marquee-duration) linear infinite",
				"spin-slow": "spin 4s linear infinite",
				"spin-slower": "spin 6s linear infinite",
				"spin-reverse": "spin-reverse 1s linear infinite",
				"spin-reverse-slow": "spin-reverse 4s linear infinite",
				"spin-reverse-slower": "spin-reverse 6s linear infinite",
			},
			maxWidth: {
				"2xl": "40rem",
			},
		},
	},
	plugins: [
		plugin(
			({
				addBase,
				addUtilities,
			}: {
				addBase: PluginAPI["addBase"]
				addUtilities: PluginAPI["addUtilities"]
			}) => {
				const customBaseStyles = {
					// StyleGuide:
					// - use a fj- prefix for custom classes so we know they're defined in this file
				}

				addBase(customBaseStyles)

				const customUtilities = {
					".scrolling-touch": {
						"-webkit-overflow-scrolling": "touch",
					},
				}

				addUtilities(customUtilities)
			},
		),
	],
} satisfies Config
