import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  MessageCircle,
  FileText,
  Settings,
  Sparkles,
  X,
} from 'lucide-react'
import { clients } from '../data/clients'

const nav = [
  { to: '/', label: 'Tableau de bord', icon: LayoutDashboard, end: true },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/calendrier', label: 'Calendrier', icon: CalendarDays },
  { to: '/messagerie', label: 'Messagerie', icon: MessageCircle, badge: true },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/parametres', label: 'Paramètres', icon: Settings },
]

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const location = useLocation()
  const unread = clients.reduce(
    (n, c) => n + c.messages.filter((m) => m.from === 'client' && !m.read).length,
    0,
  )

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-cream-200 bg-cream-50 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
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
          <button className="btn-ghost -mr-2 lg:hidden" onClick={onClose} aria-label="Fermer le menu">
            <X size={18} />
          </button>
        </div>

        <p className="mt-4 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted/70">
          Espace admin
        </p>

        {/* Nav */}
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active =
              item.end
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-ink text-cream-50 shadow-soft'
                    : 'text-ink-soft hover:bg-cream-100'
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

        {/* Footer promo */}
        <div className="m-3 rounded-2xl bg-gradient-to-br from-camel-500 to-camel-600 p-4 text-cream-50">
          <Sparkles size={18} className="text-camel-100" />
          <p className="mt-2 font-serif text-[15px] leading-snug">
            +150 entrepreneurs transformés
          </p>
          <p className="mt-1 text-xs text-cream-100/80">
            Faites de votre style une arme business.
          </p>
        </div>
      </aside>
    </>
  )
}
