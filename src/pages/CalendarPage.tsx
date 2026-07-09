import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import type { Session, Client } from '../data/types'
import { Avatar, StatusBadge } from '../components/ui'
import { formatDateLong } from '../lib/format'

interface Ev extends Session {
  client: Client
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]

const TYPE_COLOR: Record<string, string> = {
  'Audit image': '#8A5E3B',
  Visio: '#5E7256',
  'Journée shopping': '#A5744A',
  'Sélection en ligne': '#C7A277',
  Bilan: '#6E2A34',
}

export default function CalendarPage() {
  const allEvents: Ev[] = clients.flatMap((c) => c.sessions.map((s) => ({ ...s, client: c })))
  // Focus on July 2026 by default (demo current month)
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(6) // 0-indexed July

  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7 // Monday-based
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  const eventsOn = (day: number) =>
    allEvents.filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })

  const monthEvents = allEvents
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1) }
    else setMonth((m) => m - 1)
  }
  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1) }
    else setMonth((m) => m + 1)
  }

  const today = new Date('2026-07-09')

  return (
    <div className="animate-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-ink">Calendrier</h1>
          <p className="mt-1 text-ink-muted">Toutes les séances de vos clients</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="btn-outline px-2.5"><ChevronLeft size={18} /></button>
          <span className="min-w-[150px] text-center font-serif text-lg text-ink">
            {MONTHS[month]} {year}
          </span>
          <button onClick={next} className="btn-outline px-2.5"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        {/* Calendar grid */}
        <div className="card p-4 sm:p-5">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} className="min-h-[86px] rounded-lg" />
              const evs = eventsOn(day)
              const isToday =
                today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
              return (
                <div
                  key={i}
                  className={`min-h-[86px] rounded-lg border p-1.5 transition-colors ${
                    isToday ? 'border-camel-300 bg-camel-50/50' : 'border-cream-200 hover:bg-cream-50'
                  }`}
                >
                  <div className="mb-1 flex justify-end">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        isToday ? 'bg-ink font-semibold text-cream-50' : 'text-ink-muted'
                      }`}
                    >
                      {day}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {evs.slice(0, 2).map((e) => (
                      <Link
                        key={e.id}
                        to={`/clients/${e.client.id}/seances`}
                        className="block truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium text-cream-50"
                        style={{ background: TYPE_COLOR[e.type] ?? '#8A5E3B' }}
                        title={`${e.type} · ${fullName(e.client)}`}
                      >
                        {e.time} {e.client.firstName}
                      </Link>
                    ))}
                    {evs.length > 2 && (
                      <p className="px-1 text-[10px] text-ink-muted">+{evs.length - 2} autre(s)</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-cream-200 pt-3">
            {Object.entries(TYPE_COLOR).map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Agenda */}
        <div className="card flex flex-col p-5">
          <h2 className="mb-4 font-serif text-lg text-ink">Agenda du mois</h2>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {monthEvents.map((e) => (
              <Link
                key={e.id}
                to={`/clients/${e.client.id}/seances`}
                className="flex items-center gap-3 rounded-xl border border-cream-200 p-3 transition-colors hover:border-camel-200 hover:bg-cream-50"
              >
                <span
                  className="h-10 w-1 shrink-0 rounded-full"
                  style={{ background: TYPE_COLOR[e.type] }}
                />
                <Avatar initials={initials(e.client)} color={e.client.avatarColor} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{e.type}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {fullName(e.client)}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-ink-muted">
                    <span className="inline-flex items-center gap-0.5">
                      <Clock size={11} /> {e.time}
                    </span>
                    {e.location && (
                      <span className="inline-flex items-center gap-0.5 truncate">
                        <MapPin size={11} /> {e.location}
                      </span>
                    )}
                  </div>
                </div>
                <StatusBadge status={e.status} />
              </Link>
            ))}
            {monthEvents.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-muted">Aucune séance ce mois-ci.</p>
            )}
          </div>
          <p className="mt-3 border-t border-cream-200 pt-3 text-xs text-ink-muted">
            {formatDateLong('2026-07-09')} — aujourd’hui
          </p>
        </div>
      </div>
    </div>
  )
}
