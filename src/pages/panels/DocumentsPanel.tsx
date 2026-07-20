import { FileSignature, Receipt, BookOpen, LayoutTemplate, BarChart3, Folder, Download, FileText } from 'lucide-react'
import type { Client, DocumentType } from '../../data/types'
import { StatusBadge } from '../../components/ui'
import { formatDate, formatMoney } from '../../lib/format'

const TYPE_ICON: Record<DocumentType, typeof FileText> = {
  Contrat: FileSignature,
  Facture: Receipt,
  Playbook: BookOpen,
  Template: LayoutTemplate,
  Rapport: BarChart3,
  Ressource: Folder,
}

export default function DocumentsPanel({ client }: { client: Client }) {
  const docs = [...client.documents].sort((a, b) => b.date.localeCompare(a.date))
  const invoiced = client.documents.filter((d) => d.type === 'Facture').reduce((s, d) => s + (d.amount ?? 0), 0)
  const paid = client.documents.filter((d) => d.type === 'Facture' && d.status === 'Payé').reduce((s, d) => s + (d.amount ?? 0), 0)
  const resources = client.documents.filter((d) => ['Playbook', 'Template', 'Rapport', 'Ressource'].includes(d.type)).length

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Documents" value={`${client.documents.length}`} />
        <Stat label="Ressources" value={`${resources}`} />
        <Stat label="Facturé" value={formatMoney(invoiced)} />
        <Stat label="Payé" value={formatMoney(paid)} />
      </div>

      <div className="card divide-y divide-paper-100">
        {docs.map((d) => {
          const Icon = TYPE_ICON[d.type]
          return (
            <div key={d.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-paper-50">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
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
              <button className="btn-ghost" aria-label="Télécharger" title="Télécharger">
                <Download size={17} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-5">
      <p className="label">{label}</p>
      <p className="stat mt-2 text-2xl text-ink">{value}</p>
    </div>
  )
}
