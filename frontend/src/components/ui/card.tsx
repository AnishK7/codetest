import { ReactNode } from 'react'

interface CardProps {
  title?: string
  subtitle?: string
  action?: ReactNode
  children: ReactNode
}

export function Card({ title, subtitle, action, children }: CardProps) {
  return (
    <div className="w-full rounded-2xl bg-white/70 backdrop-blur shadow-lg border border-slate-100 p-6 dark:bg-slate-900/70 dark:border-slate-800">
      {(title || subtitle || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>}
            {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}
