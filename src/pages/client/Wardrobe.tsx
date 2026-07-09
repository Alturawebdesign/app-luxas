import { useState } from 'react'
import type { Client, WardrobeItem } from '../../data/types'
import { StatusBadge } from '../../components/ui'
import { formatMoney } from '../../lib/format'

const CATEGORIES: (WardrobeItem['category'] | 'Toutes')[] = [
  'Toutes',
  'Pièce forte',
  'Veste',
  'Haut',
  'Bas',
  'Chaussures',
  'Accessoire',
]

export default function Wardrobe({ client }: { client: Client }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Toutes')
  const items = client.wardrobe.filter((i) => cat === 'Toutes' || i.category === cat)

  const budget = client.wardrobe.reduce((s, i) => s + i.price, 0)
  const acquired = client.wardrobe.filter((i) => i.status === 'Acquis').length
  const toBuy = client.wardrobe.filter((i) => i.status === 'À acquérir')
  const toBuyBudget = toBuy.reduce((s, i) => s + i.price, 0)

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard label="Pièces au total" value={`${client.wardrobe.length}`} sub="garde-robe stratégique" />
        <SummaryCard label="Déjà acquises" value={`${acquired}`} sub={`sur ${client.wardrobe.length} pièces`} />
        <SummaryCard label="Budget total" value={formatMoney(budget)} sub="valeur du dressing" />
        <SummaryCard label="Reste à acquérir" value={formatMoney(toBuyBudget)} sub={`${toBuy.length} pièces`} accent />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip border transition-colors ${
              cat === c
                ? 'border-ink bg-ink text-cream-50'
                : 'border-cream-300 bg-white text-ink-soft hover:bg-cream-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-5 py-3.5 font-semibold">Pièce</th>
                <th className="px-4 py-3.5 font-semibold">Catégorie</th>
                <th className="px-4 py-3.5 font-semibold">Marque</th>
                <th className="px-4 py-3.5 font-semibold">Prix</th>
                <th className="px-4 py-3.5 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-cream-100 last:border-0 hover:bg-cream-50">
                  <td className="px-5 py-3.5 font-medium text-ink">{i.name}</td>
                  <td className="px-4 py-3.5">
                    <span className="chip bg-cream-100 text-ink-soft">{i.category}</span>
                  </td>
                  <td className="px-4 py-3.5 text-ink-muted">{i.brand}</td>
                  <td className="px-4 py-3.5 text-ink-soft">{formatMoney(i.price)}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub: string
  accent?: boolean
}) {
  return (
    <div className={`card p-5 ${accent ? 'bg-gradient-to-br from-camel-500 to-camel-600 text-cream-50' : ''}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${accent ? 'text-cream-100/80' : 'text-ink-muted'}`}>
        {label}
      </p>
      <p className={`mt-2 font-serif text-2xl ${accent ? 'text-cream-50' : 'text-ink'}`}>{value}</p>
      <p className={`text-xs ${accent ? 'text-cream-100/70' : 'text-ink-muted'}`}>{sub}</p>
    </div>
  )
}
