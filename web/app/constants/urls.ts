import { ACTIVE_NETWORK, IS_MAINNET } from '@/constants'

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

export const ALCHEMY_ETH_RPC_URL = IS_MAINNET
  ? `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
  : `https://${ACTIVE_NETWORK}.g.alcALCHEMY_ETH_RPC_URLhemy.com/v2/${ALCHEMY_API_KEY}`

export const ETHERSCAN_URI = IS_MAINNET
  ? 'https://etherscan.io'
  : `https://${ACTIVE_NETWORK}.etherscan.io`

// export const CHAIN_AWARE_OPENSEA_URL = IS_MAINNET ? `https://opensea.io` : `https://testnets.opensea.io`

export const AIR_STACK_URL =
  process.env.NEXT_PUBLIC_AIR_STACK_URL || 'https://api.airstack.xyz'
export const AIR_STACK_API_KEY = process.env.NEXT_PUBLIC_AIR_STACK_API_KEY || ''

const AUTH_3_API = process.env.NEXT_PUBLIC_AUTH_3_API || ''
// get user and verify code
export const AUTH_3_API_EMAIL_VERIFICATION_VERIFY = `${AUTH_3_API}/email-verification/verify`
// create a user and send verification code
export const AUTH_3_API_EMAIL_VERIFICATION_USER = `${AUTH_3_API}/email-verification/user`
export const AUTH_3_PROJECT_ID = process.env.NEXT_PUBLIC_AUTH_3_PROJECT_ID || ''
