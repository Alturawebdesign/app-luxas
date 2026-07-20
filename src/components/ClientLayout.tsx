import { useState, type ReactNode } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Target,
  ListChecks,
  FileText,
  MessageCircle,
  Menu,
  X,
  LogOut,
  Bell,
  Zap,
} from 'lucide-react'
import { Avatar, Logo } from './ui'
import { useAuth } from '../context/AuthContext'
import { getClient } from '../data/clients'

const nav = [
  { to: '/espace', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/espace/calendrier', label: 'Calendrier édito', icon: CalendarDays },
  { to: '/espace/posts', label: 'Posts & engagement', icon: BarChart3 },
  { to: '/espace/acquisition', label: 'Acquisition', icon: Target },
  { to: '/espace/accompagnement', label: 'Accompagnement', icon: ListChecks },
  { to: '/espace/documents', label: 'Documents', icon: FileText },
  { to: '/espace/messagerie', label: 'Messagerie', icon: MessageCircle, badge: true },
]

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const clientId = user?.role === 'client' ? user.clientId : ''
  const client = getClient(clientId)
  const unread = client?.messages.filter((m) => m.from === 'thomas' && !m.read).length ?? 0

  return (
    <div className="min-h-screen bg-paper-100">
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-forest-900/50 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col bg-forest-900 text-paper-100 transition-transform duration-300 lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <div className="flex items-center gap-3">
            <Logo size={40} dark />
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-white">Thomas Nurit</p>
              <p className="text-[11px] text-emerald-400">Acquisition LinkedIn</p>
            </div>
          </div>
          <button className="btn-ghost -mr-2 text-paper-100 hover:bg-white/5 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400/60">
          Espace client
        </p>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = item.end ? location.pathname === '/espace' : location.pathname.startsWith(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? 'bg-emerald-500 text-white shadow-glow' : 'text-paper-200/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={18} className={active ? 'text-white' : 'text-emerald-400/80'} />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && unread > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                      active ? 'bg-white text-emerald-700' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {unread}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="m-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <Zap size={18} className="text-lime-400" />
          <p className="mt-2 font-display text-[15px] font-medium leading-snug text-white">Votre système tourne</p>
          <p className="mt-1 text-xs text-paper-200/60">Visibilité → autorité → appels qualifiés.</p>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 border-b border-paper-200 bg-paper-100/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="btn-ghost -ml-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
            <div className="flex-1" />
            <button className="btn-ghost relative" aria-label="Notifications">
              <Bell size={19} />
              {unread > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            </button>
            <div className="mx-1 hidden h-8 w-px bg-paper-300 sm:block" />
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden text-right leading-tight sm:block">
                  <p className="text-sm font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-ink-muted">Compte client</p>
                </div>
                <Avatar initials={user.initials} color={user.role === 'client' ? user.avatarColor : '#059669'} size={38} />
                <button
                  className="btn-ghost"
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  aria-label="Se déconnecter"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
