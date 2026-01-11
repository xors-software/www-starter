// TODO: Change brand palette on sync.
const brand = {
	"1": "hsla(23, 100%, 50%, 1)",
	"2": "hsla(120, 65%, 45%, 1)",
	"3": "hsla(194, 87%, 57%, 1)",
	"4": "hsla(230, 78%, 65%, 1)",
	"5": "hsla(0, 0%, 82%, 1)",
}

const monochrome = {
	white: {
		"100": "rgba(255, 255, 255, 1)",
		"90": "rgba(255, 255, 255, 0.9)",
		"80": "rgba(255, 255, 255, 0.8)",
		"70": "rgba(255, 255, 255, 0.7)",
		"60": "rgba(255, 255, 255, 0.6)",
		"50": "rgba(255, 255, 255, 0.5)",
		"40": "rgba(255, 255, 255, 0.4)",
		"30": "rgba(255, 255, 255, 0.3)",
		"20": "rgba(255, 255, 255, 0.2)",
		"10": "rgba(255, 255, 255, 0.1)",
		"5": "rgba(255, 255, 255, 0.05)",
		"0": "rgba(255, 255, 255, 0)",
	},
	black: {
		"100": "rgba(0, 0, 0, 1)",
		"90": "rgba(0, 0, 0, 0.9)",
		"80": "rgba(0, 0, 0, 0.8)",
		"70": "rgba(0, 0, 0, 0.7)",
		"60": "rgba(0, 0, 0, 0.6)",
		"50": "rgba(0, 0, 0, 0.5)",
		"40": "rgba(0, 0, 0, 0.4)",
		"30": "rgba(0, 0, 0, 0.3)",
		"20": "rgba(0, 0, 0, 0.2)",
		"10": "rgba(0, 0, 0, 0.1)",
		"5": "rgba(0, 0, 0, 0.05)",
		"0": "rgba(255, 255, 255, 0)",
	},
}

export const themes = {
  light: {
    monochrome,
    brand,
    gray: "hsl(0, 0%, 50%)",
    border: "hsl(214.3, 31.8%, 91.4%)",
    input: "hsl(214.3, 31.8%, 91.4%)",
    ring: "hsl(215, 20.2%, 65.1%)",
    background: "hsl(0, 0%, 90.59%)",
    foreground: "hsl(222.2, 84%, 4.9%)",
    heading: "#0C0C0C",
    primary: {
      DEFAULT: "hsl(222.2, 47.4%, 11.2%)",
      foreground: "hsl(210, 40%, 98%)",
    },
    secondary: {
      DEFAULT: "hsl(210, 40%, 96.1%)",
      foreground: "hsl(222.2, 47.4%, 11.2%)",
    },
    destructive: {
      DEFAULT: "hsl(0, 84.2%, 60.2%)",
      foreground: "hsl(210, 40%, 98%)",
    },
    muted: {
      DEFAULT: "hsl(210, 40%, 96.1%)",
      foreground: "hsl(215.4, 16.3%, 46.9%)",
    },
    accent: {
      DEFAULT: "hsl(210, 40%, 96.1%)",
      foreground: "hsl(222.2, 47.4%, 11.2%)",
    },
    popover: {
      DEFAULT: "hsl(0, 0%, 100%)",
      foreground: "hsl(222.2, 84%, 4.9%)",
    },
    card: {
      DEFAULT: "hsl(0, 0%, 100%)",
      foreground: "hsl(222.2, 84%, 4.9%)",
    },
    purple: "#644CF7",
    "purple-fade": "rgba(100, 76, 247, 0.10)",
  }
}
