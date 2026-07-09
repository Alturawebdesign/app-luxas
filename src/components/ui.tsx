import type { ReactNode } from 'react'
import type {
  ClientStatus,
  SessionStatus,
  DocumentStatus,
  LookStatus,
  WardrobeStatus,
  MilestoneStatus,
} from '../data/types'

/* ---------------------------------- Avatar --------------------------------- */
export function Avatar({
  initials,
  color,
  size = 40,
}: {
  initials: string
  color: string
  size?: number
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full font-serif font-medium text-cream-50"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color} 0%, ${shade(color, -18)} 100%)`,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  )
}

function shade(hex: string, percent: number) {
  const n = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const r = Math.max(0, Math.min(255, (n >> 16) + amt))
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt))
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/* -------------------------------- StatusBadge ------------------------------ */
type AnyStatus =
  | ClientStatus
  | SessionStatus
  | DocumentStatus
  | LookStatus
  | WardrobeStatus
  | MilestoneStatus

const STATUS_STYLES: Record<string, string> = {
  Actif: 'bg-sage-100 text-sage-600',
  Onboarding: 'bg-camel-50 text-camel-600',
  'En pause': 'bg-cream-200 text-ink-muted',
  Terminé: 'bg-ink/5 text-ink-soft',
  // sessions
  'À venir': 'bg-camel-50 text-camel-600',
  Réalisée: 'bg-sage-100 text-sage-600',
  Annulée: 'bg-red-50 text-red-500',
  // documents
  Signé: 'bg-sage-100 text-sage-600',
  Payé: 'bg-sage-100 text-sage-600',
  'En attente': 'bg-amber-50 text-amber-600',
  Envoyé: 'bg-camel-50 text-camel-600',
  // looks
  Validé: 'bg-sage-100 text-sage-600',
  Proposé: 'bg-camel-50 text-camel-600',
  'À retravailler': 'bg-amber-50 text-amber-600',
  // wardrobe
  Acquis: 'bg-sage-100 text-sage-600',
  'À acquérir': 'bg-camel-50 text-camel-600',
  'Dans le dressing': 'bg-cream-200 text-ink-muted',
  // milestone
  Fait: 'bg-sage-100 text-sage-600',
  'En cours': 'bg-camel-50 text-camel-600',
}

export function StatusBadge({ status }: { status: AnyStatus }) {
  return (
    <span className={`chip ${STATUS_STYLES[status] ?? 'bg-cream-200 text-ink-muted'}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  )
}

/* -------------------------------- ProgressBar ------------------------------ */
export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-cream-200 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-camel-300 to-camel-500 transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}

/* -------------------------------- ProgressRing ----------------------------- */
export function ProgressRing({
  value,
  size = 72,
  stroke = 7,
  label,
}: {
  value: number
  size?: number
  stroke?: number
  label?: ReactNode
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.max(0, Math.min(100, value)) / 100) * c
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#EDE8DF" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C7A277" />
            <stop offset="100%" stopColor="#8A5E3B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {label ?? <span className="font-serif text-lg text-ink">{value}%</span>}
      </div>
    </div>
  )
}

/* ---------------------------------- Section -------------------------------- */
export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="font-serif text-xl text-ink">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

/* ----------------------------------- Empty --------------------------------- */
export function EmptyState({ icon, title, hint }: { icon: ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-cream-300 py-14 text-center">
      <div className="mb-3 text-camel-300">{icon}</div>
      <p className="font-medium text-ink-soft">{title}</p>
      {hint && <p className="mt-1 text-sm text-ink-muted">{hint}</p>}
    </div>
  )
}
