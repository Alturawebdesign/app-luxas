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
        <div className="fixed inset-0 z-30 bg-forest-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-white/10 bg-forest-900/80 text-paper-100 shadow-glass-dark backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/10 via-transparent to-lime-400/5" />
        {/* Brand */}
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <div className="flex items-center gap-3">
            <Logo size={40} dark />
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-white">Thomas Nurit</p>
              <p className="text-[11px] text-emerald-400">Acquisition LinkedIn</p>
            </div>
          </div>
          <button className="btn-ghost -mr-2 text-paper-100 hover:bg-white/5 lg:hidden" onClick={onClose} aria-label="Fermer">
            <X size={18} />
          </button>
        </div>

        <p className="mt-5 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400/60">
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
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-emerald-500 text-white shadow-glow'
                    : 'text-paper-200/80 hover:bg-white/5 hover:text-white'
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
          <p className="mt-2 font-display text-[15px] font-medium leading-snug text-white">
            300k+ impressions / mois
          </p>
          <p className="mt-1 text-xs text-paper-200/60">
            Sans pub. Sans recruter. Système d’acquisition natif IA.
          </p>
        </div>
      </aside>
    </>
  )
}
