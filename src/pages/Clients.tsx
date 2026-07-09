import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Sparkles, Shirt, CalendarCheck, Heart, ArrowUpRight, LayoutGrid, List } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import type { ClientStatus } from '../data/types'
import { Avatar, StatusBadge, ProgressBar } from '../components/ui'

const FILTERS: (ClientStatus | 'Tous')[] = ['Tous', 'Actif', 'Onboarding', 'En pause', 'Terminé']

export default function Clients() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<ClientStatus | 'Tous'>('Tous')
  const [view, setView] = useState<'grid' | 'table'>('grid')

  const list = clients.filter((c) => {
    const matchesQuery =
      fullName(c).toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase()) ||
      c.role.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'Tous' || c.status === filter
    return matchesQuery && matchesFilter
  })

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink">Clients</h1>
          <p className="mt-1 text-ink-muted">
            {clients.length} accompagnements · suivi des KPI de transformation image
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-cream-300 bg-white p-1">
          <button
            onClick={() => setView('grid')}
            className={`btn px-3 py-1.5 ${view === 'grid' ? 'bg-ink text-cream-50' : 'text-ink-muted'}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('table')}
            className={`btn px-3 py-1.5 ${view === 'table' ? 'bg-ink text-cream-50' : 'text-ink-muted'}`}
          >
            <List size={15} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            className="input pl-10"
            placeholder="Rechercher un client…"
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

      {view === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <ClientCard key={c.id} id={c.id} />
          ))}
        </div>
      ) : (
        <ClientsTable ids={list.map((c) => c.id)} />
      )}

      {list.length === 0 && (
        <div className="card p-12 text-center text-ink-muted">Aucun client ne correspond.</div>
      )}
    </div>
  )
}

function ClientCard({ id }: { id: string }) {
  const c = clients.find((x) => x.id === id)!
  const k = c.kpis
  const kpis = [
    { icon: Sparkles, label: 'Score image', value: `${k.imageScoreBefore}→${k.imageScoreAfter}` },
    { icon: Shirt, label: 'Looks validés', value: `${k.looksValidated}/${k.looksTotal}` },
    { icon: CalendarCheck, label: 'Séances', value: `${k.sessionsCompleted}/${k.sessionsTotal}` },
    { icon: Heart, label: 'Satisfaction', value: `${k.satisfaction}%` },
  ]
  return (
    <Link
      to={`/clients/${c.id}`}
      className="group card flex flex-col p-5 transition-all hover:-translate-y-0.5 hover:border-camel-200 hover:shadow-card"
    >
      <div className="flex items-start gap-3">
        <Avatar initials={initials(c)} color={c.avatarColor} size={50} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-lg text-ink">{fullName(c)}</p>
          <p className="truncate text-sm text-ink-muted">{c.role}</p>
          <p className="truncate text-xs text-ink-muted/70">{c.company} · {c.city}</p>
        </div>
        <ArrowUpRight size={18} className="text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-camel-500" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StatusBadge status={c.status} />
        <span className="text-xs text-ink-muted">{c.formule.split('—')[1]?.trim()}</span>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-ink-muted">Programme 30 jours</span>
          <span className="font-medium text-ink">{k.progress}%</span>
        </div>
        <ProgressBar value={k.progress} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-cream-200 pt-4">
        {kpis.map((kp) => (
          <div key={kp.label} className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-100 text-camel-500">
              <kp.icon size={15} />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink">{kp.value}</p>
              <p className="text-[11px] text-ink-muted">{kp.label}</p>
            </div>
          </div>
        ))}
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
            <tr className="border-b border-cream-200 text-left text-xs uppercase tracking-wide text-ink-muted">
              <th className="px-5 py-3.5 font-semibold">Client</th>
              <th className="px-4 py-3.5 font-semibold">Statut</th>
              <th className="px-4 py-3.5 font-semibold">Score image</th>
              <th className="px-4 py-3.5 font-semibold">Progression</th>
              <th className="px-4 py-3.5 font-semibold">Looks</th>
              <th className="px-4 py-3.5 font-semibold">Séances</th>
              <th className="px-4 py-3.5 font-semibold">Satisf.</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-b border-cream-100 transition-colors last:border-0 hover:bg-cream-50"
              >
                <td className="px-5 py-3.5">
                  <Link to={`/clients/${c.id}`} className="flex items-center gap-3">
                    <Avatar initials={initials(c)} color={c.avatarColor} size={38} />
                    <div className="leading-tight">
                      <p className="font-medium text-ink">{fullName(c)}</p>
                      <p className="text-xs text-ink-muted">{c.role}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3.5">
                  <span className="text-ink-muted">{c.kpis.imageScoreBefore}</span>
                  <span className="mx-1 text-camel-400">→</span>
                  <span className="font-semibold text-ink">{c.kpis.imageScoreAfter}</span>
                  <span className="text-ink-muted">/10</span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <ProgressBar value={c.kpis.progress} className="w-24" />
                    <span className="text-xs text-ink-muted">{c.kpis.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-ink-soft">{c.kpis.looksValidated}/{c.kpis.looksTotal}</td>
                <td className="px-4 py-3.5 text-ink-soft">{c.kpis.sessionsCompleted}/{c.kpis.sessionsTotal}</td>
                <td className="px-4 py-3.5 font-medium text-ink">{c.kpis.satisfaction}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
