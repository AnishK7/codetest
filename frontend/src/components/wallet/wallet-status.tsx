'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'

export function WalletStatus() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [slot, setSlot] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchSlot = async () => {
      try {
        const currentSlot = await connection.getSlot('processed')
        if (isMounted) {
          setSlot(currentSlot)
        }
      } catch (error) {
        console.error('Failed to fetch slot', error)
      }
    }

    if (connected) {
      fetchSlot()
    } else {
      setSlot(null)
    }

    const interval = connected ? setInterval(fetchSlot, 15_000) : null

    return () => {
      isMounted = false
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [connected, connection])

  return (
    <div className="flex flex-wrap gap-2 text-sm text-slate-300">
      <span
        className={`flex items-center gap-2 rounded-full px-3 py-1 font-medium ${connected ? 'bg-emerald-500/10 text-emerald-300' : 'bg-slate-700/60 text-slate-200'}`}
      >
        <span className={`h-2 w-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
        {connected ? 'Wallet connected' : 'Wallet disconnected'}
      </span>
      {connected && publicKey && (
        <span className="flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1 font-mono text-slate-200">
          {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
        </span>
      )}
      {slot !== null && (
        <span className="flex items-center gap-2 rounded-full bg-slate-800/60 px-3 py-1">
          Slot #{slot}
        </span>
      )}
    </div>
  )
}
