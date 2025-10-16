import type { Metadata } from 'next'
import './globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'

import { WalletProvider } from '@/components/providers/wallet-provider'

export const metadata: Metadata = {
  title: 'Solana Counter Dashboard',
  description: 'Connect your Solana wallet to manage and monitor the on-chain counter.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 antialiased">
        <WalletProvider>
          <div className="relative flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-72 w-72 translate-y-24 translate-x-24 rounded-full bg-sky-500/10 blur-3xl" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
