import { User, Bell, CreditCard, Palette, Shield, Check } from 'lucide-react'
import { Avatar } from '../components/ui'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { admin } = useAuth()

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-ink">Paramètres</h1>
        <p className="mt-1 text-ink-muted">Gérez votre profil et vos préférences</p>
      </div>

      {/* Profile */}
      <div className="card p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar initials={admin?.initials ?? 'LM'} color="#8A5E3B" size={72} />
          <div className="flex-1">
            <h2 className="font-serif text-xl text-ink">{admin?.name}</h2>
            <p className="text-ink-muted">{admin?.role} · {admin?.email}</p>
          </div>
          <button className="btn-outline">Modifier la photo</button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Nom complet" value="Lilia Maksimtchouk" />
          <Field label="Email" value="lilia@thelookbylilia.com" />
          <Field label="Téléphone" value="+33 6 00 00 00 00" />
          <Field label="Entreprise" value="The Look by Lilia" />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="btn-primary">
            <Check size={16} /> Enregistrer
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ToggleCard
          icon={Bell}
          title="Notifications"
          items={[
            { label: 'Nouveaux messages clients', on: true },
            { label: 'Rappels de séances', on: true },
            { label: 'Factures payées', on: true },
            { label: 'Résumé hebdomadaire', on: false },
          ]}
        />
        <ToggleCard
          icon={Palette}
          title="Préférences du portail"
          items={[
            { label: 'Thème clair éditorial', on: true },
            { label: 'Afficher les KPI sur le dashboard', on: true },
            { label: 'Masquer les clients terminés', on: false },
          ]}
        />
        <InfoCard
          icon={CreditCard}
          title="Facturation"
          lines={['Formule Studio — 49 €/mois', 'Prochain prélèvement : 1 août 2026', 'Moyen de paiement : Visa •••• 4242']}
        />
        <InfoCard
          icon={Shield}
          title="Sécurité"
          lines={['Mot de passe modifié il y a 2 mois', 'Double authentification : activée', 'Dernière connexion : aujourd’hui']}
        />
      </div>

      <div className="card flex items-center gap-3 p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-100 text-camel-500">
          <User size={18} />
        </span>
        <div className="flex-1">
          <p className="font-medium text-ink">Espace démo</p>
          <p className="text-sm text-ink-muted">
            Les données affichées sont fictives et servent à illustrer le portail.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="label mb-1.5 block">{label}</label>
      <input className="input" defaultValue={value} />
    </div>
  )
}

function ToggleCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Bell
  title: string
  items: { label: string; on: boolean }[]
}) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream-100 text-camel-500">
          <Icon size={17} />
        </span>
        <h3 className="font-serif text-lg text-ink">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <Toggle key={it.label} label={it.label} defaultOn={it.on} />
        ))}
      </div>
    </div>
  )
}

function Toggle({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className="relative inline-flex">
        <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-cream-300 transition-colors peer-checked:bg-camel-500" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  )
}

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: typeof CreditCard
  title: string
  lines: string[]
}) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cream-100 text-camel-500">
          <Icon size={17} />
        </span>
        <h3 className="font-serif text-lg text-ink">{title}</h3>
      </div>
      <ul className="space-y-2">
        {lines.map((l) => (
          <li key={l} className="text-sm text-ink-muted">{l}</li>
        ))}
      </ul>
    </div>
  )
}
