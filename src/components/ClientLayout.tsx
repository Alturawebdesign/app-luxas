import { useState, type ReactNode } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Route as RouteIcon,
  ClipboardCheck,
  Shirt,
  Layers,
  CalendarDays,
  FileText,
  MessageCircle,
  Menu,
  X,
  LogOut,
  Bell,
  Sparkles,
} from 'lucide-react'
import { Avatar } from './ui'
import { useAuth } from '../context/AuthContext'
import { getClient } from '../data/clients'

const nav = [
  { to: '/espace', label: 'Accueil', icon: Home, end: true },
  { to: '/espace/programme', label: 'Mon programme', icon: RouteIcon },
  { to: '/espace/audit', label: 'Mon audit', icon: ClipboardCheck },
  { to: '/espace/lookbook', label: 'Mon lookbook', icon: Shirt },
  { to: '/espace/garde-robe', label: 'Ma garde-robe', icon: Layers },
  { to: '/espace/seances', label: 'Mes séances', icon: CalendarDays },
  { to: '/espace/documents', label: 'Mes documents', icon: FileText },
  { to: '/espace/messagerie', label: 'Messagerie', icon: MessageCircle, badge: true },
]

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const clientId = user?.role === 'client' ? user.clientId : ''
  const client = getClient(clientId)
  const unread = client?.messages.filter((m) => m.from === 'lilia' && !m.read).length ?? 0

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Sidebar */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-cream-200 bg-cream-50 transition-transform duration-300 lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-2 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink">
              <span className="font-serif text-lg italic text-camel-100">L</span>
            </div>
            <div className="leading-tight">
              <p className="font-serif text-[15px] text-ink">The Look</p>
              <p className="-mt-0.5 font-script text-[15px] text-camel-500">by Lilia</p>
            </div>
          </div>
          <button className="btn-ghost -mr-2 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted/70">
          Espace client
        </p>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = item.end
              ? location.pathname === '/espace'
              : location.pathname.startsWith(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? 'bg-ink text-cream-50 shadow-soft' : 'text-ink-soft hover:bg-cream-100'
                }`}
              >
                <item.icon
                  size={18}
                  className={active ? 'text-camel-200' : 'text-ink-muted group-hover:text-ink-soft'}
                />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && unread > 0 && (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                      active ? 'bg-camel-400 text-ink' : 'bg-camel-500 text-cream-50'
                    }`}
                  >
                    {unread}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="m-3 rounded-2xl bg-gradient-to-br from-camel-500 to-camel-600 p-4 text-cream-50">
          <Sparkles size={18} className="text-camel-100" />
          <p className="mt-2 font-serif text-[15px] leading-snug">Votre transformation</p>
          <p className="mt-1 text-xs text-cream-100/80">Un style qui travaille pour votre business.</p>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 border-b border-cream-200 bg-cream-100/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="btn-ghost -ml-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>
            <div className="flex-1" />
            <button className="btn-ghost relative" aria-label="Notifications">
              <Bell size={19} />
              {unread > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-camel-500" />}
            </button>
            <div className="mx-1 hidden h-8 w-px bg-cream-300 sm:block" />
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden text-right leading-tight sm:block">
                  <p className="text-sm font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-ink-muted">Compte client</p>
                </div>
                <Avatar
                  initials={user.initials}
                  color={user.role === 'client' ? user.avatarColor : '#8A5E3B'}
                  size={38}
                />
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
