import { Link } from 'react-router-dom'
import {
  Sparkles,
  Shirt,
  Layers,
  CalendarCheck,
  Heart,
  Gauge,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts'
import type { Client } from '../../data/types'
import { ProgressRing, ProgressBar } from '../../components/ui'
import { formatShort } from '../../lib/format'

export default function Overview({ client }: { client: Client }) {
  const k = client.kpis
  const uplift = k.imageScoreAfter - k.imageScoreBefore

  const kpiCards = [
    {
      icon: Sparkles,
      label: 'Score d’image',
      value: `${k.imageScoreAfter}/10`,
      sub: `+${uplift} pts depuis le début`,
      accent: 'text-camel-600 bg-camel-50',
    },
    {
      icon: Shirt,
      label: 'Looks validés',
      value: `${k.looksValidated}/${k.looksTotal}`,
      sub: 'tenues clés composées',
      accent: 'text-sage-600 bg-sage-100',
    },
    {
      icon: Layers,
      label: 'Garde-robe',
      value: `${k.wardrobePieces}`,
      sub: 'pièces stratégiques',
      accent: 'text-camel-500 bg-camel-50',
    },
    {
      icon: CalendarCheck,
      label: 'Séances',
      value: `${k.sessionsCompleted}/${k.sessionsTotal}`,
      sub: 'audit · visio · shopping',
      accent: 'text-ink bg-cream-200',
    },
  ]

  const radar = [
    { axis: 'Cohérence', v: Math.round(k.imageScoreAfter * 10) },
    { axis: 'Confiance', v: k.confidence },
    { axis: 'Adéquation', v: Math.min(100, 60 + k.progress / 3) },
    { axis: 'Impact', v: Math.round(k.satisfaction * 0.95) },
    { axis: 'Modernité', v: Math.round(k.imageScoreAfter * 9 + 8) },
  ]

  const nextSession = client.sessions
    .filter((s) => s.status === 'À venir')
    .sort((a, b) => a.date.localeCompare(b.date))[0]

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpiCards.map((c) => (
          <div key={c.label} className="card p-5">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${c.accent}`}>
              <c.icon size={17} />
            </span>
            <p className="mt-3 font-serif text-2xl text-ink">{c.value}</p>
            <p className="text-sm font-medium text-ink-soft">{c.label}</p>
            <p className="text-xs text-ink-muted">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Program progress */}
        <div className="card flex flex-col items-center justify-center p-6 text-center">
          <p className="label mb-4">Programme 30 jours</p>
          <ProgressRing value={k.progress} size={130} stroke={11} />
          <p className="mt-4 text-sm text-ink-muted">
            {client.program.filter((m) => m.status === 'Fait').length} étapes terminées sur{' '}
            {client.program.length}
          </p>
          <Link to="programme" className="btn-outline mt-4">
            Voir le programme <ArrowRight size={15} />
          </Link>
        </div>

        {/* Before / after */}
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-camel-500" />
            <h3 className="font-serif text-lg text-ink">Transformation image</h3>
          </div>
          <div className="space-y-5">
            <ScoreRow label="Avant" value={k.imageScoreBefore} muted />
            <ScoreRow label="Aujourd’hui" value={k.imageScoreAfter} />
            <div className="grid grid-cols-2 gap-3 border-t border-cream-200 pt-4">
              <MiniStat icon={Heart} label="Satisfaction" value={`${k.satisfaction}%`} />
              <MiniStat icon={Gauge} label="Confiance" value={`${k.confidence}%`} />
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="card p-6">
          <h3 className="mb-1 font-serif text-lg text-ink">Profil image</h3>
          <p className="mb-2 text-xs text-ink-muted">Évaluation multi-critères</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar} outerRadius="72%">
                <PolarGrid stroke="#EDE8DF" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: '#6B6A63', fontSize: 11 }} />
                <Radar dataKey="v" stroke="#8A5E3B" fill="#C7A277" fillOpacity={0.45} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Objectives + next session */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 font-serif text-lg text-ink">Objectifs de l’accompagnement</h3>
          <ul className="space-y-3">
            {client.audit.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-camel-50 text-xs font-semibold text-camel-600">
                  {i + 1}
                </span>
                <span className="text-sm text-ink-soft">{o}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-cream-200 pt-4">
            <p className="label mb-2">Objectif transformation</p>
            <div className="flex items-center gap-3">
              <ProgressBar value={k.progress} />
              <span className="text-sm font-medium text-ink">{k.progress}%</span>
            </div>
          </div>
        </div>

        <div className="card flex flex-col p-6">
          <p className="label mb-3">Prochaine séance</p>
          {nextSession ? (
            <>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-ink text-cream-50">
                  <span className="font-serif text-2xl leading-none">
                    {new Date(nextSession.date).getDate()}
                  </span>
                  <span className="text-[10px] uppercase text-camel-200">
                    {formatShort(nextSession.date).split(' ')[1]}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-ink">{nextSession.type}</p>
                  <p className="text-sm text-ink-muted">{nextSession.time} · {nextSession.location}</p>
                </div>
              </div>
              <Link to="seances" className="btn-outline mt-auto pt-2">
                Toutes les séances <ArrowRight size={15} />
              </Link>
            </>
          ) : (
            <p className="text-sm text-ink-muted">Accompagnement terminé — aucune séance à venir.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function ScoreRow({ label, value, muted }: { label: string; value: number; muted?: boolean }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className={muted ? 'text-ink-muted' : 'font-medium text-ink'}>{label}</span>
        <span className={`font-serif text-lg ${muted ? 'text-ink-muted' : 'text-ink'}`}>
          {value}
          <span className="text-xs text-ink-muted">/10</span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
        <div
          className={`h-full rounded-full ${
            muted ? 'bg-cream-300' : 'bg-gradient-to-r from-camel-300 to-camel-500'
          }`}
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  )
}

function MiniStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Heart
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-cream-100 p-3">
      <Icon size={15} className="text-camel-500" />
      <p className="mt-1.5 font-serif text-xl text-ink">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  )
}
