/**
 * Contract type definitions for type-safe contract interactions.
 * This file provides the base types used by deployedContracts.ts
 * 
 * @generated
 */

import type { Abi, Address } from "viem"

export type InheritedFunctions = Record<string, string>

export type GenericContract = {
  address: Address
  abi: Abi
  inheritedFunctions?: InheritedFunctions
}

export type GenericContractsDeclaration = Record<
  number,
  Record<string, GenericContract>
>

/**
 * Utility type to extract contract names from deployed contracts
 */
export type ContractName<TContracts extends GenericContractsDeclaration> = {
  [ChainId in keyof TContracts]: keyof TContracts[ChainId]
}[keyof TContracts]

/**
 * Utility type to get a specific contract's type
 */
export type Contract<
  TContracts extends GenericContractsDeclaration,
  TName extends ContractName<TContracts>,
  TChainId extends keyof TContracts = keyof TContracts
> = TContracts[TChainId][TName]
