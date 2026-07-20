# Portail client — Thomas Nurit

Portail d'accompagnement pour **Thomas Nurit**, qui aide les solopreneurs B2B à construire un
**système d'acquisition sur LinkedIn** (contenu + routine d'engagement + GTM + IA). Deux espaces
avec authentification par rôle, dans une identité **vert & noir**.

## ✨ Espaces

Sur l'écran de connexion, un sélecteur **Espace admin / Espace client** permet de basculer (démo).

### 👤 Espace client (le solopreneur accompagné)
- **Dashboard** — impressions, engagement, appels qualifiés, clients signés, progression de
  l'accompagnement, prochain post, mot de Thomas.
- **Calendrier éditorial** — pipeline de contenu LinkedIn (vue mensuelle + agenda).
- **Posts & engagement** — datas LinkedIn des posts (impressions, top 5) + **routine
  d'engagement** (objectifs quotidiens, streak).
- **Acquisition** — funnel des impressions aux clients signés + courbe d'acquisition + pipeline.
- **Accompagnement** — suivi **par phases** avec **to-do** (4 phases : Fondations, Contenu,
  Engagement, Système d'acquisition).
- **Documents** — contrats, factures, playbooks, templates, rapports.
- **Messagerie** — conversation avec Thomas.

### 🛠️ Espace admin (Thomas)
- **Dashboard** — KPI agrégés, impressions cumulées, contenu à venir, suivi clients.
- **Clients** — liste avec les **datas** de chaque client (impressions, engagement, appels,
  clients signés, phase) — vues grille/tableau.
- **Datas clients** — analytics agrégées sur le portefeuille : impressions par client, funnel
  global, classement, top 5 posts tous clients confondus.
- **Messagerie** — toutes les conversations clients.

Chaque fiche client (côté admin) reprend les mêmes datas en onglets : vue d'ensemble, posts &
engagement, acquisition, accompagnement, documents.

## 🎨 Stack

React 18 · TypeScript · Vite · Tailwind CSS · React Router · Recharts · Lucide.
Identité vert & noir, typo Space Grotesk / Inter.

## 🚀 Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## 📝 Note

Données de démonstration (4 solopreneurs B2B fictifs). L'authentification est une démo :
choisissez un espace et cliquez sur « Se connecter ». La couche `src/data` peut être remplacée
par des appels API (ex. Supabase) pour une mise en production.
