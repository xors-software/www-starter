"use client"
// TODO: Uncomment when connectkit and wagmi are installed: npm install connectkit wagmi viem
// import { useMemo } from "react"
// import { useModal as useConnectKitModal } from "connectkit"
// import { useAccount } from "wagmi"

// For disconnected user, override button behavior to open connect modal
// + fallback to original button behavior if user is connected
export const useAuthBoundButton = (
	onClickAction: (() => void) | undefined,
): (() => void) | undefined => {
	// TODO: Uncomment when connectkit and wagmi are installed
	// const { setOpen } = useConnectKitModal()
	// const { address } = useAccount()
	// return useMemo(
	// 	() => (!address ? () => setOpen(true) : onClickAction),
	// 	[address, setOpen, onClickAction],
	// )
	return onClickAction
}
