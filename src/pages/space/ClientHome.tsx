import { Link } from 'react-router-dom'
import {
  Sparkles,
  Shirt,
  Layers,
  CalendarCheck,
  ArrowRight,
  TrendingUp,
  Quote,
  MessageCircle,
} from 'lucide-react'
import type { Client } from '../../data/types'
import { ProgressRing, ProgressBar, StatusBadge } from '../../components/ui'
import { formatShort, formatDateLong } from '../../lib/format'

export default function ClientHome({ client }: { client: Client }) {
  const k = client.kpis
  const uplift = k.imageScoreAfter - k.imageScoreBefore
  const nextSession = client.sessions
    .filter((s) => s.status === 'À venir')
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  const lastLook = client.looks.filter((l) => l.status === 'Validé').slice(-1)[0]
  const noteFromLilia = [...client.messages].reverse().find((m) => m.from === 'lilia')

  const kpis = [
    { icon: Sparkles, label: 'Mon score d’image', value: `${k.imageScoreAfter}/10`, sub: `+${uplift} pts` },
    { icon: Shirt, label: 'Looks validés', value: `${k.looksValidated}/${k.looksTotal}`, sub: 'tenues clés' },
    { icon: Layers, label: 'Ma garde-robe', value: `${k.wardrobePieces}`, sub: 'pièces' },
    { icon: CalendarCheck, label: 'Séances', value: `${k.sessionsCompleted}/${k.sessionsTotal}`, sub: 'réalisées' },
  ]

  return (
    <div className="animate-in space-y-6">
      {/* Hero */}
      <div className="card relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'linear-gradient(120deg, #1A1A18 0%, #3A3A36 55%, #8A5E3B 130%)',
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-6 p-7 text-cream-50">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-camel-200">
              {formatDateLong('2026-07-09')}
            </p>
            <h1 className="mt-1 font-serif text-3xl">Bonjour {client.firstName} ✨</h1>
            <p className="mt-2 max-w-md text-cream-100/75">
              Voici l’avancement de votre transformation image. {client.formule}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/espace/programme" className="btn bg-cream-50 text-ink hover:bg-cream-100">
                Voir mon programme <ArrowRight size={15} />
              </Link>
              <Link
                to="/espace/messagerie"
                className="btn border border-cream-100/30 text-cream-50 hover:bg-white/10"
              >
                <MessageCircle size={15} /> Écrire à Lilia
              </Link>
            </div>
          </div>
          <ProgressRing
            value={k.progress}
            size={132}
            stroke={11}
            label={
              <div className="text-center">
                <p className="font-serif text-2xl text-cream-50">{k.progress}%</p>
                <p className="text-[10px] uppercase tracking-wide text-camel-200">programme</p>
              </div>
            }
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((c) => (
          <div key={c.label} className="card p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-camel-50 text-camel-600">
              <c.icon size={17} />
            </span>
            <p className="mt-3 font-serif text-2xl text-ink">{c.value}</p>
            <p className="text-sm font-medium text-ink-soft">{c.label}</p>
            <p className="text-xs text-ink-muted">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Transformation */}
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-camel-500" />
            <h2 className="font-serif text-lg text-ink">Ma transformation</h2>
          </div>
          <div className="space-y-5">
            <ScoreRow label="Au départ" value={k.imageScoreBefore} muted />
            <ScoreRow label="Aujourd’hui" value={k.imageScoreAfter} />
          </div>
          <div className="mt-5 border-t border-cream-200 pt-4">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-ink-muted">Progression du programme 30 jours</span>
              <span className="font-medium text-ink">{k.progress}%</span>
            </div>
            <ProgressBar value={k.progress} />
          </div>

          {/* Objectives */}
          <div className="mt-6">
            <p className="label mb-3">Mes objectifs</p>
            <ul className="space-y-2.5">
              {client.audit.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-camel-50 text-xs font-semibold text-camel-600">
                    {i + 1}
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Next session */}
          <div className="card p-6">
            <p className="label mb-3">Prochaine séance</p>
            {nextSession ? (
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
                  <p className="text-sm text-ink-muted">
                    {nextSession.time} · {nextSession.location}
                  </p>
                  <Link to="/espace/seances" className="mt-1 inline-block text-xs font-medium text-camel-600">
                    Voir toutes mes séances →
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink-muted">
                Votre accompagnement est terminé. Merci pour votre confiance 🤍
              </p>
            )}
          </div>

          {/* Note from Lilia */}
          {noteFromLilia && (
            <div className="card bg-cream-50 p-6">
              <div className="mb-2 flex items-center gap-2">
                <Quote size={16} className="text-camel-500" />
                <p className="label">Un mot de Lilia</p>
              </div>
              <p className="font-serif text-[15px] leading-relaxed text-ink-soft">
                {noteFromLilia.text}
              </p>
              <Link to="/espace/messagerie" className="btn-outline mt-4 w-full">
                Répondre <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Last validated look */}
          {lastLook && (
            <div className="card p-6">
              <div className="mb-3 flex items-center justify-between">
                <p className="label">Dernier look validé</p>
                <StatusBadge status={lastLook.status} />
              </div>
              <h3 className="font-serif text-lg text-ink">{lastLook.title}</h3>
              <p className="text-xs uppercase tracking-wide text-camel-600">{lastLook.occasion}</p>
              <Link to="/espace/lookbook" className="mt-3 inline-block text-sm font-medium text-camel-600">
                Voir mon lookbook →
              </Link>
            </div>
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
