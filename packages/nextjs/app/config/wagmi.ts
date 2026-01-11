"use client"

import { http, createConfig, createStorage, cookieStorage } from "wagmi"
import { mainnet, sepolia, foundry } from "wagmi/chains"

// Chains to support
export const chains = [foundry, sepolia, mainnet] as const

// Create wagmi config without ConnectKit's getDefaultConfig
// This avoids React context issues in Next.js App Router
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [foundry.id]: http("http://localhost:8545"),
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
})

// Export chain types for use elsewhere
export type SupportedChainId = (typeof chains)[number]["id"]
