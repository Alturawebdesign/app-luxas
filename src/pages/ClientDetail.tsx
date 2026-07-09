import { useParams, useNavigate, Link, NavLink, Routes, Route, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  LayoutDashboard,
  ClipboardCheck,
  Shirt,
  Layers,
  Route as RouteIcon,
  CalendarDays,
  FileText,
} from 'lucide-react'
import { getClient, fullName, initials } from '../data/clients'
import { formatDate } from '../lib/format'
import { Avatar, StatusBadge } from '../components/ui'
import Overview from './client/Overview'
import Audit from './client/Audit'
import Lookbook from './client/Lookbook'
import Wardrobe from './client/Wardrobe'
import Program from './client/Program'
import Sessions from './client/Sessions'
import Documents from './client/Documents'

const tabs = [
  { to: '', label: 'Vue d’ensemble', icon: LayoutDashboard, end: true },
  { to: 'audit', label: 'Audit image', icon: ClipboardCheck },
  { to: 'lookbook', label: 'Lookbook', icon: Shirt },
  { to: 'garde-robe', label: 'Garde-robe', icon: Layers },
  { to: 'programme', label: 'Programme 30j', icon: RouteIcon },
  { to: 'seances', label: 'Séances', icon: CalendarDays },
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
        <Link to="/clients" className="btn-primary mt-4">
          Retour aux clients
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-in space-y-6">
      <button
        onClick={() => navigate('/clients')}
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} /> Clients
      </button>

      {/* Client header */}
      <div className="card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-camel-100 via-cream-200 to-cream-100" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="rounded-full border-4 border-white shadow-soft">
                <Avatar initials={initials(client)} color={client.avatarColor} size={84} />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-serif text-2xl text-ink">{fullName(client)}</h1>
                  <StatusBadge status={client.status} />
                </div>
                <p className="text-ink-muted">{client.role} · {client.company}</p>
              </div>
            </div>
            <div className="flex gap-2 pb-1">
              <Link to={`/messagerie/${client.id}`} className="btn-outline">
                <MessageCircle size={16} /> Message
              </Link>
              <a href={`mailto:${client.email}`} className="btn-primary">
                <Mail size={16} /> Email
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Mail size={14} /> {client.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone size={14} /> {client.phone}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {client.city}</span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} /> Depuis le {formatDate(client.startDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-10 -mx-1 overflow-x-auto rounded-2xl border border-cream-200 bg-cream-50/90 p-1.5 backdrop-blur">
        <div className="flex min-w-max gap-1">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink text-cream-50 shadow-soft' : 'text-ink-soft hover:bg-cream-100'
                }`
              }
            >
              <t.icon size={15} />
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Sub-pages */}
      <Routes>
        <Route index element={<Overview client={client} />} />
        <Route path="audit" element={<Audit client={client} />} />
        <Route path="lookbook" element={<Lookbook client={client} />} />
        <Route path="garde-robe" element={<Wardrobe client={client} />} />
        <Route path="programme" element={<Program client={client} />} />
        <Route path="seances" element={<Sessions client={client} />} />
        <Route path="documents" element={<Documents client={client} />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  )
}
