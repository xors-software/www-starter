"use client"

import { useWriteContract as useWagmiWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { useDeployedContractInfo } from "./useDeployedContractInfo"
import deployedContracts from "@/contracts/deployedContracts"
import type { Abi } from "viem"
import { useCallback } from "react"
import { toast } from "sonner"

type ContractName = keyof (typeof deployedContracts)[keyof typeof deployedContracts]

/**
 * Hook for writing to contracts.
 * Includes automatic toast notifications and transaction tracking.
 */
export function useWriteContract<TContractName extends ContractName>(
  contractName: TContractName
) {
  const { data: deployedContract } = useDeployedContractInfo(contractName)

  const {
    writeContract,
    writeContractAsync,
    data: hash,
    isPending,
    error,
    reset,
  } = useWagmiWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const write = useCallback(
    async ({
      functionName,
      args,
      value,
    }: {
      functionName: string
      args?: readonly unknown[]
      value?: bigint
    }) => {
      if (!deployedContract?.address) {
        toast.error("Contract not deployed on this network")
        return
      }

      try {
        const txHash = await writeContractAsync({
          address: deployedContract.address,
          abi: deployedContract.abi as Abi,
          functionName,
          args,
          value,
        })

        toast.success("Transaction submitted!", {
          description: `Hash: ${txHash.slice(0, 10)}...`,
        })

        return txHash
      } catch (err) {
        const message = err instanceof Error ? err.message : "Transaction failed"
        toast.error("Transaction failed", { description: message })
        throw err
      }
    },
    [deployedContract, writeContractAsync]
  )

  return {
    write,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    reset,
  }
}
