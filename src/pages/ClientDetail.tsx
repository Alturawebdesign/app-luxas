import { useParams, useNavigate, Link, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import {
  ArrowLeft, Mail, Phone, Target, MessageCircle, LayoutDashboard, BarChart3, ListChecks, FileText, Eye, PhoneCall, Handshake, TrendingUp,
} from 'lucide-react'
import { getClient, fullName, initials } from '../data/clients'
import { formatDate, compact } from '../lib/format'
import { Avatar, StatusBadge, Delta, ProgressBar } from '../components/ui'
import PostsPanel from './panels/PostsPanel'
import AcquisitionPanel from './panels/AcquisitionPanel'
import AccompanimentPanel from './panels/AccompanimentPanel'
import DocumentsPanel from './panels/DocumentsPanel'
import type { Client } from '../data/types'

const tabs = [
  { to: '', label: 'Vue d’ensemble', icon: LayoutDashboard, end: true },
  { to: 'posts', label: 'Posts & engagement', icon: BarChart3 },
  { to: 'acquisition', label: 'Acquisition', icon: Target },
  { to: 'accompagnement', label: 'Accompagnement', icon: ListChecks },
  { to: 'documents', label: 'Documents', icon: FileText },
]

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const client = getClient(id ?? '')

  if (!client) {
    return (
      <div className="card p-12 text-center">
        <p className="text-ink-muted">Client introuvable.</p>
        <Link to="/clients" className="btn-primary mt-4">Retour aux clients</Link>
      </div>
    )
  }

  return (
    <div className="animate-in space-y-6">
      <button onClick={() => navigate('/clients')} className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink">
        <ArrowLeft size={16} /> Clients
      </button>

      {/* Header */}
      <div className="card overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-forest-900 via-emerald-800 to-emerald-600" />
        <div className="px-6 pb-6">
          <div className="-mt-9 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="rounded-2xl border-4 border-white shadow-soft">
                <Avatar initials={initials(client)} color={client.avatarColor} size={80} />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-display text-2xl font-semibold text-ink">{fullName(client)}</h1>
                  <StatusBadge status={client.status} />
                </div>
                <p className="text-ink-muted">{client.niche}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Link to={`/messagerie/${client.id}`} className="btn-outline"><MessageCircle size={16} /> Message</Link>
              <a href={`mailto:${client.email}`} className="btn-primary"><Mail size={16} /> Email</a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Mail size={14} /> {client.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone size={14} /> {client.phone}</span>
            <span className="inline-flex items-center gap-1.5"><Target size={14} /> {client.offer}</span>
            <span className="inline-flex items-center gap-1.5">Client depuis le {formatDate(client.startDate)}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-10 -mx-1 overflow-x-auto rounded-2xl border border-paper-200 bg-paper-50/90 p-1.5 backdrop-blur">
        <div className="flex min-w-max gap-1">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-white shadow-soft' : 'text-ink-soft hover:bg-paper-100'
                }`
              }
            >
              <t.icon size={15} />
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>

      <Routes>
        <Route index element={<AdminOverview client={client} />} />
        <Route path="posts" element={<PostsPanel client={client} />} />
        <Route path="acquisition" element={<AcquisitionPanel client={client} />} />
        <Route path="accompagnement" element={<AccompanimentPanel client={client} />} />
        <Route path="documents" element={<DocumentsPanel client={client} />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  )
}

function AdminOverview({ client }: { client: Client }) {
  const k = client.kpis
  const cards = [
    { icon: Eye, label: 'Impressions / 30j', value: compact(k.impressions), delta: k.impressionsGrowth },
    { icon: TrendingUp, label: 'Engagement', value: `${k.engagementRate}%` },
    { icon: PhoneCall, label: 'Appels qualifiés / sem.', value: `${k.qualifiedCallsPerWeek}` },
    { icon: Handshake, label: 'Clients signés / 30j', value: `${k.dealsWon}` },
  ]
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map((c) => (
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
        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 font-display text-lg text-ink">Progression de l’accompagnement</h3>
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
        </div>

        <div className="card p-6">
          <h3 className="mb-4 font-display text-lg text-ink">Repères</h3>
          <dl className="space-y-3 text-sm">
            <Row label="Niche" value={client.niche} />
            <Row label="Offre" value={client.offer} />
            <Row label="Followers" value={compact(k.followers)} />
            <Row label="Vues de profil / 30j" value={compact(k.profileViews)} />
            <Row label="Taux de closing" value={`${k.closeRate}%`} />
            <Row label="Streak engagement" value={`${client.engagementStreak} j`} />
          </dl>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-paper-100 pb-2 last:border-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  )
}
