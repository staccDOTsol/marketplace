import React, { useEffect } from 'react'
import { useConnection } from '@solana/wallet-adapter-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { viewerVar } from '../../cache'
import { Connection } from '@solana/web3.js'

export const ViewerProvider: React.FC = ({ children }) => {
  const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_ENDPOINT as string)
  const { publicKey } = useWallet()

  useEffect(() => {
    ;(async () => {
      if (!publicKey) {
        return
      }

      try {
        const balance = await connection.getBalance(publicKey)

        viewerVar({
          balance,
          id: publicKey?.toBase58() as string,
          __typename: 'Viewer',
        })
      } catch (e) {
        console.error(e)
        return null
      }
    })()
  }, [publicKey])

  return <>{children}</>
}

export default ViewerProvider
