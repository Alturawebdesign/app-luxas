import { Routes, Route, Navigate } from 'react-router-dom'
import ClientLayout from '../components/ClientLayout'
import { useAuth } from '../context/AuthContext'
import { getClient } from '../data/clients'
import ClientHome from './space/ClientHome'
import ClientMessages from './space/ClientMessages'
import Audit from './client/Audit'
import Lookbook from './client/Lookbook'
import Wardrobe from './client/Wardrobe'
import Program from './client/Program'
import Sessions from './client/Sessions'
import Documents from './client/Documents'
import type { ReactNode } from 'react'

function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default function ClientSpace() {
  const { user } = useAuth()
  const client = user?.role === 'client' ? getClient(user.clientId) : undefined

  if (!client) return <Navigate to="/login" replace />

  return (
    <ClientLayout>
      <Routes>
        <Route index element={<ClientHome client={client} />} />
        <Route
          path="programme"
          element={
            <Page title="Mon programme" subtitle="Ma transformation image en 30 jours">
              <Program client={client} />
            </Page>
          }
        />
        <Route
          path="audit"
          element={
            <Page title="Mon audit image" subtitle="Le diagnostic réalisé par Lilia">
              <Audit client={client} />
            </Page>
          }
        />
        <Route
          path="lookbook"
          element={
            <Page title="Mon lookbook" subtitle="Mes tenues composées par situation">
              <Lookbook client={client} />
            </Page>
          }
        />
        <Route
          path="garde-robe"
          element={
            <Page title="Ma garde-robe" subtitle="Mes pièces stratégiques">
              <Wardrobe client={client} />
            </Page>
          }
        />
        <Route
          path="seances"
          element={
            <Page title="Mes séances" subtitle="Audit · visio · shopping · sélection · bilan">
              <Sessions client={client} />
            </Page>
          }
        />
        <Route
          path="documents"
          element={
            <Page title="Mes documents" subtitle="Contrats, factures et livrables">
              <Documents client={client} />
            </Page>
          }
        />
        <Route path="messagerie" element={<ClientMessages client={client} />} />
        <Route path="*" element={<Navigate to="/espace" replace />} />
      </Routes>
    </ClientLayout>
  )
}
