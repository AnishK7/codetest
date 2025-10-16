import { CounterDashboard } from '@/components/counter-dashboard'
import { WalletButton } from '@/components/wallet/wallet-button'
import { WalletStatus } from '@/components/wallet/wallet-status'

export default function Home() {
  return (
    <main className="relative flex-1">
      <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">Solana Counter</h1>
            <p className="text-sm text-slate-400 sm:text-base">
              Monitor and control your on-chain counter with wallet connectivity
            </p>
          </div>
          <WalletButton />
        </div>
      </header>

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <WalletStatus />
        <CounterDashboard />
      </section>

      <footer className="mt-auto border-t border-white/10 bg-slate-950/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Powered by Solana Wallet Adapter</span>
          <span>Responsive UI built with Next.js & Tailwind CSS</span>
        </div>
      </footer>
    </main>
  )
}
