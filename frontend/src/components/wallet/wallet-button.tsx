'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function WalletButton() {
  return <WalletMultiButton className="!bg-primary-600 hover:!bg-primary-700" />
}
