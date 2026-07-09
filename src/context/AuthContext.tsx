import { createContext, useContext, useState, type ReactNode } from 'react'

interface Admin {
  name: string
  role: string
  email: string
  initials: string
}

interface AuthContextValue {
  admin: Admin | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const LILIA: Admin = {
  name: 'Lilia Maksimtchouk',
  role: 'Experte en image',
  email: 'lilia@thelookbylilia.com',
  initials: 'LM',
}

const STORAGE_KEY = 'tlbl-auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) ? LILIA : null
    } catch {
      return null
    }
  })

  const login = (email: string, password: string) => {
    // Demo auth — any credentials sign you in as Lilia (admin).
    if (email.trim() && password.trim()) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
      setAdmin(LILIA)
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
    setAdmin(null)
  }

  return <AuthContext.Provider value={{ admin, login, logout }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
