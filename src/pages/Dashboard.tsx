import { Link } from 'react-router-dom'
import { Users, Eye, PhoneCall, Handshake, ArrowRight, CalendarClock } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts'
import { clients, fullName, initials } from '../data/clients'
import { compact, formatNumber, formatDateLong, formatShort } from '../lib/format'
import { Avatar, StatusBadge, Delta, ProgressBar } from '../components/ui'

export default function Dashboard() {
  const active = clients.filter((c) => c.status === 'Actif' || c.status === 'Onboarding')
  const totalImpr = clients.reduce((s, c) => s + c.kpis.impressions, 0)
  const totalCalls = clients.reduce((s, c) => s + c.kpis.qualifiedCallsPerWeek, 0)
  const totalDeals = clients.reduce((s, c) => s + c.kpis.dealsWon, 0)

  // aggregate impressions series
  const labels = clients[0].impressionsSeries.map((p) => p.label)
  const aggSeries = labels.map((label, i) => ({
    label,
    value: clients.reduce((s, c) => s + (c.impressionsSeries[i]?.value ?? 0), 0),
  }))

  const upcoming = clients
    .flatMap((c) => c.editorial.map((e) => ({ ...e, client: c })))
    .filter((e) => e.status === 'Programmé')
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5)

  const stats = [
    { label: 'Clients accompagnés', value: `${clients.length}`, sub: `${active.length} actifs`, icon: Users },
    { label: 'Impressions / mois', value: compact(totalImpr), sub: 'cumulées', icon: Eye, delta: 29 },
    { label: 'Appels qualifiés / sem.', value: `${totalCalls}`, sub: 'générés pour les clients', icon: PhoneCall },
    { label: 'Clients signés / mois', value: `${totalDeals}`, sub: 'par mes clients', icon: Handshake },
  ]

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">{formatDateLong('2026-07-20')}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">Salut Thomas 👋</h1>
          <p className="mt-1 text-ink-muted">Vue d’ensemble de l’acquisition de vos clients.</p>
        </div>
        <Link to="/clients" className="btn-dark">Voir les clients <ArrowRight size={16} /></Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <s.icon size={17} />
              </span>
              {s.delta !== undefined && <Delta value={s.delta} />}
            </div>
            <p className="stat mt-3 text-3xl text-ink">{s.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{s.label}</p>
            <p className="text-xs text-ink-muted/70">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-display text-xl text-ink">Impressions générées</h2>
              <p className="mt-0.5 text-sm text-ink-muted">Cumul de tous les clients</p>
            </div>
            <span className="chip bg-emerald-100 text-emerald-700">{compact(totalImpr)} / mois</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aggSeries} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="aggArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7ECE9" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7ECE9', fontSize: 13 }} formatter={(v: number) => [formatNumber(v), 'Impressions']} />
                <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2.5} fill="url(#aggArea)" dot={{ r: 3, fill: '#059669' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl text-ink">Contenu à venir</h2>
            <CalendarClock size={18} className="text-emerald-500" />
          </div>
          <div className="space-y-3">
            {upcoming.map((e) => (
              <Link key={`${e.client.id}-${e.id}`} to={`/clients/${e.client.id}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-paper-100">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-paper-100 leading-none">
                  <span className="stat text-base text-ink">{new Date(e.date).getDate()}</span>
                  <span className="text-[10px] uppercase text-ink-muted">{formatShort(e.date).split(' ')[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{e.title}</p>
                  <p className="truncate text-xs text-ink-muted">{fullName(e.client)} · {e.format}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">Mes clients</h2>
          <Link to="/clients" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Tout voir →</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {clients.map((c) => (
            <Link key={c.id} to={`/clients/${c.id}`} className="group flex items-center gap-4 rounded-2xl border border-paper-200 p-4 transition-all hover:border-emerald-200 hover:shadow-soft">
              <Avatar initials={initials(c)} color={c.avatarColor} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-ink">{fullName(c)}</p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="truncate text-sm text-ink-muted">{c.niche}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1"><Eye size={12} /> {compact(c.kpis.impressions)}</span>
                  <span className="inline-flex items-center gap-1"><PhoneCall size={12} /> {c.kpis.qualifiedCallsPerWeek}/sem</span>
                  <span className="inline-flex items-center gap-1"><Handshake size={12} /> {c.kpis.dealsWon}</span>
                </div>
              </div>
              <div className="hidden w-28 sm:block">
                <div className="mb-1 flex justify-between text-[11px] text-ink-muted"><span>Phase {c.currentPhase}/4</span></div>
                <ProgressBar value={(c.currentPhase / 4) * 100} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
