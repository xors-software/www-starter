"use client"

import { useReadContract, type UseReadContractParameters } from "wagmi"
import { useDeployedContractInfo } from "./useDeployedContractInfo"
import deployedContracts from "@/contracts/deployedContracts"
import type { Abi, AbiFunction } from "viem"

type ContractName = keyof (typeof deployedContracts)[keyof typeof deployedContracts]

type ExtractAbiFunctionNames<TAbi extends Abi> = Extract<
  TAbi[number],
  { type: "function"; stateMutability: "view" | "pure" }
>["name"]

/**
 * Scaffold-eth style hook for reading contract data.
 * Automatically resolves contract address and ABI from deployedContracts.
 */
export function useScaffoldReadContract<
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

  return useReadContract({
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
