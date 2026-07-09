import {
  FileSignature,
  Receipt,
  FileText,
  BookOpen,
  FileBadge,
  Download,
  File,
} from 'lucide-react'
import type { Client, DocumentType } from '../../data/types'
import { StatusBadge } from '../../components/ui'
import { formatDate, formatMoney } from '../../lib/format'

const TYPE_ICON: Record<DocumentType, typeof FileText> = {
  Contrat: FileSignature,
  Facture: Receipt,
  Devis: FileText,
  Guide: BookOpen,
  'Audit PDF': FileBadge,
  Autre: File,
}

export default function Documents({ client }: { client: Client }) {
  const docs = [...client.documents].sort((a, b) => b.date.localeCompare(a.date))
  const totalInvoiced = client.documents
    .filter((d) => d.type === 'Facture')
    .reduce((s, d) => s + (d.amount ?? 0), 0)
  const paid = client.documents
    .filter((d) => d.type === 'Facture' && d.status === 'Payé')
    .reduce((s, d) => s + (d.amount ?? 0), 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Documents" value={`${client.documents.length}`} sub="au dossier" />
        <StatCard label="Facturé" value={formatMoney(totalInvoiced)} sub="total prestation" />
        <StatCard label="Encaissé" value={formatMoney(paid)} sub="factures payées" />
      </div>

      <div className="card divide-y divide-cream-100">
        {docs.map((d) => {
          const Icon = TYPE_ICON[d.type]
          return (
            <div key={d.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-cream-50">
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
              <StatusBadge status={d.status} />
              <button
                className="btn-ghost"
                aria-label={`Télécharger ${d.name}`}
                title="Télécharger"
              >
                <Download size={17} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="card p-5">
      <p className="label">{label}</p>
      <p className="mt-2 font-serif text-2xl text-ink">{value}</p>
      <p className="text-xs text-ink-muted">{sub}</p>
    </div>
  )
}
