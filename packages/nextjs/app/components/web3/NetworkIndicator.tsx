"use client"

import { useAccount, useSwitchChain } from "wagmi"
import { useTargetNetwork } from "@/hooks/scaffold-eth"
import { cn } from "@/utils/cn"
import { chains } from "@/config/wagmi"

interface NetworkIndicatorProps {
  className?: string
}

/**
 * Shows current network and allows switching.
 * Displays warning when on unsupported network.
 */
export function NetworkIndicator({ className }: NetworkIndicatorProps) {
  const { chain, isConnected } = useAccount()
  const { targetNetwork, isSupported } = useTargetNetwork()
  const { switchChain, isPending } = useSwitchChain()

  if (!isConnected) return null

  const isWrongNetwork = chain && !isSupported

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm",
        isWrongNetwork
          ? "bg-destructive/10 text-destructive border border-destructive/20"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          isWrongNetwork ? "bg-destructive" : "bg-green-500"
        )}
      />

      {isWrongNetwork ? (
        <div className="flex items-center gap-2">
          <span>Wrong network</span>
          <button
            onClick={() => switchChain?.({ chainId: targetNetwork.id })}
            disabled={isPending}
            className="underline underline-offset-2 hover:no-underline"
            type="button"
          >
            {isPending ? "Switching..." : `Switch to ${targetNetwork.name}`}
          </button>
        </div>
      ) : (
        <span>{chain?.name ?? targetNetwork.name}</span>
      )}
    </div>
  )
}

/**
 * Network selector dropdown
 */
export function NetworkSelector({ className }: { className?: string }) {
  const { chain } = useAccount()
  const { switchChain, isPending } = useSwitchChain()

  return (
    <select
      value={chain?.id}
      onChange={(e) => switchChain?.({ chainId: Number(e.target.value) })}
      disabled={isPending}
      className={cn(
        "px-3 py-1.5 rounded-lg text-sm",
        "bg-muted border border-border",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      {chains.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
