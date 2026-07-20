import type { Client } from './types'

// Demo data — Portail « Thomas Nurit »
// Prestation : accompagnement / système d'acquisition LinkedIn pour solopreneurs B2B
// (contenu + routine d'engagement + GTM + IA)

function impressionsSeries(base: number): { label: string; value: number }[] {
  const months = ['Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil']
  const factors = [0.28, 0.42, 0.58, 0.71, 0.88, 1]
  return months.map((label, i) => ({ label, value: Math.round(base * factors[i]) }))
}

export const clients: Client[] = [
  {
    id: 'julien-marchand',
    firstName: 'Julien',
    lastName: 'Marchand',
    company: 'RevBoost',
    role: 'Consultant RevOps',
    niche: 'RevOps pour scale-ups SaaS',
    email: 'julien@revboost.io',
    phone: '+33 6 21 55 89 04',
    avatarColor: '#059669',
    status: 'Actif',
    offer: 'Système Acquisition — Scale',
    startDate: '2026-05-12',
    currentPhase: 4,
    kpis: {
      followers: 8420,
      followersGrowth: 1240,
      impressions: 312000,
      impressionsGrowth: 34,
      posts: 18,
      engagementRate: 6.8,
      profileViews: 4200,
      qualifiedCallsPerWeek: 14,
      callsBooked: 52,
      dealsWon: 6,
      pipelineValue: 84000,
      closeRate: 28,
    },
    posts: [
      { id: 'p1', date: '2026-07-18', hook: 'Pourquoi 80% des SaaS pilotent leur revenue à l’aveugle', format: 'Carrousel', status: 'Publié', impressions: 42300, likes: 612, comments: 148, reposts: 39, profileVisits: 540 },
      { id: 'p2', date: '2026-07-16', hook: 'Le framework RevOps que j’installe en 30 jours', format: 'Texte', status: 'Publié', impressions: 28700, likes: 401, comments: 92, reposts: 21, profileVisits: 388 },
      { id: 'p3', date: '2026-07-14', hook: '3 metrics que ton CRM te cache (et qui tuent ta croissance)', format: 'Carrousel', status: 'Publié', impressions: 51200, likes: 780, comments: 173, reposts: 54, profileVisits: 690 },
      { id: 'p4', date: '2026-07-11', hook: 'J’ai audité 40 pipelines. Voici le pattern commun.', format: 'Texte', status: 'Publié', impressions: 33800, likes: 452, comments: 88, reposts: 27, profileVisits: 410 },
      { id: 'p5', date: '2026-07-09', hook: 'Ton taux de closing ne dépend pas de tes sales', format: 'Vidéo', status: 'Publié', impressions: 24500, likes: 318, comments: 61, reposts: 14, profileVisits: 297 },
      { id: 'p6', date: '2026-07-21', hook: 'Le playbook onboarding qui divise le churn par 2', format: 'Carrousel', status: 'Programmé', impressions: 0, likes: 0, comments: 0, reposts: 0, profileVisits: 0 },
    ],
    engagementWeek: [
      { day: 'Lun', comments: 12, target: 10 },
      { day: 'Mar', comments: 10, target: 10 },
      { day: 'Mer', comments: 14, target: 10 },
      { day: 'Jeu', comments: 9, target: 10 },
      { day: 'Ven', comments: 11, target: 10 },
      { day: 'Sam', comments: 4, target: 5 },
      { day: 'Dim', comments: 3, target: 0 },
    ],
    engagementStreak: 34,
    acquisitionFunnel: [
      { label: 'Impressions', value: 312000 },
      { label: 'Visites profil', value: 4200 },
      { label: 'Connexions / DM', value: 610 },
      { label: 'Appels bookés', value: 52 },
      { label: 'Appels qualifiés', value: 41 },
      { label: 'Clients signés', value: 6 },
    ],
    acquisitionTrend: [
      { week: 'S24', impressions: 58000, calls: 8, deals: 1 },
      { week: 'S25', impressions: 64000, calls: 11, deals: 1 },
      { week: 'S26', impressions: 71000, calls: 12, deals: 2 },
      { week: 'S27', impressions: 79000, calls: 14, deals: 1 },
      { week: 'S28', impressions: 86000, calls: 16, deals: 1 },
    ],
    impressionsSeries: impressionsSeries(312000),
    phases: [
      {
        id: 'ph1', index: 1, title: 'Fondations & positionnement', goal: 'Clarifier l’offre, la cible et le message.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't1', label: 'Atelier positionnement', status: 'Fait' },
          { id: 't2', label: 'Optimisation profil LinkedIn', status: 'Fait' },
          { id: 't3', label: 'Définition des 4 piliers de contenu', status: 'Fait' },
        ],
      },
      {
        id: 'ph2', index: 2, title: 'Machine à contenu', goal: 'Installer la production de contenu régulière.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't4', label: 'Calendrier éditorial 30 jours', status: 'Fait' },
          { id: 't5', label: 'Templates de hooks', status: 'Fait' },
          { id: 't6', label: 'Process de rédaction assistée IA', status: 'Fait' },
        ],
      },
      {
        id: 'ph3', index: 3, title: 'Routine d’engagement', goal: 'Construire la visibilité par l’engagement ciblé.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't7', label: 'Liste de 50 comptes cibles', status: 'Fait' },
          { id: 't8', label: 'Routine quotidienne 20 min', status: 'Fait' },
        ],
      },
      {
        id: 'ph4', index: 4, title: 'Système d’acquisition', goal: 'Convertir la visibilité en appels qualifiés.', status: 'En cours', progress: 65,
        todos: [
          { id: 't9', label: 'Séquence DM non-intrusive', status: 'Fait' },
          { id: 't10', label: 'Page de réservation d’appel', status: 'Fait' },
          { id: 't11', label: 'Scoring des leads entrants', status: 'En cours' },
          { id: 't12', label: 'Automatisation CRM', status: 'À faire' },
        ],
      },
    ],
    editorial: [
      { id: 'e1', date: '2026-07-21', time: '08:30', title: 'Playbook onboarding anti-churn', format: 'Carrousel', pillar: 'Expertise', status: 'Programmé' },
      { id: 'e2', date: '2026-07-23', time: '08:30', title: 'Étude de cas : +32% de closing', format: 'Texte', pillar: 'Preuve', status: 'Programmé' },
      { id: 'e3', date: '2026-07-25', time: '08:30', title: 'Le mythe du « plus de leads »', format: 'Texte', pillar: 'Opinion', status: 'Brouillon' },
      { id: 'e4', date: '2026-07-28', time: '08:30', title: 'Behind the scenes : ma stack RevOps', format: 'Vidéo', pillar: 'Personnel', status: 'Idée' },
      { id: 'e5', date: '2026-07-30', time: '08:30', title: 'Sondage : votre plus gros frein revenue', format: 'Sondage', pillar: 'Engagement', status: 'Idée' },
    ],
    documents: [
      { id: 'd1', name: 'Contrat d’accompagnement — Scale', type: 'Contrat', status: 'Signé', date: '2026-05-10' },
      { id: 'd2', name: 'Facture n°2026-088', type: 'Facture', status: 'Payé', date: '2026-05-10', amount: 4500 },
      { id: 'd3', name: 'Playbook — Système d’acquisition LinkedIn', type: 'Playbook', status: 'Disponible', date: '2026-05-14' },
      { id: 'd4', name: 'Templates de hooks (50)', type: 'Template', status: 'Disponible', date: '2026-05-20' },
      { id: 'd5', name: 'Rapport de performance — Juin', type: 'Rapport', status: 'Disponible', date: '2026-07-01' },
    ],
    messages: [
      { id: 'm1', from: 'thomas', text: 'Julien, ton carrousel sur les 3 metrics a explosé 🔥 51k impressions. On duplique ce format cette semaine.', time: '2026-07-15T09:10:00', read: true },
      { id: 'm2', from: 'client', text: 'Incroyable ! J’ai eu 4 demandes d’appel juste avec celui-là. Le scoring des leads avance ?', time: '2026-07-15T09:35:00', read: true },
      { id: 'm3', from: 'thomas', text: 'Oui je te livre le système de scoring demain. Tu vas gagner un temps fou sur la qualif.', time: '2026-07-15T09:40:00', read: true },
      { id: 'm4', from: 'client', text: 'Parfait. Hâte de voir ça 🙌', time: '2026-07-19T18:02:00', read: false },
    ],
  },

  {
    id: 'amelie-roux',
    firstName: 'Amélie',
    lastName: 'Roux',
    company: 'Cap Leadership',
    role: 'Coach leadership',
    niche: 'Coaching de dirigeantes',
    email: 'amelie@capleadership.fr',
    phone: '+33 6 78 12 44 90',
    avatarColor: '#10B981',
    status: 'Onboarding',
    offer: 'Système Acquisition — Starter',
    startDate: '2026-07-14',
    currentPhase: 1,
    kpis: {
      followers: 1980,
      followersGrowth: 210,
      impressions: 24000,
      impressionsGrowth: 18,
      posts: 5,
      engagementRate: 3.9,
      profileViews: 640,
      qualifiedCallsPerWeek: 2,
      callsBooked: 4,
      dealsWon: 1,
      pipelineValue: 9000,
      closeRate: 25,
    },
    posts: [
      { id: 'p1', date: '2026-07-18', hook: 'Diriger, ce n’est pas tout porter seule', format: 'Texte', status: 'Publié', impressions: 6800, likes: 132, comments: 28, reposts: 6, profileVisits: 74 },
      { id: 'p2', date: '2026-07-15', hook: 'Le syndrome de l’imposture chez les dirigeantes', format: 'Texte', status: 'Publié', impressions: 8200, likes: 176, comments: 41, reposts: 9, profileVisits: 96 },
      { id: 'p3', date: '2026-07-22', hook: '3 signaux que votre équipe attend du leadership', format: 'Carrousel', status: 'Programmé', impressions: 0, likes: 0, comments: 0, reposts: 0, profileVisits: 0 },
    ],
    engagementWeek: [
      { day: 'Lun', comments: 5, target: 8 },
      { day: 'Mar', comments: 6, target: 8 },
      { day: 'Mer', comments: 4, target: 8 },
      { day: 'Jeu', comments: 7, target: 8 },
      { day: 'Ven', comments: 3, target: 8 },
      { day: 'Sam', comments: 0, target: 0 },
      { day: 'Dim', comments: 0, target: 0 },
    ],
    engagementStreak: 6,
    acquisitionFunnel: [
      { label: 'Impressions', value: 24000 },
      { label: 'Visites profil', value: 640 },
      { label: 'Connexions / DM', value: 78 },
      { label: 'Appels bookés', value: 4 },
      { label: 'Appels qualifiés', value: 3 },
      { label: 'Clients signés', value: 1 },
    ],
    acquisitionTrend: [
      { week: 'S27', impressions: 9000, calls: 1, deals: 0 },
      { week: 'S28', impressions: 12000, calls: 2, deals: 1 },
      { week: 'S29', impressions: 15000, calls: 2, deals: 0 },
    ],
    impressionsSeries: impressionsSeries(24000),
    phases: [
      {
        id: 'ph1', index: 1, title: 'Fondations & positionnement', goal: 'Clarifier l’offre, la cible et le message.', status: 'En cours', progress: 55,
        todos: [
          { id: 't1', label: 'Atelier positionnement', status: 'Fait' },
          { id: 't2', label: 'Optimisation profil LinkedIn', status: 'En cours' },
          { id: 't3', label: 'Définition des 4 piliers de contenu', status: 'À faire' },
        ],
      },
      {
        id: 'ph2', index: 2, title: 'Machine à contenu', goal: 'Installer la production de contenu régulière.', status: 'À venir', progress: 0,
        todos: [
          { id: 't4', label: 'Calendrier éditorial 30 jours', status: 'À faire' },
          { id: 't5', label: 'Templates de hooks', status: 'À faire' },
        ],
      },
      {
        id: 'ph3', index: 3, title: 'Routine d’engagement', goal: 'Construire la visibilité par l’engagement ciblé.', status: 'À venir', progress: 0,
        todos: [{ id: 't6', label: 'Liste de 50 comptes cibles', status: 'À faire' }],
      },
      {
        id: 'ph4', index: 4, title: 'Système d’acquisition', goal: 'Convertir la visibilité en appels qualifiés.', status: 'À venir', progress: 0,
        todos: [{ id: 't7', label: 'Séquence DM non-intrusive', status: 'À faire' }],
      },
    ],
    editorial: [
      { id: 'e1', date: '2026-07-22', time: '07:45', title: '3 signaux que votre équipe attend du leadership', format: 'Carrousel', pillar: 'Expertise', status: 'Programmé' },
      { id: 'e2', date: '2026-07-24', time: '07:45', title: 'Mon parcours de coach en 3 dates', format: 'Texte', pillar: 'Personnel', status: 'Brouillon' },
      { id: 'e3', date: '2026-07-29', time: '07:45', title: 'Le feedback qui transforme une équipe', format: 'Texte', pillar: 'Expertise', status: 'Idée' },
    ],
    documents: [
      { id: 'd1', name: 'Contrat d’accompagnement — Starter', type: 'Contrat', status: 'Signé', date: '2026-07-12' },
      { id: 'd2', name: 'Facture n°2026-101', type: 'Facture', status: 'En attente', date: '2026-07-14', amount: 2400 },
      { id: 'd3', name: 'Playbook — Système d’acquisition LinkedIn', type: 'Playbook', status: 'Disponible', date: '2026-07-15' },
    ],
    messages: [
      { id: 'm1', from: 'thomas', text: 'Bienvenue Amélie ! On démarre par la phase Fondations. J’ai bloqué notre atelier positionnement mardi 💪', time: '2026-07-14T10:00:00', read: true },
      { id: 'm2', from: 'client', text: 'Super hâte ! J’ai déjà quelques idées de posts en tête.', time: '2026-07-14T12:30:00', read: false },
    ],
  },

  {
    id: 'karim-benali',
    firstName: 'Karim',
    lastName: 'Benali',
    company: 'Growthlab',
    role: 'Freelance Growth',
    niche: 'Growth & SEO pour startups',
    email: 'karim@growthlab.co',
    phone: '+33 6 44 90 17 32',
    avatarColor: '#047857',
    status: 'Actif',
    offer: 'Système Acquisition — Growth',
    startDate: '2026-06-02',
    currentPhase: 3,
    kpis: {
      followers: 4630,
      followersGrowth: 720,
      impressions: 148000,
      impressionsGrowth: 41,
      posts: 14,
      engagementRate: 5.4,
      profileViews: 2100,
      qualifiedCallsPerWeek: 8,
      callsBooked: 26,
      dealsWon: 3,
      pipelineValue: 41000,
      closeRate: 23,
    },
    posts: [
      { id: 'p1', date: '2026-07-19', hook: 'Le SEO n’est pas mort, ta stratégie l’est', format: 'Texte', status: 'Publié', impressions: 22400, likes: 342, comments: 76, reposts: 18, profileVisits: 264 },
      { id: 'p2', date: '2026-07-17', hook: 'Comment j’ai fait x3 le trafic d’une startup en 90 jours', format: 'Carrousel', status: 'Publié', impressions: 31900, likes: 501, comments: 104, reposts: 33, profileVisits: 402 },
      { id: 'p3', date: '2026-07-15', hook: 'Arrête de créer du contenu que personne ne cherche', format: 'Texte', status: 'Publié', impressions: 18700, likes: 256, comments: 52, reposts: 11, profileVisits: 188 },
      { id: 'p4', date: '2026-07-12', hook: 'Ma stack growth à moins de 200€/mois', format: 'Carrousel', status: 'Publié', impressions: 27600, likes: 430, comments: 88, reposts: 41, profileVisits: 350 },
      { id: 'p5', date: '2026-07-22', hook: 'L’erreur SEO que font 9 startups sur 10', format: 'Texte', status: 'Programmé', impressions: 0, likes: 0, comments: 0, reposts: 0, profileVisits: 0 },
    ],
    engagementWeek: [
      { day: 'Lun', comments: 9, target: 10 },
      { day: 'Mar', comments: 11, target: 10 },
      { day: 'Mer', comments: 8, target: 10 },
      { day: 'Jeu', comments: 10, target: 10 },
      { day: 'Ven', comments: 7, target: 10 },
      { day: 'Sam', comments: 2, target: 3 },
      { day: 'Dim', comments: 0, target: 0 },
    ],
    engagementStreak: 21,
    acquisitionFunnel: [
      { label: 'Impressions', value: 148000 },
      { label: 'Visites profil', value: 2100 },
      { label: 'Connexions / DM', value: 305 },
      { label: 'Appels bookés', value: 26 },
      { label: 'Appels qualifiés', value: 19 },
      { label: 'Clients signés', value: 3 },
    ],
    acquisitionTrend: [
      { week: 'S24', impressions: 24000, calls: 4, deals: 0 },
      { week: 'S25', impressions: 29000, calls: 6, deals: 1 },
      { week: 'S26', impressions: 34000, calls: 7, deals: 1 },
      { week: 'S27', impressions: 39000, calls: 8, deals: 0 },
      { week: 'S28', impressions: 44000, calls: 9, deals: 1 },
    ],
    impressionsSeries: impressionsSeries(148000),
    phases: [
      {
        id: 'ph1', index: 1, title: 'Fondations & positionnement', goal: 'Clarifier l’offre, la cible et le message.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't1', label: 'Atelier positionnement', status: 'Fait' },
          { id: 't2', label: 'Optimisation profil LinkedIn', status: 'Fait' },
        ],
      },
      {
        id: 'ph2', index: 2, title: 'Machine à contenu', goal: 'Installer la production de contenu régulière.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't3', label: 'Calendrier éditorial 30 jours', status: 'Fait' },
          { id: 't4', label: 'Templates de hooks', status: 'Fait' },
        ],
      },
      {
        id: 'ph3', index: 3, title: 'Routine d’engagement', goal: 'Construire la visibilité par l’engagement ciblé.', status: 'En cours', progress: 70,
        todos: [
          { id: 't5', label: 'Liste de 50 comptes cibles', status: 'Fait' },
          { id: 't6', label: 'Routine quotidienne 20 min', status: 'En cours' },
          { id: 't7', label: 'Modèles de commentaires à valeur', status: 'À faire' },
        ],
      },
      {
        id: 'ph4', index: 4, title: 'Système d’acquisition', goal: 'Convertir la visibilité en appels qualifiés.', status: 'À venir', progress: 0,
        todos: [{ id: 't8', label: 'Séquence DM non-intrusive', status: 'À faire' }],
      },
    ],
    editorial: [
      { id: 'e1', date: '2026-07-22', time: '09:00', title: 'L’erreur SEO que font 9 startups sur 10', format: 'Texte', pillar: 'Expertise', status: 'Programmé' },
      { id: 'e2', date: '2026-07-24', time: '09:00', title: 'Case study : x3 trafic en 90 jours', format: 'Carrousel', pillar: 'Preuve', status: 'Brouillon' },
      { id: 'e3', date: '2026-07-26', time: '09:00', title: 'Pourquoi je refuse 1 client sur 2', format: 'Texte', pillar: 'Opinion', status: 'Idée' },
      { id: 'e4', date: '2026-07-29', time: '09:00', title: 'Ma routine growth du lundi', format: 'Vidéo', pillar: 'Personnel', status: 'Idée' },
    ],
    documents: [
      { id: 'd1', name: 'Contrat d’accompagnement — Growth', type: 'Contrat', status: 'Signé', date: '2026-05-30' },
      { id: 'd2', name: 'Facture n°2026-094', type: 'Facture', status: 'Payé', date: '2026-05-30', amount: 3200 },
      { id: 'd3', name: 'Playbook — Système d’acquisition LinkedIn', type: 'Playbook', status: 'Disponible', date: '2026-06-04' },
      { id: 'd4', name: 'Template calendrier éditorial', type: 'Template', status: 'Disponible', date: '2026-06-10' },
    ],
    messages: [
      { id: 'm1', from: 'client', text: 'Thomas, le carrousel sur la stack growth a fait 27k 🚀 2 appels bookés depuis. Merci !', time: '2026-07-13T14:20:00', read: true },
      { id: 'm2', from: 'thomas', text: 'Excellent Karim 👏 On attaque la routine d’engagement pour amplifier. Je te partage la liste de comptes cibles.', time: '2026-07-13T14:45:00', read: true },
      { id: 'm3', from: 'client', text: 'Top, je m’y mets dès demain matin.', time: '2026-07-18T08:15:00', read: false },
    ],
  },

  {
    id: 'elise-fabre',
    firstName: 'Élise',
    lastName: 'Fabre',
    company: 'Fabre Advisory',
    role: 'CFO à temps partagé',
    niche: 'Direction financière pour PME',
    email: 'elise@fabre-advisory.com',
    phone: '+33 6 09 33 71 55',
    avatarColor: '#065F46',
    status: 'Terminé',
    offer: 'Système Acquisition — Scale',
    startDate: '2026-02-10',
    currentPhase: 4,
    kpis: {
      followers: 11200,
      followersGrowth: 480,
      impressions: 268000,
      impressionsGrowth: 12,
      posts: 16,
      engagementRate: 7.2,
      profileViews: 3800,
      qualifiedCallsPerWeek: 12,
      callsBooked: 44,
      dealsWon: 5,
      pipelineValue: 96000,
      closeRate: 31,
    },
    posts: [
      { id: 'p1', date: '2026-07-17', hook: 'Votre trésorerie ment. Voici pourquoi.', format: 'Carrousel', status: 'Publié', impressions: 39800, likes: 588, comments: 121, reposts: 44, profileVisits: 470 },
      { id: 'p2', date: '2026-07-14', hook: 'Le tableau de bord CFO en 5 lignes', format: 'Texte', status: 'Publié', impressions: 29400, likes: 402, comments: 77, reposts: 22, profileVisits: 331 },
      { id: 'p3', date: '2026-07-10', hook: 'Ce que votre expert-comptable ne vous dira jamais', format: 'Texte', status: 'Publié', impressions: 45100, likes: 690, comments: 158, reposts: 61, profileVisits: 588 },
    ],
    engagementWeek: [
      { day: 'Lun', comments: 10, target: 10 },
      { day: 'Mar', comments: 12, target: 10 },
      { day: 'Mer', comments: 11, target: 10 },
      { day: 'Jeu', comments: 10, target: 10 },
      { day: 'Ven', comments: 9, target: 10 },
      { day: 'Sam', comments: 3, target: 3 },
      { day: 'Dim', comments: 1, target: 0 },
    ],
    engagementStreak: 96,
    acquisitionFunnel: [
      { label: 'Impressions', value: 268000 },
      { label: 'Visites profil', value: 3800 },
      { label: 'Connexions / DM', value: 540 },
      { label: 'Appels bookés', value: 44 },
      { label: 'Appels qualifiés', value: 36 },
      { label: 'Clients signés', value: 5 },
    ],
    acquisitionTrend: [
      { week: 'S24', impressions: 52000, calls: 10, deals: 1 },
      { week: 'S25', impressions: 55000, calls: 11, deals: 1 },
      { week: 'S26', impressions: 58000, calls: 12, deals: 1 },
      { week: 'S27', impressions: 61000, calls: 13, deals: 1 },
      { week: 'S28', impressions: 63000, calls: 12, deals: 1 },
    ],
    impressionsSeries: impressionsSeries(268000),
    phases: [
      {
        id: 'ph1', index: 1, title: 'Fondations & positionnement', goal: 'Clarifier l’offre, la cible et le message.', status: 'Terminée', progress: 100,
        todos: [{ id: 't1', label: 'Atelier positionnement', status: 'Fait' }, { id: 't2', label: 'Optimisation profil', status: 'Fait' }],
      },
      {
        id: 'ph2', index: 2, title: 'Machine à contenu', goal: 'Installer la production de contenu régulière.', status: 'Terminée', progress: 100,
        todos: [{ id: 't3', label: 'Calendrier éditorial', status: 'Fait' }, { id: 't4', label: 'Templates de hooks', status: 'Fait' }],
      },
      {
        id: 'ph3', index: 3, title: 'Routine d’engagement', goal: 'Construire la visibilité par l’engagement ciblé.', status: 'Terminée', progress: 100,
        todos: [{ id: 't5', label: 'Liste de comptes cibles', status: 'Fait' }, { id: 't6', label: 'Routine quotidienne', status: 'Fait' }],
      },
      {
        id: 'ph4', index: 4, title: 'Système d’acquisition', goal: 'Convertir la visibilité en appels qualifiés.', status: 'Terminée', progress: 100,
        todos: [
          { id: 't7', label: 'Séquence DM non-intrusive', status: 'Fait' },
          { id: 't8', label: 'Page de réservation d’appel', status: 'Fait' },
          { id: 't9', label: 'Automatisation CRM', status: 'Fait' },
        ],
      },
    ],
    editorial: [
      { id: 'e1', date: '2026-07-21', time: '08:00', title: 'Les 3 ratios que tout dirigeant doit suivre', format: 'Carrousel', pillar: 'Expertise', status: 'Brouillon' },
      { id: 'e2', date: '2026-07-24', time: '08:00', title: 'Comment j’ai sauvé une PME de la cessation', format: 'Texte', pillar: 'Preuve', status: 'Idée' },
    ],
    documents: [
      { id: 'd1', name: 'Contrat d’accompagnement — Scale', type: 'Contrat', status: 'Signé', date: '2026-02-08' },
      { id: 'd2', name: 'Facture n°2026-055', type: 'Facture', status: 'Payé', date: '2026-02-08', amount: 4500 },
      { id: 'd3', name: 'Playbook — Système d’acquisition LinkedIn', type: 'Playbook', status: 'Disponible', date: '2026-02-12' },
      { id: 'd4', name: 'Rapport final de performance', type: 'Rapport', status: 'Disponible', date: '2026-07-05' },
      { id: 'd5', name: 'Bibliothèque de swipe files', type: 'Ressource', status: 'Disponible', date: '2026-07-05' },
    ],
    messages: [
      { id: 'm1', from: 'thomas', text: 'Élise, bilan des 5 mois : 268k impressions/mois, 5 clients signés, closing à 31%. Objectif largement dépassé 🎯', time: '2026-07-05T11:00:00', read: true },
      { id: 'm2', from: 'client', text: 'Un immense merci Thomas. LinkedIn est devenu mon premier canal d’acquisition. Je recommande à 200%.', time: '2026-07-05T15:30:00', read: true },
    ],
  },
]

export function getClient(id: string): Client | undefined {
  return clients.find((c) => c.id === id)
}

export const fullName = (c: Client) => `${c.firstName} ${c.lastName}`
export const initials = (c: Client) => `${c.firstName[0]}${c.lastName[0]}`
