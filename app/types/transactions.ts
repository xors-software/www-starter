export const TxState = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const
export type TransactionState = (typeof TxState)[keyof typeof TxState]
