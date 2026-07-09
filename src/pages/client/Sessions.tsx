import {
  ClipboardCheck,
  Video,
  ShoppingBag,
  MonitorSmartphone,
  Flag,
  MapPin,
  Clock,
} from 'lucide-react'
import type { Client, SessionType } from '../../data/types'
import { StatusBadge } from '../../components/ui'
import { formatDateLong } from '../../lib/format'

const TYPE_ICON: Record<SessionType, typeof Video> = {
  'Audit image': ClipboardCheck,
  Visio: Video,
  'Journée shopping': ShoppingBag,
  'Sélection en ligne': MonitorSmartphone,
  Bilan: Flag,
}

export default function Sessions({ client }: { client: Client }) {
  const sorted = [...client.sessions].sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = sorted.filter((s) => s.status === 'À venir')
  const past = sorted.filter((s) => s.status !== 'À venir')

  return (
    <div className="space-y-6">
      {upcoming.length > 0 && (
        <div>
          <h2 className="mb-3 font-serif text-lg text-ink">À venir</h2>
          <div className="space-y-3">
            {upcoming.map((s) => (
              <SessionRow key={s.id} session={s} highlight />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 font-serif text-lg text-ink">Historique</h2>
        <div className="space-y-3">
          {past.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
          {past.length === 0 && (
            <div className="card p-6 text-center text-sm text-ink-muted">Aucune séance passée.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function SessionRow({
  session,
  highlight,
}: {
  session: Client['sessions'][number]
  highlight?: boolean
}) {
  const Icon = TYPE_ICON[session.type]
  return (
    <div
      className={`card flex items-center gap-4 p-4 ${
        highlight ? 'border-camel-200 bg-camel-50/40' : ''
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          highlight ? 'bg-ink text-camel-200' : 'bg-cream-100 text-camel-500'
        }`}
      >
        <Icon size={19} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink">{session.type}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-muted">
          <span>{formatDateLong(session.date)}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} /> {session.time}</span>
          {session.location && (
            <span className="inline-flex items-center gap-1"><MapPin size={12} /> {session.location}</span>
          )}
        </div>
      </div>
      <StatusBadge status={session.status} />
    </div>
  )
}
