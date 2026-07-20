import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

/* ---------------------------------- Logo ----------------------------------- */
export function Logo({ size = 40 }: { size?: number; dark?: boolean }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl shadow-glow"
      style={{ width: size, height: size, background: 'linear-gradient(140deg, #3B82F6 0%, #2563EB 60%, #1D4ED8 100%)' }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 64 64" fill="none">
        <path d="M12 42 L26 20 L33 31 L42 16 L52 42" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="16" r="4" fill="#7DD3FC" />
      </svg>
    </div>
  )
}

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
      className="flex shrink-0 items-center justify-center rounded-xl font-display font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color} 0%, ${shade(color, -16)} 100%)`,
        fontSize: size * 0.36,
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
const STATUS_STYLES: Record<string, string> = {
  // client — succès en vert
  Actif: 'bg-green-100 text-green-700',
  Onboarding: 'bg-emerald-100 text-emerald-700',
  'En pause': 'bg-paper-200 text-ink-muted',
  Terminé: 'bg-slate-200/70 text-slate-600',
  // posts
  Publié: 'bg-green-100 text-green-700',
  Programmé: 'bg-emerald-100 text-emerald-700',
  Brouillon: 'bg-amber-100 text-amber-700',
  Idée: 'bg-paper-200 text-ink-muted',
  // phase / todo
  Terminée: 'bg-green-100 text-green-700',
  'En cours': 'bg-emerald-100 text-emerald-700',
  'À venir': 'bg-paper-200 text-ink-muted',
  Fait: 'bg-green-100 text-green-700',
  'À faire': 'bg-paper-200 text-ink-muted',
  // documents
  Signé: 'bg-green-100 text-green-700',
  Payé: 'bg-green-100 text-green-700',
  'En attente': 'bg-amber-100 text-amber-700',
  Disponible: 'bg-sky-100 text-sky-700',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`chip ${STATUS_STYLES[status] ?? 'bg-paper-200 text-ink-muted'}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  )
}

/* ---------------------------------- Delta ---------------------------------- */
export function Delta({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const up = value >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
        up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
      }`}
    >
      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {up ? '+' : ''}
      {value}
      {suffix}
    </span>
  )
}

/* -------------------------------- ProgressBar ------------------------------ */
export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-paper-200 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500"
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
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#DCE5F5" strokeWidth={stroke} />
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
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {label ?? <span className="stat text-lg text-ink">{value}%</span>}
      </div>
    </div>
  )
}
