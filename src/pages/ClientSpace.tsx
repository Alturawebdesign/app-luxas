import { Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import ClientLayout from '../components/ClientLayout'
import { useAuth } from '../context/AuthContext'
import { getClient } from '../data/clients'
import type { Client } from '../data/types'
import { Avatar } from '../components/ui'
import ClientHome from './space/ClientHome'
import PostsPanel from './panels/PostsPanel'
import AcquisitionPanel from './panels/AcquisitionPanel'
import AccompanimentPanel from './panels/AccompanimentPanel'
import DocumentsPanel from './panels/DocumentsPanel'
import EditorialPanel from './panels/EditorialPanel'
import ChatThread from './panels/ChatThread'

function Page({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function ClientMessages({ client }: { client: Client }) {
  return (
    <div className="animate-in">
      <h1 className="mb-5 font-display text-3xl font-semibold text-ink">Messagerie</h1>
      <div className="card flex h-[calc(100vh-13rem)] flex-col overflow-hidden">
        <div className="flex items-center gap-3 border-b border-paper-200 p-4">
          <Avatar initials="TN" color="#2563EB" size={42} />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-ink">Thomas Nurit</p>
            <p className="truncate text-xs text-ink-muted">Votre accompagnateur acquisition LinkedIn</p>
          </div>
          <span className="chip bg-emerald-100 text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-current" /> En ligne</span>
        </div>
        <ChatThread initial={client.messages} self="client" otherLabel="Thomas" placeholder="Écrire à Thomas…" />
      </div>
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
        <Route path="calendrier" element={<Page title="Calendrier éditorial" subtitle="Votre pipeline de contenu LinkedIn"><EditorialPanel client={client} /></Page>} />
        <Route path="posts" element={<Page title="Posts & engagement" subtitle="Vos datas LinkedIn et votre routine d’engagement"><PostsPanel client={client} /></Page>} />
        <Route path="acquisition" element={<Page title="Acquisition" subtitle="De la visibilité aux appels qualifiés"><AcquisitionPanel client={client} /></Page>} />
        <Route path="accompagnement" element={<Page title="Accompagnement" subtitle="Votre progression par phases et vos to-do"><AccompanimentPanel client={client} /></Page>} />
        <Route path="documents" element={<Page title="Documents" subtitle="Contrats, factures, playbooks et ressources"><DocumentsPanel client={client} /></Page>} />
        <Route path="messagerie" element={<ClientMessages client={client} />} />
        <Route path="*" element={<Navigate to="/espace" replace />} />
      </Routes>
    </ClientLayout>
  )
}
