"use client"

import { useAccount } from "wagmi"
import { chains, type SupportedChainId } from "@/config/wagmi"
import { foundry } from "wagmi/chains"

/**
 * Get the target network for contract interactions.
 * Returns the connected chain if supported, otherwise falls back to default.
 */
export function useTargetNetwork() {
  const { chain } = useAccount()

  // Default to foundry (local) for development
  const defaultChain = foundry

  // Check if connected chain is supported
  const targetNetwork = chains.find((c) => c.id === chain?.id) ?? defaultChain

  return {
    targetNetwork,
    isSupported: chain ? chains.some((c) => c.id === chain.id) : false,
  }
}

/**
 * Get chain by ID
 */
export function getChainById(chainId: SupportedChainId) {
  return chains.find((c) => c.id === chainId)
}
