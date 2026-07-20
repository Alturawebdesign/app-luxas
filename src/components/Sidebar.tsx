import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, BarChart3, MessageCircle, Zap, X } from 'lucide-react'
import { clients } from '../data/clients'
import { Logo } from './ui'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/datas', label: 'Datas clients', icon: BarChart3 },
  { to: '/messagerie', label: 'Messagerie', icon: MessageCircle, badge: true },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const location = useLocation()
  const unread = clients.reduce(
    (n, c) => n + c.messages.filter((m) => m.from === 'client' && !m.read).length,
    0,
  )

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-forest-900/20 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[264px] flex-col border-r border-white/70 bg-white/55 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <div className="flex items-center gap-3">
            <Logo size={42} />
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-ink">Thomas Nurit</p>
              <p className="text-[11px] text-emerald-600">Acquisition LinkedIn</p>
            </div>
          </div>
          <button className="btn-ghost -mr-2 lg:hidden" onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
          Espace admin
        </p>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = item.end ? location.pathname === '/' : location.pathname.startsWith(item.to)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all ${
                  active
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-glow'
                    : 'text-ink-soft hover:bg-white/70'
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                    active ? 'bg-white/20 text-white' : 'bg-white/60 text-ink-muted group-hover:text-emerald-600'
                  }`}
                >
                  <item.icon size={17} />
                </span>
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

        <div className="m-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-glow">
            <Zap size={17} />
          </span>
          <p className="mt-3 font-display text-[15px] font-medium leading-snug text-ink">300k+ impressions / mois</p>
          <p className="mt-1 text-xs text-ink-muted">Sans pub. Sans recruter. Système natif IA.</p>
        </div>
      </aside>
    </>
  )
}
