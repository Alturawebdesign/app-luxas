import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import ClientsData from './pages/ClientsData'
import Messages from './pages/Messages'
import ClientSpace from './pages/ClientSpace'
import { useAuth } from './context/AuthContext'

function RequireAdmin({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (user.role === 'client') return <Navigate to="/espace" replace />
  return children
}

function RequireClient({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (user.role === 'admin') return <Navigate to="/" replace />
  return children
}

function LoginRoute() {
  const { user } = useAuth()
  if (user?.role === 'admin') return <Navigate to="/" replace />
  if (user?.role === 'client') return <Navigate to="/espace" replace />
  return <Login />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />

      {/* Espace client */}
      <Route path="/espace/*" element={<RequireClient><ClientSpace /></RequireClient>} />

      {/* Espace admin */}
      <Route
        path="/*"
        element={
          <RequireAdmin>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:id/*" element={<ClientDetail />} />
                <Route path="/datas" element={<ClientsData />} />
                <Route path="/messagerie" element={<Messages />} />
                <Route path="/messagerie/:id" element={<Messages />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </RequireAdmin>
        }
      />
    </Routes>
  )
}
