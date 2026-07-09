import { Check, X, Target, Palette, User, Sparkles } from 'lucide-react'
import type { Client } from '../../data/types'

export default function Audit({ client }: { client: Client }) {
  const a = client.audit
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="card overflow-hidden">
        <div className="border-b border-cream-200 bg-cream-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-camel-500" />
            <h2 className="font-serif text-xl text-ink">Diagnostic image</h2>
          </div>
        </div>
        <div className="p-6">
          <p className="font-serif text-lg leading-relaxed text-ink-soft">« {a.summary} »</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <InfoCard icon={User} title="Morphologie" text={a.morphology} />
        <InfoCard icon={Palette} title="Colorimétrie" text={a.colorimetry} />
        <InfoCard icon={Sparkles} title="Style actuel" text={a.currentStyle} />
      </div>

      {/* Palette */}
      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Palette size={18} className="text-camel-500" />
          <h3 className="font-serif text-lg text-ink">Palette recommandée</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {a.palette.map((hex) => (
            <div key={hex} className="text-center">
              <div
                className="h-16 w-16 rounded-2xl border border-cream-200 shadow-soft"
                style={{ background: hex }}
              />
              <p className="mt-1.5 text-[11px] font-medium uppercase text-ink-muted">{hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Target size={18} className="text-camel-500" />
          <h3 className="font-serif text-lg text-ink">Objectifs</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {a.objectives.map((o, i) => (
            <div key={i} className="rounded-2xl bg-cream-100 p-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-cream-50">
                {i + 1}
              </span>
              <p className="mt-2 text-sm text-ink-soft">{o}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths / to improve */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <Check size={15} />
            </span>
            Points forts
          </h3>
          <ul className="space-y-2.5">
            {a.strengths.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-sm text-ink-soft">
                <Check size={15} className="shrink-0 text-sage-600" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 font-serif text-lg text-ink">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-camel-50 text-camel-600">
              <Target size={15} />
            </span>
            À travailler
          </h3>
          <ul className="space-y-2.5">
            {a.toImprove.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-sm text-ink-soft">
                <X size={15} className="shrink-0 text-camel-500" /> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof User
  title: string
  text: string
}) {
  return (
    <div className="card p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cream-100 text-camel-500">
          <Icon size={16} />
        </span>
        <h3 className="font-medium text-ink">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  )
}
