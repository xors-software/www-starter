"use client"

import { Button, Text } from "@/components"
import { Check, Home as HomeIcon, Warning, WifiOff } from "@/components/icons/generated"
import { toast } from "sonner"

export default function Home() {
	return (
		<main className="min-h-dvh bg-background">
			{/* Header */}
			<header className="border-b border-border">
				<div className="container mx-auto px-6 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
							<span className="text-background font-bold text-sm">X</span>
						</div>
						<span className="font-semibold">XORS Starter</span>
					</div>
					<nav className="flex items-center gap-6">
						<a href="#components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Components
						</a>
						<a href="#typography" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							Typography
						</a>
						<a href="https://github.com" target="_blank" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
							GitHub
						</a>
					</nav>
				</div>
			</header>

			{/* Hero */}
			<section className="container mx-auto px-6 py-24 text-center">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-sm text-muted-foreground mb-6">
					<span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
					Next.js + Tailwind + Elysia
				</div>
				<h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
					Build faster with
					<br />
					<span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
						modern foundations
					</span>
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
					A full-stack monorepo starter with Next.js frontend and Elysia backend.
					Batteries included for rapid development.
				</p>
			</section>

			{/* Component Showcase */}
			<section id="components" className="border-t border-border bg-muted/30">
				<div className="container mx-auto px-6 py-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-2">Component Library</h2>
						<p className="text-muted-foreground">Pre-built components ready for use</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Buttons Card */}
						<ComponentCard title="Buttons" description="Multiple variants and sizes">
							<div className="flex flex-wrap gap-3">
								<Button variant="default">Default</Button>
								<Button variant="solid">Solid</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="faded">Faded</Button>
							</div>
							<div className="flex flex-wrap gap-3 mt-3">
								<Button size="small">Small</Button>
								<Button size="default">Default</Button>
								<Button size="large">Large</Button>
							</div>
						</ComponentCard>

						{/* Icons Card */}
						<ComponentCard title="Icons" description="SVG icons as React components">
							<div className="flex items-center gap-4">
								<IconDisplay icon={<HomeIcon className="w-5 h-5" />} label="Home" />
								<IconDisplay icon={<Check className="w-5 h-5" />} label="Check" />
								<IconDisplay icon={<Warning className="w-5 h-5" />} label="Warning" />
								<IconDisplay icon={<WifiOff className="w-5 h-5" />} label="WifiOff" />
							</div>
							<p className="text-xs text-muted-foreground mt-3">
								Drop SVGs in <code className="bg-muted px-1 rounded">/icon-svg</code> and run <code className="bg-muted px-1 rounded">bun build-icons</code>
							</p>
						</ComponentCard>

						{/* Toasts Card */}
						<ComponentCard title="Toasts" description="Notification system with Sonner">
							<div className="flex flex-wrap gap-2">
								<button
									onClick={() => toast.success("Action completed!", { description: "Your changes have been saved." })}
									className="px-3 py-1.5 text-xs rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
								>
									Success
								</button>
								<button
									onClick={() => toast.error("Something went wrong", { description: "Please try again later." })}
									className="px-3 py-1.5 text-xs rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
								>
									Error
								</button>
								<button
									onClick={() => toast.warning("Connection unstable", { description: "Check your network." })}
									className="px-3 py-1.5 text-xs rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
								>
									Warning
								</button>
								<button
									onClick={() => toast("Default notification", { description: "This is a message." })}
									className="px-3 py-1.5 text-xs rounded-md bg-muted text-foreground hover:bg-muted/80 transition-colors"
								>
									Default
								</button>
							</div>
						</ComponentCard>

						{/* Colors Card */}
						<ComponentCard title="Colors" description="Semantic color tokens">
							<div className="grid grid-cols-4 gap-2">
								<ColorSwatch color="bg-background" label="BG" border />
								<ColorSwatch color="bg-foreground" label="FG" />
								<ColorSwatch color="bg-primary" label="Primary" />
								<ColorSwatch color="bg-secondary" label="Secondary" />
								<ColorSwatch color="bg-muted" label="Muted" />
								<ColorSwatch color="bg-accent" label="Accent" />
								<ColorSwatch color="bg-destructive" label="Destructive" />
								<ColorSwatch color="bg-border" label="Border" />
							</div>
						</ComponentCard>

						{/* Spacing Card */}
						<ComponentCard title="Spacing" description="Consistent spacing scale">
							<div className="flex items-end gap-1">
								{[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
									<div key={size} className="flex flex-col items-center gap-1">
										<div
											className="bg-foreground/20 rounded"
											style={{ width: size * 4, height: size * 4 }}
										/>
										<span className="text-[10px] text-muted-foreground">{size}</span>
									</div>
								))}
							</div>
						</ComponentCard>

						{/* Radius Card */}
						<ComponentCard title="Border Radius" description="Rounded corner tokens">
							<div className="flex items-center gap-3">
								<div className="w-12 h-12 bg-muted border border-border rounded-sm flex items-center justify-center text-xs text-muted-foreground">sm</div>
								<div className="w-12 h-12 bg-muted border border-border rounded-md flex items-center justify-center text-xs text-muted-foreground">md</div>
								<div className="w-12 h-12 bg-muted border border-border rounded-lg flex items-center justify-center text-xs text-muted-foreground">lg</div>
								<div className="w-12 h-12 bg-muted border border-border rounded-xl flex items-center justify-center text-xs text-muted-foreground">xl</div>
								<div className="w-12 h-12 bg-muted border border-border rounded-full flex items-center justify-center text-xs text-muted-foreground">full</div>
							</div>
						</ComponentCard>
					</div>
				</div>
			</section>

			{/* Typography Section */}
			<section id="typography" className="border-t border-border">
				<div className="container mx-auto px-6 py-16">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-2">Typography</h2>
						<p className="text-muted-foreground">Text component with semantic variants</p>
					</div>

					<div className="max-w-3xl mx-auto space-y-8">
						{/* Headings */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Headings</h3>
							<div className="space-y-3 p-6 rounded-lg border border-border bg-card">
								<Text variant="heading-xl">Heading XL</Text>
								<Text variant="heading-lg">Heading LG</Text>
								<Text variant="heading-md">Heading MD</Text>
								<Text variant="heading-sm">Heading SM</Text>
								<Text variant="heading-xs">Heading XS</Text>
								<Text variant="heading-xxs">Heading XXS</Text>
							</div>
						</div>

						{/* Paragraphs */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Paragraphs</h3>
							<div className="space-y-3 p-6 rounded-lg border border-border bg-card">
								<Text variant="paragraph-xxl">Paragraph XXL - Large display text</Text>
								<Text variant="paragraph-xl">Paragraph XL - Subheading text</Text>
								<Text variant="paragraph-lg">Paragraph LG - Lead paragraph text</Text>
								<Text variant="paragraph-md">Paragraph MD - Body text for content</Text>
								<Text variant="paragraph-sm">Paragraph SM - Secondary text and captions</Text>
								<Text variant="paragraph-xs">Paragraph XS - Fine print and labels</Text>
							</div>
						</div>

						{/* Accent/Mono */}
						<div className="space-y-4">
							<h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Accent (Monospace)</h3>
							<div className="space-y-3 p-6 rounded-lg border border-border bg-card">
								<Text variant="accent-lg">accent-lg: Code blocks and technical</Text>
								<Text variant="accent-md">accent-md: Inline code and values</Text>
								<Text variant="accent-sm">accent-sm: Timestamps and metadata</Text>
								<Text variant="accent-xs">accent-xs: Fine technical details</Text>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border bg-muted/30">
				<div className="container mx-auto px-6 py-8">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-sm text-muted-foreground">
							Built with Next.js, Tailwind CSS, and Elysia
						</p>
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<a href="#" className="hover:text-foreground transition-colors">Documentation</a>
							<a href="#" className="hover:text-foreground transition-colors">GitHub</a>
							<a href="#" className="hover:text-foreground transition-colors">Discord</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
	)
}

/* Helper Components */

function ComponentCard({
	title,
	description,
	children,
}: {
	title: string
	description: string
	children: React.ReactNode
}) {
	return (
		<div className="rounded-xl border border-border bg-card p-6">
			<h3 className="font-semibold mb-1">{title}</h3>
			<p className="text-sm text-muted-foreground mb-4">{description}</p>
			{children}
		</div>
	)
}

function IconDisplay({ icon, label }: { icon: React.ReactNode; label: string }) {
	return (
		<div className="flex flex-col items-center gap-1">
			<div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
				{icon}
			</div>
			<span className="text-xs text-muted-foreground">{label}</span>
		</div>
	)
}

function ColorSwatch({ color, label, border }: { color: string; label: string; border?: boolean }) {
	return (
		<div className="flex flex-col items-center gap-1">
			<div className={`w-10 h-10 rounded-lg ${color} ${border ? "border border-border" : ""}`} />
			<span className="text-[10px] text-muted-foreground">{label}</span>
		</div>
	)
}
