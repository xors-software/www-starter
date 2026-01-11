"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import {
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useDeployedContractInfo,
} from "@/hooks/scaffold-eth"
import { Address, Balance } from "@/components/web3"
import { cn } from "@/utils/cn"

/**
 * Demo component showing contract read/write capabilities.
 * Uses the Counter contract as an example.
 */
export function ContractDemo() {
  const { address: connectedAddress, isConnected } = useAccount()
  const { data: counterContract } = useDeployedContractInfo("Counter")
  const [newNumber, setNewNumber] = useState("")

  // Read current number from contract
  const { data: currentNumber, refetch } = useScaffoldReadContract({
    contractName: "Counter",
    functionName: "number",
  })

  // Write hook for contract interactions
  const { write, isPending, isConfirming, isConfirmed } =
    useScaffoldWriteContract("Counter")

  const handleIncrement = async () => {
    await write({ functionName: "increment" })
    refetch()
  }

  const handleSetNumber = async () => {
    if (!newNumber) return
    await write({
      functionName: "setNumber",
      args: [BigInt(newNumber)],
    })
    setNewNumber("")
    refetch()
  }

  return (
    <div className="space-y-6">
      {/* Contract Info */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Contract Info
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <Address address={counterContract?.address as `0x${string}`} />
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Chain ID:</span>
            <span className="font-mono">{counterContract?.chainId}</span>
          </div>
        </div>
      </div>

      {/* Current Value */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-purple/10 to-brand-3/10 border border-purple/20">
        <div className="text-center">
          <div className="text-muted-foreground text-sm mb-1">Current Number</div>
          <div className="text-5xl font-bold font-mono tabular-nums">
            {currentNumber?.toString() ?? "—"}
          </div>
        </div>
      </div>

      {/* Actions */}
      {isConnected ? (
        <div className="space-y-4">
          {/* Increment Button */}
          <button
            onClick={handleIncrement}
            disabled={isPending || isConfirming}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium",
              "bg-foreground text-background",
              "hover:opacity-90 transition-opacity",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center justify-center gap-2"
            )}
          >
            {isPending || isConfirming ? (
              <>
                <span className="animate-spin">◌</span>
                {isPending ? "Confirming..." : "Processing..."}
              </>
            ) : (
              "Increment (+1)"
            )}
          </button>

          {/* Set Number */}
          <div className="flex gap-2">
            <input
              type="number"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              placeholder="Enter new number"
              className={cn(
                "flex-1 px-4 py-3 rounded-lg",
                "bg-muted border border-border",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                "font-mono"
              )}
            />
            <button
              onClick={handleSetNumber}
              disabled={!newNumber || isPending || isConfirming}
              className={cn(
                "px-6 py-3 rounded-lg font-medium",
                "bg-secondary text-secondary-foreground",
                "hover:opacity-90 transition-opacity",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Set
            </button>
          </div>

          {/* Connected Account Info */}
          <div className="p-3 rounded-lg bg-muted/30 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Your address:</span>
              <Address address={connectedAddress} />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-muted-foreground">Balance:</span>
              <Balance address={connectedAddress} />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/30 text-center text-muted-foreground">
          Connect your wallet to interact with the contract
        </div>
      )}
    </div>
  )
}
