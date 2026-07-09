# Portail client — The Look by Lilia

Portail d'administration pour **Lilia Maksimtchouk** (_The Look by Lilia_), experte en image
pour entrepreneurs. Il centralise le suivi complet des clients accompagnés dans la prestation
« Transformation image en 30 jours » : audit du dressing, colorimétrie, composition de looks,
garde-robe stratégique, séances (WhatsApp + visio + journée shopping + sélection en ligne) et
administratif.

Le portail propose **deux espaces** avec une authentification par rôle :

- **Espace admin** (Lilia) — suivi complet de tous les clients.
- **Espace client** — chaque client accède à son propre portail (sa transformation,
  son programme, ses documents, sa messagerie avec Lilia), sans les fonctions admin.

Sur l'écran de connexion, un sélecteur **Espace admin / Espace client** permet de basculer
entre les deux (démo).

## ✨ Fonctionnalités — Espace admin

- **Authentification par rôle** — espace réservé à Lilia (démo : n'importe quels identifiants).
- **Barre de navigation latérale** vers toutes les pages du portail.
- **Tableau de bord** — KPI agrégés, progression du score d'image, prochaines séances, suivi clients.
- **Liste des clients** avec KPI liés à la prestation :
  - Score d'image avant → après
  - Progression du programme 30 jours
  - Looks validés & pièces de garde-robe
  - Séances réalisées & taux de satisfaction / confiance
  - Vues **grille** et **tableau**, recherche et filtres par statut.
- **Fiche client** avec tout le suivi de la prestation, en onglets :
  - **Vue d'ensemble** — KPI, transformation avant/après, profil image (radar), objectifs.
  - **Audit image** — diagnostic, morphologie, colorimétrie, palette recommandée, points forts / à travailler.
  - **Lookbook** — tenues composées par situation, avec statut de validation.
  - **Garde-robe** — pièces stratégiques, budget, statut d'acquisition.
  - **Programme 30 jours** — timeline des étapes de transformation.
  - **Séances** — agenda audit / visio / shopping / sélection / bilan.
  - **Documents** — contrats, factures, devis, livrables.
- **Calendrier** global de toutes les séances (vue mensuelle + agenda).
- **Messagerie** — conversations par client, envoi de messages (démo).
- **Documents** — vue administrative globale (facturé / encaissé / en attente).
- **Paramètres** — profil, notifications, facturation, sécurité.

## 👤 Fonctionnalités — Espace client

Quand un client se connecte (`/espace`), il retrouve, avec sa propre barre de navigation latérale :

- **Accueil** — message de bienvenue personnalisé, ses KPI, sa progression, sa prochaine séance,
  un mot de Lilia et son dernier look validé.
- **Mon programme** — la timeline de sa transformation en 30 jours.
- **Mon audit** — son diagnostic image (morphologie, colorimétrie, palette, objectifs).
- **Mon lookbook** — ses tenues composées par situation.
- **Ma garde-robe** — ses pièces stratégiques et leur budget.
- **Mes séances** — son agenda audit / visio / shopping / sélection / bilan.
- **Mes documents** — ses contrats, factures et livrables.
- **Messagerie** — sa conversation avec Lilia.

## 🛠️ Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/) (graphiques)
- [Lucide](https://lucide.dev/) (icônes)

## 🚀 Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build de production
npm run preview  # prévisualise le build
```

## 📁 Structure

```
src/
├── components/     # Layout, Sidebar, composants UI réutilisables
├── context/        # AuthContext (auth admin de démo)
├── data/           # types + données de démonstration (4 clients)
├── lib/            # utilitaires de formatage (dates, montants)
├── pages/          # pages principales
│   └── client/     # onglets de la fiche client
├── App.tsx         # routes
└── main.tsx        # point d'entrée
```

## 📝 Note

Les données affichées sont **fictives** et servent à illustrer le portail. L'authentification
est une démo : cliquez simplement sur « Se connecter ». Pour brancher une vraie base de données
et une authentification réelle, la couche `src/data` peut être remplacée par des appels API
(par ex. Supabase).
