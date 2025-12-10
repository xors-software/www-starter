import { viemPublicClient } from "@/services"
import { isAddress } from "viem"
import { mainnet } from 'viem/chains'

export async function formatDisplayName(address: `0x${string}`) {
    if (address.endsWith('.eth')) {
        return address
    } else if (isAddress(address)) {
        const possibleENS = await viemPublicClient({ chainId: mainnet.id }).getEnsName({
            address,
        })

        return possibleENS ?? address
    }
}
