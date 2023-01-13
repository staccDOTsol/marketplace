import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { equals } from 'ramda'

export const toSOL = (lamports: number, precision: number = 5) => {
  var multiplier = Math.pow(10, precision)

  return Math.round((lamports / 10 ** 5) * multiplier) / multiplier
}

export const NATIVE_MINT_ADDRESS = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'

export const isSol = equals(NATIVE_MINT_ADDRESS)
