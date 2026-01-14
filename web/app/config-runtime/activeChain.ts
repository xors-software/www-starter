// The active chain, as defined in the .env

import { getChainById } from "@/utils";
import { Chain } from "viem";

// This should NOT be moved from here into '@/constants/chains', as it would cause a circular dependency between '@/utils' and '@/constants'
export const ACTIVE_CHAIN: Chain | undefined = process.env.NEXT_PUBLIC_CHAIN_ID
  ? getChainById(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID))
  : undefined