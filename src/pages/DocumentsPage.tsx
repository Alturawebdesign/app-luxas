import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FileSignature,
  Receipt,
  FileText,
  BookOpen,
  FileBadge,
  Download,
  File,
  Search,
} from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import type { DocumentType, Client, ClientDocument } from '../data/types'
import { Avatar, StatusBadge } from '../components/ui'
import { formatDate, formatMoney } from '../lib/format'

const TYPE_ICON: Record<DocumentType, typeof FileText> = {
  Contrat: FileSignature,
  Facture: Receipt,
  Devis: FileText,
  Guide: BookOpen,
  'Audit PDF': FileBadge,
  Autre: File,
}

const FILTERS: (DocumentType | 'Tous')[] = ['Tous', 'Contrat', 'Facture', 'Devis', 'Audit PDF', 'Guide']

interface Row extends ClientDocument {
  client: Client
}

export default function DocumentsPage() {
  const [filter, setFilter] = useState<DocumentType | 'Tous'>('Tous')
  const [query, setQuery] = useState('')

  const all: Row[] = clients
    .flatMap((c) => c.documents.map((d) => ({ ...d, client: c })))
    .sort((a, b) => b.date.localeCompare(a.date))

  const rows = all.filter((d) => {
    const mf = filter === 'Tous' || d.type === filter
    const mq =
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      fullName(d.client).toLowerCase().includes(query.toLowerCase())
    return mf && mq
  })

  const invoiced = all
    .filter((d) => d.type === 'Facture')
    .reduce((s, d) => s + (d.amount ?? 0), 0)
  const paid = all
    .filter((d) => d.type === 'Facture' && d.status === 'Payé')
    .reduce((s, d) => s + (d.amount ?? 0), 0)
  const pending = invoiced - paid

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Documents</h1>
        <p className="mt-1 text-ink-muted">Administratif — contrats, factures, devis et livrables</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Documents" value={`${all.length}`} sub="tous clients" />
        <Stat label="Facturé" value={formatMoney(invoiced)} sub="total" />
        <Stat label="Encaissé" value={formatMoney(paid)} sub="payé" accent="sage" />
        <Stat label="En attente" value={formatMoney(pending)} sub="à encaisser" accent="camel" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            className="input pl-10"
            placeholder="Rechercher un document…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip border transition-colors ${
                filter === f
                  ? 'border-ink bg-ink text-cream-50'
                  : 'border-cream-300 bg-white text-ink-soft hover:bg-cream-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card divide-y divide-cream-100">
        {rows.map((d) => {
          const Icon = TYPE_ICON[d.type]
          return (
            <div key={`${d.client.id}-${d.id}`} className="flex items-center gap-4 p-4 hover:bg-cream-50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cream-100 text-camel-500">
                <Icon size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">{d.name}</p>
                <p className="text-xs text-ink-muted">
                  {d.type} · {formatDate(d.date)}
                  {d.amount ? ` · ${formatMoney(d.amount)}` : ''}
                </p>
              </div>
              <Link
                to={`/clients/${d.client.id}`}
                className="hidden items-center gap-2 sm:flex"
                title={fullName(d.client)}
              >
                <Avatar initials={initials(d.client)} color={d.client.avatarColor} size={30} />
                <span className="text-sm text-ink-muted">{fullName(d.client)}</span>
              </Link>
              <StatusBadge status={d.status} />
              <button className="btn-ghost" aria-label="Télécharger" title="Télécharger">
                <Download size={17} />
              </button>
            </div>
          )
        })}
        {rows.length === 0 && (
          <div className="p-12 text-center text-sm text-ink-muted">Aucun document trouvé.</div>
        )}
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub: string
  accent?: 'sage' | 'camel'
}) {
  const styles =
    accent === 'sage'
      ? 'bg-gradient-to-br from-sage-400 to-sage-600 text-cream-50'
      : accent === 'camel'
      ? 'bg-gradient-to-br from-camel-400 to-camel-600 text-cream-50'
      : ''
  const muted = accent ? 'text-cream-100/80' : 'text-ink-muted'
  return (
    <div className={`card p-5 ${styles}`}>
      <p className={`text-xs font-semibold uppercase tracking-wide ${muted}`}>{label}</p>
      <p className={`mt-2 font-serif text-2xl ${accent ? 'text-cream-50' : 'text-ink'}`}>{value}</p>
      <p className={`text-xs ${muted}`}>{sub}</p>
    </div>
  )
}
