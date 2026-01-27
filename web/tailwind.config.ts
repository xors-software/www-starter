import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
import defaultTheme from "tailwindcss/defaultTheme"

const { fontFamily } = defaultTheme

export default {
	darkMode: "class",
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
			sans: ["var(--font-geist-sans)", ...fontFamily.sans],
			mono: ["var(--font-geist-mono)", ...fontFamily.mono],
		},
		dropShadow: {
			"2xs": "0px 0px 16px rgba(0, 0, 0, 0.1)",
			xs: "0px 4px 24px rgba(0, 0, 0, 0.15)",
			sm: "0px 4px 50px rgba(0, 0, 0, 0.15)",
		},
		fontSize: {
			"2xs": "0.625rem",
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			lg: "1.125rem",
			xl: "1.25rem",
			"2xl": "1.5rem",
			"3xl": "2rem",
			"4xl": "2.5rem",
			"5xl": "3rem",
			"6xl": "3.5rem",
			"7xl": "4rem",
			"8xl": "4.5rem",
			"9xl": "6rem",
			"10xl": "8rem",
		},
		variants: {
			extend: {
				opacity: ["group-hover"],
			},
		},
		extend: {
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
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				marquee: {
					"100%": { transform: "translateY(-50%)" },
				},
				"spin-reverse": {
					to: { transform: "rotate(-360deg)" },
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
		plugin(({ addBase, addUtilities }) => {
			addBase({})
			addUtilities({
				".scrolling-touch": {
					"-webkit-overflow-scrolling": "touch",
				},
			})
		}),
	],
} satisfies Config
