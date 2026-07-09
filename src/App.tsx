import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import CalendarPage from './pages/CalendarPage'
import Messages from './pages/Messages'
import DocumentsPage from './pages/DocumentsPage'
import Settings from './pages/Settings'
import { useAuth } from './context/AuthContext'

function Protected({ children }: { children: JSX.Element }) {
  const { admin } = useAuth()
  const location = useLocation()
  if (!admin) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Protected>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/clients/:id/*" element={<ClientDetail />} />
                <Route path="/calendrier" element={<CalendarPage />} />
                <Route path="/messagerie" element={<Messages />} />
                <Route path="/messagerie/:id" element={<Messages />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/parametres" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </Protected>
        }
      />
    </Routes>
  )
}
