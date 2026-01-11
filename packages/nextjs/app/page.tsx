"use client"

import { Text } from "@/components"
import { ConnectButton, NetworkIndicator, Address, Balance } from "@/components/web3"
import { ContractDemo, WireframeSection } from "@/components/wireframes"
import { useAccount } from "wagmi"

export default function Home() {
  const { address, isConnected } = useAccount()

  return (
    <main className="min-h-dvh bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Text variant="heading-xxs" className="font-display">
              XORS
            </Text>
            <NetworkIndicator />
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <Text variant="heading-lg" className="font-display mb-2" asChild>
            <h1>Web3 Wireframes</h1>
          </Text>
          <Text variant="paragraph-md" className="text-muted-foreground max-w-xl mx-auto">
            A demonstration of scaffold-eth style contract hooks and web3 components. 
            Connect your wallet and interact with the deployed Counter contract.
          </Text>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contract Interaction */}
          <WireframeSection
            title="Counter Contract"
            description="Read and write to the deployed Counter contract using scaffold-eth style hooks."
          >
            <ContractDemo />
          </WireframeSection>

          {/* Components Showcase */}
          <div className="space-y-6">
            {/* Address Component */}
            <WireframeSection
              title="Address Component"
              description="Display addresses with ENS resolution and copy functionality."
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Your wallet:</span>
                  <Address address={address} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Vitalik.eth:</span>
                  <Address address="0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Full address:</span>
                  <Address address={address} full link={false} />
                </div>
              </div>
            </WireframeSection>

            {/* Balance Component */}
            <WireframeSection
              title="Balance Component"
              description="Display ETH balance for any address with configurable decimals."
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">Your balance:</span>
                  <Balance address={address} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">2 decimals:</span>
                  <Balance address={address} decimals={2} />
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">No symbol:</span>
                  <Balance address={address} showSymbol={false} />
                </div>
              </div>
            </WireframeSection>

            {/* Hooks Reference */}
            <WireframeSection
              title="Available Hooks"
              description="Scaffold-eth style hooks for contract interactions."
            >
              <div className="space-y-2 font-mono text-sm">
                <div className="p-2 bg-muted/30 rounded">
                  <code className="text-purple">useScaffoldReadContract</code>
                  <span className="text-muted-foreground ml-2">// Read contract state</span>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <code className="text-purple">useScaffoldWriteContract</code>
                  <span className="text-muted-foreground ml-2">// Write transactions</span>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <code className="text-purple">useDeployedContractInfo</code>
                  <span className="text-muted-foreground ml-2">// Get ABI & address</span>
                </div>
                <div className="p-2 bg-muted/30 rounded">
                  <code className="text-purple">useTargetNetwork</code>
                  <span className="text-muted-foreground ml-2">// Current chain</span>
                </div>
              </div>
            </WireframeSection>
          </div>
        </div>

        {/* Quick Start */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-border">
          <Text variant="heading-xs" className="mb-4">
            Quick Start
          </Text>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="p-4 bg-background rounded-xl">
              <div className="font-mono text-purple mb-2">1. Start local chain</div>
              <code className="text-muted-foreground">bun run chain</code>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <div className="font-mono text-purple mb-2">2. Deploy contracts</div>
              <code className="text-muted-foreground">bun run deploy:generate</code>
            </div>
            <div className="p-4 bg-background rounded-xl">
              <div className="font-mono text-purple mb-2">3. Start dev server</div>
              <code className="text-muted-foreground">bun run dev</code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Built with scaffold-eth style hooks • Foundry • Next.js
        </div>
      </footer>
    </main>
  )
}
