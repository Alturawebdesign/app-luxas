export type ClientStatus = 'Onboarding' | 'Actif' | 'En pause' | 'Terminé'

export type SessionType = 'Audit image' | 'Visio' | 'Journée shopping' | 'Sélection en ligne' | 'Bilan'
export type SessionStatus = 'À venir' | 'Réalisée' | 'Annulée'

export type DocumentType = 'Contrat' | 'Facture' | 'Devis' | 'Guide' | 'Audit PDF' | 'Autre'
export type DocumentStatus = 'Signé' | 'En attente' | 'Payé' | 'Envoyé'

export type LookStatus = 'Proposé' | 'Validé' | 'À retravailler'
export type WardrobeStatus = 'À acquérir' | 'Acquis' | 'Dans le dressing'
export type MilestoneStatus = 'Fait' | 'En cours' | 'À venir'

export interface Kpis {
  imageScoreBefore: number // /10
  imageScoreAfter: number // /10
  progress: number // 0-100 (programme 30 jours)
  looksValidated: number
  looksTotal: number
  wardrobePieces: number
  sessionsCompleted: number
  sessionsTotal: number
  satisfaction: number // 0-100
  confidence: number // 0-100 (confiance ressentie)
}

export interface AuditData {
  summary: string
  morphology: string
  colorimetry: string
  currentStyle: string
  objectives: string[]
  strengths: string[]
  toImprove: string[]
  palette: string[] // hex colors recommended
}

export interface Look {
  id: string
  title: string
  occasion: string
  pieces: string[]
  status: LookStatus
  note?: string
}

export interface WardrobeItem {
  id: string
  category: 'Haut' | 'Bas' | 'Veste' | 'Chaussures' | 'Accessoire' | 'Pièce forte'
  name: string
  brand: string
  price: number
  status: WardrobeStatus
}

export interface Milestone {
  day: number
  title: string
  detail: string
  status: MilestoneStatus
}

export interface Session {
  id: string
  clientId: string
  type: SessionType
  date: string // ISO
  time: string
  status: SessionStatus
  location?: string
}

export interface ClientDocument {
  id: string
  name: string
  type: DocumentType
  status: DocumentStatus
  date: string // ISO
  amount?: number
}

export interface Message {
  id: string
  from: 'lilia' | 'client'
  text: string
  time: string // ISO
  read: boolean
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  company: string
  role: string
  email: string
  phone: string
  city: string
  avatarColor: string
  status: ClientStatus
  formule: string
  startDate: string // ISO
  nextSession?: string // ISO
  kpis: Kpis
  audit: AuditData
  looks: Look[]
  wardrobe: WardrobeItem[]
  program: Milestone[]
  sessions: Session[]
  documents: ClientDocument[]
  messages: Message[]
}
