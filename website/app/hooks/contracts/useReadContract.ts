"use client"

import { useReadContract as useWagmiReadContract, type UseReadContractParameters } from "wagmi"
import { useDeployedContractInfo } from "./useDeployedContractInfo"
import deployedContracts from "@/contracts/deployedContracts"
import type { Abi } from "viem"

type ContractName = keyof (typeof deployedContracts)[keyof typeof deployedContracts]

/**
 * Hook for reading contract data.
 * Automatically resolves contract address and ABI from deployedContracts.
 */
export function useReadContract<
  TContractName extends ContractName,
  TFunctionName extends string = string,
>({
  contractName,
  functionName,
  args,
  ...readConfig
}: {
  contractName: TContractName
  functionName: TFunctionName
  args?: readonly unknown[]
} & Omit<UseReadContractParameters, "address" | "abi" | "functionName" | "args">) {
  const { data: deployedContract } = useDeployedContractInfo(contractName)

  return useWagmiReadContract({
    address: deployedContract?.address,
    abi: deployedContract?.abi as Abi,
    functionName,
    args,
    query: {
      enabled: !!deployedContract?.address,
      ...readConfig.query,
    },
    ...readConfig,
  })
}
