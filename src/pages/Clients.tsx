import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, TrendingUp, PhoneCall, Handshake, ArrowUpRight, LayoutGrid, List } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import type { ClientStatus } from '../data/types'
import { Avatar, StatusBadge, Delta, ProgressBar } from '../components/ui'
import { compact } from '../lib/format'

const FILTERS: (ClientStatus | 'Tous')[] = ['Tous', 'Actif', 'Onboarding', 'En pause', 'Terminé']

export default function Clients() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ClientStatus | 'Tous'>('Tous')
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const list = clients.filter((c) => {
    const q =
      fullName(c).toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.niche.toLowerCase().includes(query.toLowerCase())
    const f = filter === 'Tous' || c.status === filter
    return q && f
  })

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Clients</h1>
          <p className="mt-1 text-ink-muted">{clients.length} solopreneurs · datas LinkedIn & acquisition</p>
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-paper-300 bg-white p-1">
          <button onClick={() => setView('grid')} className={`btn px-3 py-1.5 ${view === 'grid' ? 'bg-ink text-white' : 'text-ink-muted'}`}><LayoutGrid size={15} /></button>
          <button onClick={() => setView('table')} className={`btn px-3 py-1.5 ${view === 'table' ? 'bg-ink text-white' : 'text-ink-muted'}`}><List size={15} /></button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input className="input pl-10" placeholder="Rechercher un client…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`chip border transition-colors ${filter === f ? 'border-ink bg-ink text-white' : 'border-paper-300 bg-white text-ink-soft hover:bg-paper-100'}`}>{f}</button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => <ClientCard key={c.id} id={c.id} />)}
        </div>
      ) : (
        <ClientsTable ids={list.map((c) => c.id)} />
      )}

      {list.length === 0 && <div className="card p-12 text-center text-ink-muted">Aucun client ne correspond.</div>}
    </div>
  )
}

function ClientCard({ id }: { id: string }) {
  const c = clients.find((x) => x.id === id)!
  const k = c.kpis
  const kpis = [
    { icon: Eye, label: 'Impressions', value: compact(k.impressions) },
    { icon: TrendingUp, label: 'Engagement', value: `${k.engagementRate}%` },
    { icon: PhoneCall, label: 'Appels/sem', value: `${k.qualifiedCallsPerWeek}` },
    { icon: Handshake, label: 'Signés', value: `${k.dealsWon}` },
  ]
  return (
    <Link to={`/clients/${c.id}`} className="group card flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-card">
      <div className="flex items-start gap-3">
        <Avatar initials={initials(c)} color={c.avatarColor} size={50} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-medium text-ink">{fullName(c)}</p>
          <p className="truncate text-sm text-ink-muted">{c.niche}</p>
        </div>
        <ArrowUpRight size={18} className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={c.status} />
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
          Impressions <Delta value={k.impressionsGrowth} />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-paper-200 pt-4">
        {kpis.map((kp) => (
          <div key={kp.label} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper-100 text-emerald-600"><kp.icon size={15} /></span>
            <div className="leading-tight">
              <p className="stat text-sm font-semibold text-ink">{kp.value}</p>
              <p className="text-[11px] text-ink-muted">{kp.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-ink-muted">Accompagnement · Phase {c.currentPhase}/4</span>
          <span className="stat font-medium text-ink">{Math.round((c.currentPhase / 4) * 100)}%</span>
        </div>
        <ProgressBar value={(c.currentPhase / 4) * 100} />
      </div>
    </Link>
  )
}

function ClientsTable({ ids }: { ids: string[] }) {
  const rows = ids.map((id) => clients.find((c) => c.id === id)!)
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-paper-200 text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-5 py-3.5 font-semibold">Client</th>
              <th className="px-4 py-3.5 font-semibold">Statut</th>
              <th className="px-4 py-3.5 font-semibold">Impressions</th>
              <th className="px-4 py-3.5 font-semibold">Engagement</th>
              <th className="px-4 py-3.5 font-semibold">Appels/sem</th>
              <th className="px-4 py-3.5 font-semibold">Signés</th>
              <th className="px-4 py-3.5 font-semibold">Phase</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-paper-100 transition-colors last:border-0 hover:bg-paper-50">
                <td className="px-5 py-3.5">
                  <Link to={`/clients/${c.id}`} className="flex items-center gap-3">
                    <Avatar initials={initials(c)} color={c.avatarColor} size={38} />
                    <div className="leading-tight">
                      <p className="font-medium text-ink">{fullName(c)}</p>
                      <p className="text-xs text-ink-muted">{c.niche}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3.5"><span className="stat font-medium text-ink">{compact(c.kpis.impressions)}</span></td>
                <td className="px-4 py-3.5 text-ink-soft">{c.kpis.engagementRate}%</td>
                <td className="px-4 py-3.5 text-ink-soft">{c.kpis.qualifiedCallsPerWeek}</td>
                <td className="px-4 py-3.5 text-ink-soft">{c.kpis.dealsWon}</td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <ProgressBar value={(c.currentPhase / 4) * 100} className="w-16" />
                    <span className="text-xs text-ink-muted">{c.currentPhase}/4</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
