"use client"

import { useEnsName, useEnsAvatar } from "wagmi"
import { mainnet } from "wagmi/chains"
import { cn } from "@/utils/cn"

interface AddressProps {
  address?: `0x${string}`
  className?: string
  /** Show full address instead of truncated */
  full?: boolean
  /** Link to block explorer */
  link?: boolean
  /** Show copy button */
  copy?: boolean
  /** Show ENS avatar if available */
  showAvatar?: boolean
}

/**
 * Display an Ethereum address with optional ENS resolution.
 */
export function Address({
  address,
  className,
  full = false,
  link = true,
  copy = true,
  showAvatar = true,
}: AddressProps) {
  // ENS lookup (only on mainnet)
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
    query: { enabled: !!address },
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    query: { enabled: !!ensName && showAvatar },
  })

  if (!address) {
    return (
      <span className={cn("text-muted-foreground animate-pulse", className)}>
        0x...
      </span>
    )
  }

  const displayAddress = full
    ? address
    : `${address.slice(0, 6)}...${address.slice(-4)}`

  const displayName = ensName ?? displayAddress

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
  }

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-sm",
        className
      )}
    >
      {ensAvatar && showAvatar && (
        <img
          src={ensAvatar}
          alt={ensName ?? address}
          className="w-4 h-4 rounded-full"
        />
      )}
      <span className="truncate">{displayName}</span>
      {copy && (
        <button
          onClick={handleCopy}
          className="opacity-50 hover:opacity-100 transition-opacity"
          title="Copy address"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
      )}
    </span>
  )

  if (link) {
    return (
      <a
        href={`https://etherscan.io/address/${address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline underline-offset-2"
      >
        {content}
      </a>
    )
  }

  return content
}
