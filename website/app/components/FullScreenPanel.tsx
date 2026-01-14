import clsx from "clsx"

interface FullScreenPanelProps
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	> {}

export function FullScreenPanel({ className, children }: FullScreenPanelProps) {
	return (
		<div
			className={clsx(
				"w-dvh h-dvh flex items-center justify-center scroll bg-inherit snap-start",
				className,
			)}
		>
			{children}
		</div>
	)
}
