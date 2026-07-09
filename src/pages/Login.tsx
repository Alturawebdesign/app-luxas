import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('lilia@thelookbylilia.com')
  const [password, setPassword] = useState('demo')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(email, password)) {
      navigate('/')
    } else {
      setError('Veuillez renseigner votre email et votre mot de passe.')
    }
  }

  return (
    <div className="flex min-h-screen bg-cream-100">
      {/* Left — editorial panel */}
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-ink p-12 text-cream-50 lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, #C7A277 0%, transparent 45%), radial-gradient(circle at 80% 70%, #8A5E3B 0%, transparent 50%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-50">
            <span className="font-serif text-xl italic text-ink">L</span>
          </div>
          <div className="leading-tight">
            <p className="font-serif text-lg">The Look</p>
            <p className="-mt-1 font-script text-lg text-camel-200">by Lilia</p>
          </div>
        </div>

        <div className="relative">
          <p className="font-serif text-4xl leading-tight">
            REpensez votre style,
            <br />
            <span className="italic text-camel-200">réinventez</span> votre succès.
          </p>
          <p className="mt-6 max-w-sm text-cream-100/70">
            Le portail dédié au suivi de vos clients : audits image, garde-robe stratégique,
            programme de transformation en 30 jours.
          </p>
        </div>

        <div className="relative flex items-center gap-8 text-sm text-cream-100/70">
          <div>
            <p className="font-serif text-2xl text-cream-50">+150</p>
            <p>entrepreneurs</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-cream-50">30 j</p>
            <p>transformation</p>
          </div>
          <div>
            <p className="font-serif text-2xl text-cream-50">12,4k</p>
            <p>abonnés</p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-in">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink">
                <span className="font-serif text-xl italic text-camel-100">L</span>
              </div>
              <div className="leading-tight">
                <p className="font-serif text-lg text-ink">The Look</p>
                <p className="-mt-1 font-script text-lg text-camel-500">by Lilia</p>
              </div>
            </div>
          </div>

          <p className="label">Espace admin</p>
          <h1 className="mt-1 font-serif text-3xl text-ink">Bienvenue, Lilia</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Connectez-vous pour accéder au suivi de vos clients.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="label mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="email"
                  className="input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="label mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
                <input
                  type="password"
                  className="input pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button type="submit" className="btn-primary w-full py-2.5">
              Se connecter
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="mt-6 rounded-xl bg-cream-50 px-4 py-3 text-center text-xs text-ink-muted">
            Démo — cliquez simplement sur <span className="font-medium text-ink-soft">Se connecter</span> pour explorer le portail.
          </p>
        </div>
      </div>
    </div>
  )
}
