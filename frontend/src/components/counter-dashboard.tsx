'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCounter } from '@/hooks/use-counter'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'

export function CounterDashboard() {
  const { publicKey, connected } = useWallet()
  const { counter, isLoading, isUpdating, error, refresh, initialize, increment, clearError } = useCounter()

  const handleInitialize = async () => {
    if (!publicKey) return
    await initialize(publicKey.toBase58())
  }

  const handleIncrement = async () => {
    if (!publicKey) return
    await increment(publicKey.toBase58())
  }

  if (isLoading) {
    return (
      <Card title="Counter Dashboard">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
          <p className="mt-4 text-slate-400">Loading counter data...</p>
        </div>
      </Card>
    )
  }

  if (!connected) {
    return (
      <Card title="Counter Dashboard">
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 rounded-full bg-slate-800/60 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-slate-200">Wallet Not Connected</h3>
          <p className="text-slate-400">Please connect your wallet to interact with the counter</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {error && <Alert type="error" message={error} onClose={clearError} />}

      <Card
        title="Current Counter Value"
        subtitle={counter ? `Account: ${counter.account.slice(0, 8)}...${counter.account.slice(-8)}` : undefined}
        action={
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isUpdating}
            className="!text-white !border-white hover:!bg-white/10"
          >
            ↻ Refresh
          </Button>
        }
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-2 text-7xl font-bold text-primary-400">{counter?.value ?? 0}</div>
            <p className="text-sm text-slate-400">Total Counts</p>
          </div>
        </div>
      </Card>

      <Card title="Actions">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="mb-2 font-semibold text-slate-200">Initialize Counter</h3>
            <p className="mb-4 text-sm text-slate-400">
              Create a new counter account on-chain. This is required before you can increment.
            </p>
            <Button onClick={handleInitialize} isLoading={isUpdating} disabled={isUpdating} className="w-full">
              Initialize
            </Button>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-6">
            <h3 className="mb-2 font-semibold text-slate-200">Increment Counter</h3>
            <p className="mb-4 text-sm text-slate-400">
              Increase the counter value by 1. Make sure the counter is initialized first.
            </p>
            <Button
              onClick={handleIncrement}
              isLoading={isUpdating}
              disabled={isUpdating}
              variant="primary"
              className="w-full"
            >
              Increment +1
            </Button>
          </div>
        </div>
      </Card>

      {counter && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/20 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Connected Wallet:</span>
            <span className="font-mono">{publicKey?.toBase58()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
