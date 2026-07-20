export type ClientStatus = 'Onboarding' | 'Actif' | 'En pause' | 'Terminé'

export type PostStatus = 'Publié' | 'Programmé' | 'Brouillon' | 'Idée'
export type PostFormat = 'Texte' | 'Carrousel' | 'Image' | 'Vidéo' | 'Sondage'

export type PhaseStatus = 'Terminée' | 'En cours' | 'À venir'
export type TodoStatus = 'Fait' | 'En cours' | 'À faire'

export type DocumentType = 'Contrat' | 'Facture' | 'Playbook' | 'Template' | 'Rapport' | 'Ressource'
export type DocumentStatus = 'Signé' | 'Payé' | 'En attente' | 'Disponible'

export interface Kpis {
  followers: number
  followersGrowth: number // last 30d
  impressions: number // last 30d
  impressionsGrowth: number // % vs prev 30d
  posts: number // last 30d
  engagementRate: number // %
  profileViews: number // last 30d
  qualifiedCallsPerWeek: number
  callsBooked: number // last 30d
  dealsWon: number // last 30d
  pipelineValue: number // €
  closeRate: number // %
}

export interface Post {
  id: string
  date: string // ISO
  hook: string
  format: PostFormat
  status: PostStatus
  impressions: number
  likes: number
  comments: number
  reposts: number
  profileVisits: number
}

export interface EngagementDay {
  day: string // "Lun"
  comments: number // commentaires postés
  target: number // objectif du jour
}

export interface Prospection {
  requestsSent: number // demandes de connexion envoyées (30j)
  messagesSent: number // messages envoyés (30j)
  calls: number // nombre de calls (30j)
  sales: number // nombre de ventes (30j)
  connectionRate: number // % demandes acceptées
  responseRate: number // % messages répondus
  callBookRate: number // % conversations → call booké
  closeRate: number // % calls → vente
}

export interface AcquisitionStage {
  label: string
  value: number
}

export interface AcquisitionPoint {
  week: string
  impressions: number
  calls: number
  deals: number
}

export interface Todo {
  id: string
  label: string
  status: TodoStatus
}

export interface Phase {
  id: string
  index: number
  title: string
  goal: string
  status: PhaseStatus
  progress: number // 0-100
  todos: Todo[]
}

export interface EditorialItem {
  id: string
  date: string // ISO
  time: string
  title: string
  format: PostFormat
  pillar: string // pilier de contenu
  status: PostStatus
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
  from: 'thomas' | 'client'
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
  niche: string
  email: string
  phone: string
  avatarColor: string
  status: ClientStatus
  offer: string
  startDate: string // ISO
  currentPhase: number
  kpis: Kpis
  prospection: Prospection
  posts: Post[]
  engagementWeek: EngagementDay[]
  engagementStreak: number // jours consécutifs de routine
  acquisitionFunnel: AcquisitionStage[]
  acquisitionTrend: AcquisitionPoint[]
  impressionsSeries: { label: string; value: number }[]
  phases: Phase[]
  editorial: EditorialItem[]
  documents: ClientDocument[]
  messages: Message[]
}
