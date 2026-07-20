import { Link } from 'react-router-dom'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts'
import { Eye, TrendingUp, PhoneCall, Handshake, ArrowRight, Flame, MessageCircle, Quote, Target, LineChart } from 'lucide-react'
import type { Client } from '../../data/types'
import { ProgressRing, ProgressBar, StatusBadge, Delta } from '../../components/ui'
import { compact, formatNumber, formatDateLong, formatShort } from '../../lib/format'

const CHANNEL_COLORS = ['#10B981', '#34D399', '#5EEAD4']

export default function ClientHome({ client }: { client: Client }) {
  const k = client.kpis
  const g = client.monthlyGoal
  const goalPct = Math.min(100, Math.round((g.done / g.target) * 100))
  const goalReached = g.done >= g.target
  const channelMax = Math.max(...g.byChannel.map((c) => c.value))
  const phaseProgress = Math.round(client.phases.reduce((s, p) => s + p.progress, 0) / client.phases.length)
  const currentPhase = client.phases.find((p) => p.status === 'En cours') ?? client.phases[client.phases.length - 1]
  const upcoming = client.editorial.filter((e) => e.status === 'Programmé').sort((a, b) => a.date.localeCompare(b.date))[0]
  const noteFromThomas = [...client.messages].reverse().find((m) => m.from === 'thomas')

  const kpis = [
    { icon: Eye, label: 'Impressions / 30j', value: compact(k.impressions), delta: k.impressionsGrowth, tint: 'bg-emerald-50 text-emerald-600' },
    { icon: TrendingUp, label: 'Engagement', value: `${k.engagementRate}%`, delta: 5, tint: 'bg-teal-50 text-teal-600' },
    { icon: PhoneCall, label: 'Appels qualifiés / sem.', value: `${k.qualifiedCallsPerWeek}`, delta: 8, tint: 'bg-teal-50 text-teal-600' },
    { icon: Handshake, label: 'Clients signés / 30j', value: `${k.dealsWon}`, delta: 11, tint: 'bg-emerald-50 text-emerald-600' },
  ]

  return (
    <div className="animate-in space-y-6">
      {/* Hero */}
      <div className="card relative overflow-hidden !border-transparent p-0">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #05100B 0%, #047857 52%, #10B981 120%)' }} />
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6 p-7 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">{formatDateLong('2026-07-20')}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">Salut {client.firstName} 👋</h1>
            <p className="mt-2 max-w-md text-white/80">Votre système d’acquisition tourne. Phase {client.currentPhase}/4 — {currentPhase.title}.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/espace/acquisition" className="btn bg-white text-emerald-700 hover:bg-white/90">Voir mon acquisition <ArrowRight size={15} /></Link>
              <Link to="/espace/messagerie" className="btn border border-white/30 text-white hover:bg-white/10"><MessageCircle size={15} /> Écrire à Thomas</Link>
            </div>
          </div>
          <ProgressRing value={phaseProgress} size={132} stroke={11} label={<div className="text-center"><p className="stat text-2xl text-white">{phaseProgress}%</p><p className="text-[10px] uppercase tracking-wide text-white/70">accompagnement</p></div>} />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((c) => (
          <div key={c.label} className="card p-5 transition-transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between">
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.tint}`}><c.icon size={19} /></span>
              <Delta value={c.delta} />
            </div>
            <p className="stat mt-4 text-3xl text-ink">{c.value}</p>
            <p className="text-sm text-ink-muted">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Objectif du mois + Évolution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Target size={18} className="text-emerald-600" />
            <h3 className="font-display text-lg text-ink">Objectif du mois</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="stat text-4xl text-ink">{g.done}</span>
            <span className="stat mb-1 text-ink-muted">/ {g.target} {g.metric.toLowerCase()}</span>
          </div>
          <div className="mt-3"><ProgressBar value={goalPct} /></div>
          <p className="mt-2 text-sm font-medium text-emerald-700">
            {goalReached ? `Objectif atteint (${Math.round((g.done / g.target) * 100)}%) 🎯` : `${goalPct}% de l’objectif`}
          </p>

          <p className="label mt-5 mb-3">Par canal</p>
          <div className="space-y-2.5">
            {g.byChannel.map((c, i) => (
              <div key={c.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm text-ink-soft">{c.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper-200">
                  <div className="h-full rounded-full" style={{ width: `${(c.value / channelMax) * 100}%`, background: CHANNEL_COLORS[i] }} />
                </div>
                <span className="stat w-6 text-right text-sm font-semibold text-ink">{c.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-ink">Évolution des impressions</h3>
              <p className="text-sm text-ink-muted">6 derniers mois</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><LineChart size={17} /></span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={client.impressionsSeries} margin={{ left: -12, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="homeArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(16,40,30,0.06)" vertical={false} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} dy={6} />
                <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 12px 30px -12px rgba(16,40,30,0.3)', fontSize: 13 }} formatter={(v: number) => [formatNumber(v), 'Impressions']} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fill="url(#homeArea)" dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Streak + next post + note */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="card flex items-center gap-4 p-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-100 text-emerald-700"><Flame size={22} /></span>
          <div>
            <p className="stat text-2xl text-ink">{client.engagementStreak} j</p>
            <p className="text-sm text-ink-muted">routine d’engagement</p>
          </div>
        </div>

        <div className="card p-6">
          <p className="label mb-3">Prochain post</p>
          {upcoming ? (
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-white">
                <span className="stat text-xl leading-none">{new Date(upcoming.date).getDate()}</span>
                <span className="text-[10px] uppercase text-emerald-400">{formatShort(upcoming.date).split(' ')[1]}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{upcoming.title}</p>
                <p className="text-xs text-ink-muted">{upcoming.time} · {upcoming.format}</p>
                <Link to="/espace/calendrier" className="mt-1 inline-block text-xs font-medium text-emerald-600">Voir le calendrier →</Link>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-muted">Aucun post programmé.</p>
          )}
        </div>

        {noteFromThomas && (
          <div className="card bg-emerald-50/70 p-6">
            <div className="mb-2 flex items-center gap-2"><Quote size={16} className="text-emerald-600" /><p className="label">Un mot de Thomas</p></div>
            <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{noteFromThomas.text}</p>
            <Link to="/espace/messagerie" className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">Répondre <ArrowRight size={13} /></Link>
          </div>
        )}
      </div>

      {/* Phases */}
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg text-ink">Où en est mon accompagnement</h3>
          <Link to="/espace/accompagnement" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Détail & to-do →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {client.phases.map((p) => (
            <div key={p.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">Phase {p.index} — {p.title}</span>
                <StatusBadge status={p.status} />
              </div>
              <ProgressBar value={p.progress} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
