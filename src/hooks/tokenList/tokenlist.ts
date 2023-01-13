import { ENV, TokenInfo, TokenListProvider } from '@solana/spl-token-registry'
import { useEffect, useState } from 'react'

type TokenMap = Map<string, TokenInfo>

export const useTokenList = (): [TokenMap, boolean] => {
  const [tokenMap, setTokenMap] = useState<TokenMap>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    new TokenListProvider().resolve().then((tokens) => {
      const tokenList = [...tokens.filterByChainId(ENV.MainnetBeta).getList(), ...[
        {
          address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
          symbol: 'BONK',
          decimals: 5,
        },
        {
          address: 'FfpyoV365c7iR8QQg5NHGCXQfahbqzY67B3wpzXkiLXr',
          symbol: 'BOO',
          decimals: 6,
        },
        { 
          address: "5yxNbU8DgYJZNi3mPD9rs4XLh9ckXrhPjJ5VCujUWg5H",
          symbol: "FRONK",
          decimals: 5
        }
      ]]
      setTokenMap(
        tokenList.reduce((map, item) => {
          map.set(item.address, item)
          return map
        }, new Map())
      )
      setLoading(false)
    })
  }, [setTokenMap])

  return [tokenMap, loading]
}
