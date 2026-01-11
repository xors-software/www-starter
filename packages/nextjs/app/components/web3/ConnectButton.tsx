"use client"

import { ConnectKitButton } from "connectkit"
import { cn } from "@/utils/cn"

interface ConnectButtonProps {
  className?: string
  /** Show balance when connected */
  showBalance?: boolean
}

/**
 * Wallet connect button using ConnectKit.
 * Styled to match the app's design system.
 */
export function ConnectButton({ className, showBalance = true }: ConnectButtonProps) {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, address, ensName, chain }) => {
        return (
          <button
            onClick={show}
            type="button"
            className={cn(
              "inline-flex items-center justify-center gap-2 px-4 py-2",
              "bg-foreground text-background font-medium text-sm",
              "rounded-lg transition-all duration-200",
              "hover:opacity-90 active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className
            )}
          >
            {isConnecting ? (
              <>
                <span className="animate-spin">◌</span>
                Connecting...
              </>
            ) : isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
