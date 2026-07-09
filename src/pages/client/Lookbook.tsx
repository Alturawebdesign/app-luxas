import { Shirt, Check } from 'lucide-react'
import type { Client } from '../../data/types'
import { StatusBadge } from '../../components/ui'

export default function Lookbook({ client }: { client: Client }) {
  const validated = client.looks.filter((l) => l.status === 'Validé').length
  return (
    <div className="space-y-6">
      <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h2 className="font-serif text-xl text-ink">Lookbook</h2>
          <p className="text-sm text-ink-muted">
            {validated} looks validés sur {client.looks.length} composés
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-40 overflow-hidden rounded-full bg-cream-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-camel-300 to-camel-500"
              style={{ width: `${(validated / client.looks.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-ink">
            {Math.round((validated / client.looks.length) * 100)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {client.looks.map((look) => (
          <div key={look.id} className="card group flex flex-col overflow-hidden">
            {/* Visual header */}
            <div
              className="relative flex h-32 items-center justify-center"
              style={{
                background:
                  look.status === 'Validé'
                    ? 'linear-gradient(135deg, #EBDCC7 0%, #D9BE9C 100%)'
                    : 'linear-gradient(135deg, #F5F2EC 0%, #EDE8DF 100%)',
              }}
            >
              <Shirt size={40} className="text-ink/25" />
              <div className="absolute right-3 top-3">
                <StatusBadge status={look.status} />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-lg text-ink">{look.title}</h3>
              <p className="text-xs uppercase tracking-wide text-camel-600">{look.occasion}</p>
              <ul className="mt-3 space-y-1.5">
                {look.pieces.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
                    <Check size={13} className="shrink-0 text-camel-400" /> {p}
                  </li>
                ))}
              </ul>
              {look.note && (
                <p className="mt-3 rounded-lg bg-cream-100 px-3 py-2 text-xs italic text-ink-muted">
                  {look.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
