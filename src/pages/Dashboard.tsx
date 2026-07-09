import { Link } from 'react-router-dom'
import {
  Users,
  TrendingUp,
  CalendarClock,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { clients, fullName, initials } from '../data/clients'
import { formatMoney, formatShort, formatDateLong } from '../lib/format'
import { Avatar, StatusBadge, ProgressBar, ProgressRing } from '../components/ui'

export default function Dashboard() {
  const active = clients.filter((c) => c.status === 'Actif' || c.status === 'Onboarding')
  const revenue = clients.reduce(
    (sum, c) => sum + c.documents.filter((d) => d.type === 'Facture' && d.status === 'Payé').reduce((s, d) => s + (d.amount ?? 0), 0),
    0,
  )
  const avgProgress = Math.round(active.reduce((s, c) => s + c.kpis.progress, 0) / (active.length || 1))
  const avgUplift =
    clients.reduce((s, c) => s + (c.kpis.imageScoreAfter - c.kpis.imageScoreBefore), 0) / clients.length

  const upcoming = clients
    .flatMap((c) => c.sessions.map((s) => ({ ...s, client: c })))
    .filter((s) => s.status === 'À venir')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)

  // Aggregate "score d'image moyen" progression by month (demo series)
  const trend = [
    { m: 'Fév', score: 5.4 },
    { m: 'Mars', score: 5.9 },
    { m: 'Avr', score: 6.5 },
    { m: 'Mai', score: 7.1 },
    { m: 'Juin', score: 7.6 },
    { m: 'Juil', score: 8.1 },
  ]

  const stats = [
    {
      label: 'Clients suivis',
      value: clients.length,
      sub: `${active.length} en accompagnement`,
      icon: Users,
      accent: 'text-camel-500 bg-camel-50',
    },
    {
      label: 'Progression moyenne',
      value: `${avgProgress}%`,
      sub: 'programme 30 jours',
      icon: TrendingUp,
      accent: 'text-sage-600 bg-sage-100',
    },
    {
      label: 'Gain image moyen',
      value: `+${avgUplift.toFixed(1)}`,
      sub: 'points /10 avant → après',
      icon: Sparkles,
      accent: 'text-camel-600 bg-camel-50',
    },
    {
      label: 'CA encaissé',
      value: formatMoney(revenue),
      sub: 'factures payées',
      icon: ArrowUpRight,
      accent: 'text-ink bg-cream-200',
    },
  ]

  return (
    <div className="animate-in space-y-6">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">{formatDateLong('2026-07-09')}</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">Bonjour Lilia ✨</h1>
          <p className="mt-1 text-ink-muted">
            Voici l’essentiel de vos accompagnements aujourd’hui.
          </p>
        </div>
        <Link to="/clients" className="btn-primary">
          Voir tous les clients
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between">
              <p className="label">{s.label}</p>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${s.accent}`}>
                <s.icon size={17} />
              </span>
            </div>
            <p className="mt-3 font-serif text-3xl text-ink">{s.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-xl text-ink">Score d’image moyen</h2>
              <p className="mt-0.5 text-sm text-ink-muted">Progression du portefeuille clients</p>
            </div>
            <span className="chip bg-sage-100 text-sage-600">
              <TrendingUp size={13} /> +2,7 pts sur 6 mois
            </span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -18, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C7A277" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#C7A277" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DF" vertical={false} />
                <XAxis
                  dataKey="m"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B6A63', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #EDE8DF',
                    fontSize: 13,
                    boxShadow: '0 12px 32px -16px rgba(26,26,24,0.2)',
                  }}
                  formatter={(v: number) => [`${v} / 10`, 'Score']}
                  labelStyle={{ color: '#6B6A63' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8A5E3B"
                  strokeWidth={2.5}
                  fill="url(#scoreArea)"
                  dot={{ r: 3, fill: '#8A5E3B' }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-xl text-ink">Prochaines séances</h2>
            <CalendarClock size={18} className="text-camel-400" />
          </div>
          <div className="space-y-3">
            {upcoming.map((s) => (
              <Link
                key={s.id}
                to={`/clients/${s.client.id}/seances`}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-cream-100"
              >
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-cream-100 leading-none">
                  <span className="font-serif text-base text-ink">
                    {new Date(s.date).getDate()}
                  </span>
                  <span className="text-[10px] uppercase text-ink-muted">
                    {formatShort(s.date).split(' ')[1]}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{s.type}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {fullName(s.client)} · {s.time}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Client snapshot */}
      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Suivi clients</h2>
          <Link to="/clients" className="text-sm font-medium text-camel-600 hover:text-camel-500">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {clients.map((c) => (
            <Link
              key={c.id}
              to={`/clients/${c.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-cream-200 p-4 transition-all hover:border-camel-200 hover:shadow-soft"
            >
              <Avatar initials={initials(c)} color={c.avatarColor} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium text-ink">{fullName(c)}</p>
                  <StatusBadge status={c.status} />
                </div>
                <p className="truncate text-sm text-ink-muted">{c.role}</p>
                <div className="mt-2 flex items-center gap-2">
                  <ProgressBar value={c.kpis.progress} className="max-w-[140px]" />
                  <span className="text-xs font-medium text-ink-muted">{c.kpis.progress}%</span>
                </div>
              </div>
              <ProgressRing
                value={Math.round((c.kpis.imageScoreAfter / 10) * 100)}
                size={54}
                stroke={5}
                label={
                  <span className="font-serif text-sm text-ink">{c.kpis.imageScoreAfter}/10</span>
                }
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
