"use server"
import { FullScreenPanel, Text } from "@/components"
import { ToastTest } from "@/components/tests/ToastTest"

export default async function Home() {
	return (
		<main className="snap-y snap-mandatory h-dvh overflow-y-scroll">
			<FullScreenPanel>
				<div className="flex flex-col gap-2 md:max-w-[50dvw] lg:max-w-[600px] p-6 md:p-0">
					<Text variant="heading-xxs" asChild>
						<h1>XORS Starter</h1>
					</Text>

					<Text variant="paragraph-md">A Next.js website starter template.</Text>

					<ul className="flex flex-col gap-1">
						<li>
							<Text variant="heading-md" className="font-display">
								Display Font Heading Test
							</Text>
						</li>
					</ul>
					<ToastTest />
				</div>
			</FullScreenPanel>

			<FullScreenPanel>
				<div className="flex flex-col gap-4 md:max-w-[50dvw] lg:max-w-[600px] p-6 md:p-0">
					<Text variant="heading-xxs">Page 2</Text>

					<Text variant="paragraph-md">Here's a second page</Text>
				</div>
			</FullScreenPanel>
		</main>
	)
}
