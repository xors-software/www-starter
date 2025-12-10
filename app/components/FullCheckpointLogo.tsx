import clsx from "clsx"
import { CheckpointLogoFinal } from "@/components/icons/generated"

interface FullCheckpointLogoProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: "small" | "medium"
}

export default function FullCheckpointLogo({
	className,
	size = "medium",
}: FullCheckpointLogoProps) {
	return (
		<div className={clsx("flex items-center space-x-2", className)}>
			<CheckpointLogoFinal
				className={clsx({
					"w-[150px] h-[36px]": size === "small",
					"w-[200px] h-[48px]": size === "medium",
				})}
			/>
		</div>
	)
}
