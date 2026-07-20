import { createContext, useContext, useState, type ReactNode } from 'react'
import { clients } from '../data/clients'

interface AdminUser {
  role: 'admin'
  name: string
  title: string
  email: string
  initials: string
}

interface ClientUser {
  role: 'client'
  clientId: string
  name: string
  title: string
  email: string
  initials: string
  avatarColor: string
}

export type User = AdminUser | ClientUser

interface AuthContextValue {
  user: User | null
  loginAdmin: (email: string, password: string) => boolean
  loginClient: (clientId: string, password: string) => boolean
  logout: () => void
}

const THOMAS: AdminUser = {
  role: 'admin',
  name: 'Thomas Nurit',
  title: 'Acquisition LinkedIn',
  email: 'thomas@thomasnurit.com',
  initials: 'TN',
}

const STORAGE_KEY = 'tn-auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function restore(): User | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

function persist(user: User) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    /* ignore */
  }
}

function clientUser(clientId: string): ClientUser | null {
  const c = clients.find((x) => x.id === clientId)
  if (!c) return null
  return {
    role: 'client',
    clientId: c.id,
    name: `${c.firstName} ${c.lastName}`,
    title: c.role,
    email: c.email,
    initials: `${c.firstName[0]}${c.lastName[0]}`,
    avatarColor: c.avatarColor,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(restore)

  const loginAdmin = (email: string, password: string) => {
    if (email.trim() && password.trim()) {
      persist(THOMAS)
      setUser(THOMAS)
      return true
    }
    return false
  }

  const loginClient = (clientId: string, password: string) => {
    const u = clientUser(clientId)
    if (u && password.trim()) {
      persist(u)
      setUser(u)
      return true
    }
    return false
  }

  const logout = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loginAdmin, loginClient, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
