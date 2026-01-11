"use client"

import { useMemo } from "react"
import { useTargetNetwork } from "./useTargetNetwork"
import deployedContracts from "@/contracts/deployedContracts"
import type { GenericContractsDeclaration } from "@/contracts/contractTypes"

type ContractName = keyof (typeof deployedContracts)[keyof typeof deployedContracts]

/**
 * Get deployed contract info (address + ABI) for the current target network.
 * Similar to scaffold-eth's useDeployedContractInfo hook.
 */
export function useDeployedContractInfo<TContractName extends ContractName>(
  contractName: TContractName
) {
  const { targetNetwork } = useTargetNetwork()

  return useMemo(() => {
    const chainId = targetNetwork.id as keyof typeof deployedContracts
    const contracts = deployedContracts[chainId]

    if (!contracts) {
      return {
        data: undefined,
        isLoading: false,
      }
    }

    const contract = contracts[contractName as keyof typeof contracts]

    return {
      data: contract
        ? {
            address: contract.address as `0x${string}`,
            abi: contract.abi,
            chainId: targetNetwork.id,
          }
        : undefined,
      isLoading: false,
    }
  }, [targetNetwork.id, contractName])
}

/**
 * Get all deployed contracts for the current network
 */
export function useAllDeployedContracts() {
  const { targetNetwork } = useTargetNetwork()

  return useMemo(() => {
    const chainId = targetNetwork.id as keyof typeof deployedContracts
    return deployedContracts[chainId] ?? {}
  }, [targetNetwork.id])
}
