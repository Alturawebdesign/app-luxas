import { Check, Loader2, Circle, Flag } from 'lucide-react'
import type { Client, TodoStatus } from '../../data/types'
import { ProgressRing, StatusBadge, ProgressBar } from '../../components/ui'

const TODO_ICON: Record<TodoStatus, typeof Check> = {
  Fait: Check,
  'En cours': Loader2,
  'À faire': Circle,
}

export default function AccompanimentPanel({ client }: { client: Client }) {
  const done = client.phases.filter((p) => p.status === 'Terminée').length
  const globalProgress = Math.round(client.phases.reduce((s, p) => s + p.progress, 0) / client.phases.length)
  const totalTodos = client.phases.flatMap((p) => p.todos)
  const doneTodos = totalTodos.filter((t) => t.status === 'Fait').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card flex flex-wrap items-center gap-6 p-6">
        <ProgressRing value={globalProgress} size={104} stroke={9} />
        <div className="flex-1">
          <h2 className="font-display text-xl text-ink">Accompagnement — {client.offer}</h2>
          <p className="mt-1 text-sm text-ink-muted">
            Phase {client.currentPhase}/4 · {done} phases terminées · {doneTodos}/{totalTodos.length} tâches réalisées
          </p>
          <div className="mt-3 max-w-md">
            <ProgressBar value={globalProgress} />
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {client.phases.map((phase) => (
          <div key={phase.id} className={`card p-5 ${phase.status === 'En cours' ? 'ring-1 ring-emerald-300' : ''}`}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm font-semibold ${
                    phase.status === 'Terminée'
                      ? 'bg-emerald-100 text-emerald-700'
                      : phase.status === 'En cours'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-paper-200 text-ink-muted'
                  }`}
                >
                  {phase.status === 'Terminée' ? <Check size={16} /> : phase.index}
                </span>
                <div>
                  <h3 className="font-medium text-ink">{phase.title}</h3>
                  <p className="text-xs text-ink-muted">{phase.goal}</p>
                </div>
              </div>
              <StatusBadge status={phase.status} />
            </div>

            <div className="mb-3 flex items-center gap-2">
              <ProgressBar value={phase.progress} />
              <span className="stat text-xs text-ink-muted">{phase.progress}%</span>
            </div>

            <ul className="space-y-1.5">
              {phase.todos.map((t) => {
                const Icon = TODO_ICON[t.status]
                return (
                  <li key={t.id} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        t.status === 'Fait'
                          ? 'bg-emerald-500 text-white'
                          : t.status === 'En cours'
                          ? 'bg-lime-300/40 text-emerald-700'
                          : 'bg-paper-200 text-ink-muted'
                      }`}
                    >
                      <Icon size={12} className={t.status === 'En cours' ? 'animate-spin' : ''} />
                    </span>
                    <span className={t.status === 'Fait' ? 'text-ink-muted line-through' : 'text-ink-soft'}>
                      {t.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div className="card flex items-start gap-4 bg-emerald-50 p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
          <Flag size={18} />
        </span>
        <div>
          <p className="font-medium text-ink">Prochaines actions</p>
          <p className="text-sm text-ink-soft">
            {totalTodos.filter((t) => t.status !== 'Fait').slice(0, 3).map((t) => t.label).join(' · ') ||
              'Toutes les tâches sont terminées 🎉'}
          </p>
        </div>
      </div>
    </div>
  )
}
