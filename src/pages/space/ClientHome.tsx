import { Link } from 'react-router-dom'
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts'
import { Eye, TrendingUp, PhoneCall, Handshake, ArrowRight, Flame, MessageCircle, CalendarClock, Quote } from 'lucide-react'
import type { Client } from '../../data/types'
import { ProgressRing, ProgressBar, StatusBadge, Delta } from '../../components/ui'
import { compact, formatNumber, formatDateLong, formatShort } from '../../lib/format'

export default function ClientHome({ client }: { client: Client }) {
  const k = client.kpis
  const phaseProgress = Math.round(client.phases.reduce((s, p) => s + p.progress, 0) / client.phases.length)
  const currentPhase = client.phases.find((p) => p.status === 'En cours') ?? client.phases[client.phases.length - 1]
  const upcoming = client.editorial.filter((e) => e.status === 'Programmé').sort((a, b) => a.date.localeCompare(b.date))[0]
  const noteFromThomas = [...client.messages].reverse().find((m) => m.from === 'thomas')

  const kpis = [
    { icon: Eye, label: 'Impressions / 30j', value: compact(k.impressions), delta: k.impressionsGrowth },
    { icon: TrendingUp, label: 'Engagement', value: `${k.engagementRate}%` },
    { icon: PhoneCall, label: 'Appels qualifiés / sem.', value: `${k.qualifiedCallsPerWeek}` },
    { icon: Handshake, label: 'Clients signés / 30j', value: `${k.dealsWon}` },
  ]

  return (
    <div className="animate-in space-y-6">
      {/* Hero */}
      <div className="card relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(120deg, #06110C 0%, #0F241B 55%, #047857 130%)' }} />
        <div className="relative flex flex-wrap items-center justify-between gap-6 p-7 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-emerald-400">{formatDateLong('2026-07-20')}</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">Salut {client.firstName} 👋</h1>
            <p className="mt-2 max-w-md text-paper-200/75">
              Votre système d’acquisition tourne. Phase {client.currentPhase}/4 — {currentPhase.title}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/espace/acquisition" className="btn bg-emerald-500 text-white hover:bg-emerald-600">Voir mon acquisition <ArrowRight size={15} /></Link>
              <Link to="/espace/messagerie" className="btn border border-white/20 text-white hover:bg-white/10"><MessageCircle size={15} /> Écrire à Thomas</Link>
            </div>
          </div>
          <ProgressRing
            value={phaseProgress}
            size={132}
            stroke={11}
            label={<div className="text-center"><p className="stat text-2xl text-white">{phaseProgress}%</p><p className="text-[10px] uppercase tracking-wide text-emerald-400">accompagnement</p></div>}
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((c) => (
          <div key={c.label} className="card p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><c.icon size={17} /></span>
              {c.delta !== undefined && <Delta value={c.delta} />}
            </div>
            <p className="stat mt-3 text-2xl text-ink">{c.value}</p>
            <p className="text-xs text-ink-muted">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Impressions */}
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg text-ink">Mes impressions</h2>
              <p className="text-sm text-ink-muted">6 derniers mois</p>
            </div>
            <Delta value={k.impressionsGrowth} />
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={client.impressionsSeries} margin={{ left: -14, right: 8, top: 6, bottom: 0 }}>
                <defs>
                  <linearGradient id="homeArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7ECE9', fontSize: 13 }} formatter={(v: number) => [formatNumber(v), 'Impressions']} />
                <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2.5} fill="url(#homeArea)" dot={{ r: 3, fill: '#059669' }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side */}
        <div className="space-y-6">
          <div className="card flex items-center gap-4 p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/30 text-emerald-700"><Flame size={22} /></span>
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
              <p className="text-sm text-ink-muted">Aucun post programmé pour le moment.</p>
            )}
          </div>
        </div>
      </div>

      {/* Phase + note */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <CalendarClock size={18} className="text-emerald-500" />
            <h3 className="font-display text-lg text-ink">Où en est mon accompagnement</h3>
          </div>
          <div className="space-y-4">
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
          <Link to="/espace/accompagnement" className="btn-outline mt-5">Voir le détail & mes to-do <ArrowRight size={15} /></Link>
        </div>

        {noteFromThomas && (
          <div className="card bg-emerald-50 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Quote size={16} className="text-emerald-600" />
              <p className="label">Un mot de Thomas</p>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-soft">{noteFromThomas.text}</p>
            <Link to="/espace/messagerie" className="btn-outline mt-4 w-full">Répondre <ArrowRight size={15} /></Link>
          </div>
        )}
      </div>
    </div>
  )
}
