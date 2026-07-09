import { Check, Loader2, Circle } from 'lucide-react'
import type { Client, MilestoneStatus } from '../../data/types'
import { ProgressRing } from '../../components/ui'

const ICONS: Record<MilestoneStatus, typeof Check> = {
  Fait: Check,
  'En cours': Loader2,
  'À venir': Circle,
}

export default function Program({ client }: { client: Client }) {
  const done = client.program.filter((m) => m.status === 'Fait').length
  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center gap-6 p-6">
        <ProgressRing value={client.kpis.progress} size={104} stroke={9} />
        <div>
          <h2 className="font-serif text-xl text-ink">Transformation en 30 jours</h2>
          <p className="mt-1 max-w-md text-sm text-ink-muted">
            {client.formule}. {done} étapes terminées sur {client.program.length}. Format WhatsApp +
            visio + journée shopping + sélection en ligne.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="card p-6">
        <div className="relative pl-2">
          {client.program.map((m, i) => {
            const Icon = ICONS[m.status]
            const isLast = i === client.program.length - 1
            const color =
              m.status === 'Fait'
                ? 'bg-sage-600 text-cream-50'
                : m.status === 'En cours'
                ? 'bg-camel-500 text-cream-50'
                : 'bg-cream-200 text-ink-muted'
            return (
              <div key={m.day} className="relative flex gap-4 pb-8 last:pb-0">
                {!isLast && (
                  <span
                    className={`absolute left-[15px] top-9 h-full w-0.5 ${
                      m.status === 'Fait' ? 'bg-sage-400/40' : 'bg-cream-200'
                    }`}
                  />
                )}
                <span
                  className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon size={15} className={m.status === 'En cours' ? 'animate-spin' : ''} />
                </span>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="chip bg-cream-100 text-ink-muted">Jour {m.day}</span>
                    <h3 className="font-medium text-ink">{m.title}</h3>
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">{m.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
