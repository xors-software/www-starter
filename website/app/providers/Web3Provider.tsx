"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { wagmiConfig } from "@/config/wagmi";
import { useState, type ReactNode } from "react";

interface Web3ProviderProps {
	children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
	// Create query client in state to prevent recreation on re-renders
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// Disable automatic refetching for most queries
						refetchOnWindowFocus: false,
						retry: 1,
					},
				},
			}),
	);

	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider
					mode="dark"
					options={{
						walletConnectCTA: "both",
					}}
				>
					{children}
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
