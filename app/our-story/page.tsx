import clsx from "clsx"
import Navigation from "@/components/Navigation"

import { Text } from "@/components/Text"

export default function OurStoryPage() {
	return (
		<main className="bg-background min-h-screen relative">
			<div
				className={clsx(
					"hidden md:block",
					"absolute inset-0",
					"bg-[url('/media/ascii-two-friends.png')] bg-no-repeat",
					"bg-[length:16rem_16rem] md:bg-[length:24rem_24rem] lg:bg-[length:32rem_32rem] xl:bg-[length:40rem_40rem]",
					"bg-[position:top_-0rem_right_-4rem] md:bg-[position:top_-2rem_right_-4rem] lg:bg-[position:top_-6rem_right_-6rem] xl:bg-[position:top_-8rem_right_-8rem]",
				)}
			/>
			<Navigation variant="static" />
			<section className={clsx("py-16 md:py-24 relative")}>
				<div
					className={clsx(
						"container mx-auto px-6",
						"grid md:grid-cols-2 gap-12 items-center",
					)}
				>
					<div>
						<Text variant="heading-lg" asChild className={clsx("mb-4")}>
							<h1>our story</h1>
						</Text>
						<Text variant="heading-xxs" asChild className={clsx("mb-16")}>
							<h2>on getting off our phones and into the real world</h2>
						</Text>
						<Text
							variant="paragraph-sm"
							asChild
							className={clsx("max-w-xs", "text-gray dark:text-gray")}
						>
							<div className="flex flex-col gap-4">
								<p>
									We are a social creative technology collective aiming to
									rebuild IRL community through free photo experiences that
									ground us in the present.
								</p>
								<p>
									We address the pre-industrial, the renaissance worthy, for the
									love of art and craft. We are a social creative technology
									collective aiming to rebuild IRL community through free photo
									experiences that ground us in the present.
								</p>
								<p>
									We address the pre-industrial, the renaissance worthy, for the
									love of art and craft.
								</p>
							</div>
						</Text>
					</div>
				</div>
			</section>
			<section className={clsx("py-8 md:py-12 relative flex justify-center")}>
				<div className={clsx("container mx-auto px-6 text-left")}>
					<Text
						variant="paragraph-xl"
						asChild
						className={clsx("text-6xl md:text-9xl", "mb-4")}
					>
						<h1>
							&quot;we&apos;re in this{" "}
							<span className="italic">renaissance</span> period where craft
							grounds us in the real world&quot;
						</h1>
					</Text>
				</div>
			</section>
			<section className={clsx("py-8 md:py-12 relative flex justify-center")}>
				<div className={clsx("px-6", "text-left")}>
					<Text
						variant="paragraph-lg"
						asChild
						className={clsx("max-w-lg", "mb-16", "text-gray dark:text-gray")}
					>
						<div className="flex flex-col gap-4">
							<p>
								We are a social creative technology collective aiming to rebuild
								IRL community through free photo experiences that ground us in
								the present.
							</p>
							<p>
								We address the pre-industrial, the renaissance worthy, for the
								love of art and craft. We are a social creative technology
								collective aiming to rebuild IRL community through free photo
								experiences that ground us in the present.
							</p>
							<p>
								We address the pre-industrial, the renaissance worthy, for the
								love of art and craft.
							</p>
						</div>
					</Text>
				</div>
			</section>
		</main>
	)
}
