import { useState, type ReactNode } from 'react'
import { Menu, Search, LogOut, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Avatar } from './ui'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-paper-100">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-20 border-b border-white/50 bg-white/40 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="btn-ghost -ml-2 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
              <Menu size={20} />
            </button>

            <div className="relative hidden max-w-sm flex-1 sm:block">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input className="input pl-10" placeholder="Rechercher un client…" />
            </div>

            <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
              <button className="btn-ghost relative" aria-label="Notifications">
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </button>
              <div className="mx-1 hidden h-8 w-px bg-paper-300 sm:block" />
              {user && (
                <div className="flex items-center gap-3">
                  <div className="hidden text-right leading-tight sm:block">
                    <p className="text-sm font-medium text-ink">{user.name}</p>
                    <p className="text-xs text-ink-muted">{user.title}</p>
                  </div>
                  <Avatar initials={user.initials} color="#059669" size={38} />
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
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
