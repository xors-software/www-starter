"use client"

import { useBalance } from "wagmi"
import { formatEther } from "viem"
import { cn } from "@/utils/cn"
import { useTargetNetwork } from "@/hooks/contracts"

interface BalanceProps {
  address?: `0x${string}`
  className?: string
  /** Number of decimal places to show */
  decimals?: number
  /** Show currency symbol */
  showSymbol?: boolean
}

/**
 * Display ETH balance for an address.
 */
export function Balance({
  address,
  className,
  decimals = 4,
  showSymbol = true,
}: BalanceProps) {
  const { targetNetwork } = useTargetNetwork()

  const { data: balance, isLoading } = useBalance({
    address,
    chainId: targetNetwork.id,
    query: { enabled: !!address },
  })

  if (!address) {
    return (
      <span className={cn("text-muted-foreground", className)}>-</span>
    )
  }

  if (isLoading) {
    return (
      <span className={cn("animate-pulse text-muted-foreground", className)}>
        Loading...
      </span>
    )
  }

  if (!balance) {
    return (
      <span className={cn("text-muted-foreground", className)}>0</span>
    )
  }

  const formattedBalance = Number(formatEther(balance.value)).toFixed(decimals)

  return (
    <span className={cn("font-mono tabular-nums", className)}>
      {formattedBalance}
      {showSymbol && (
        <span className="ml-1 text-muted-foreground">
          {balance.symbol}
        </span>
      )}
    </span>
  )
}
