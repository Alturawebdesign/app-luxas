import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { clients, fullName } from '../data/clients'
import { Logo } from '../components/ui'

type Mode = 'admin' | 'client'

export default function Login() {
  const { loginAdmin, loginClient } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('admin')
  const [email, setEmail] = useState('thomas@thomasnurit.com')
  const [password, setPassword] = useState('demo')
  const [clientId, setClientId] = useState(clients[0].id)
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'admin') {
      if (loginAdmin(email, password)) navigate('/')
      else setError('Renseignez votre email et votre mot de passe.')
    } else {
      if (loginClient(clientId, password || 'demo')) navigate('/espace')
      else setError('Impossible de se connecter à cet espace client.')
    }
  }

  return (
    <div className="flex min-h-screen bg-paper-100">
      {/* Left */}
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-forest-900 p-12 text-white lg:flex">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'radial-gradient(circle at 20% 15%, #3B82F6 0%, transparent 42%), radial-gradient(circle at 85% 75%, #38BDF8 0%, transparent 48%)' }} />
        <div className="relative flex items-center gap-3">
          <Logo size={44} dark />
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold">Thomas Nurit</p>
            <p className="text-xs text-emerald-400">Acquisition LinkedIn</p>
          </div>
        </div>

        <div className="relative">
          <p className="font-display text-4xl font-semibold leading-tight">
            On craque votre <span className="text-emerald-400">acquisition</span> sur LinkedIn.
          </p>
          <p className="mt-6 max-w-sm text-paper-200/70">
            {mode === 'admin'
              ? 'Le cockpit de vos accompagnements : datas LinkedIn, acquisition, suivi par phases.'
              : 'Votre espace : contenu, engagement, acquisition et suivi de votre accompagnement.'}
          </p>
        </div>

        <div className="relative flex items-center gap-8 text-sm text-paper-200/70">
          <div><p className="stat text-2xl text-white">300k+</p><p>impressions / mois</p></div>
          <div><p className="stat text-2xl text-white">10-20</p><p>appels / semaine</p></div>
          <div><p className="stat text-2xl text-white">0€</p><p>de pub</p></div>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-in">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <Logo size={44} />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-ink">Thomas Nurit</p>
              <p className="text-xs text-emerald-600">Acquisition LinkedIn</p>
            </div>
          </div>

          <div className="mb-6 flex rounded-xl border border-paper-300 bg-white p-1">
            {(['admin', 'client'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(''); setEmail(m === 'admin' ? 'thomas@thomasnurit.com' : '') }}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-ink text-white' : 'text-ink-soft hover:bg-paper-100'}`}
              >
                {m === 'admin' ? 'Espace admin' : 'Espace client'}
              </button>
            ))}
          </div>

          <p className="label">{mode === 'admin' ? 'Espace admin' : 'Espace client'}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold text-ink">{mode === 'admin' ? 'Bienvenue Thomas' : 'Bon retour'}</h1>
          <p className="mt-2 text-sm text-ink-muted">
            {mode === 'admin' ? 'Accédez au suivi de vos clients.' : 'Accédez à votre système d’acquisition.'}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === 'client' ? (
              <div>
                <label className="label mb-1.5 block">Compte client</label>
                <div className="relative">
                  <select className="input appearance-none pr-10" value={clientId} onChange={(e) => { setClientId(e.target.value); const c = clients.find((x) => x.id === e.target.value); setEmail(c?.email ?? '') }}>
                    {clients.map((c) => <option key={c.id} value={c.id}>{fullName(c)} — {c.company}</option>)}
                  </select>
                  <ChevronDown size={17} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                </div>
              </div>
            ) : (
              <div>
                <label className="label mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                  <input type="email" className="input pl-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" />
                </div>
              </div>
            )}

            <div>
              <label className="label mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input type="password" className="input pl-10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="btn-primary w-full py-2.5">Se connecter <ArrowRight size={17} /></button>
          </form>

          <p className="mt-6 rounded-xl bg-white px-4 py-3 text-center text-xs text-ink-muted">
            Démo — {mode === 'admin' ? 'connectez-vous en admin' : 'choisissez un compte client'} et cliquez sur <span className="font-medium text-ink-soft">Se connecter</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
