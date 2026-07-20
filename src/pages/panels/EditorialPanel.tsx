import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react'
import type { Client, PostFormat } from '../../data/types'
import { StatusBadge } from '../../components/ui'
import { formatDateLong } from '../../lib/format'

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

const FORMAT_COLOR: Record<PostFormat, string> = {
  Texte: '#059669',
  Carrousel: '#0A0F0D',
  Image: '#34D399',
  Vidéo: '#A3E635',
  Sondage: '#6EE7B7',
}

export default function EditorialPanel({ client }: { client: Client }) {
  const [month, setMonth] = useState(6) // July 2026
  const [year, setYear] = useState(2026)

  const first = new Date(year, month, 1)
  const startOffset = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(startOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)

  const itemsOn = (day: number) =>
    client.editorial.filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day
    })

  const monthItems = client.editorial
    .filter((e) => {
      const d = new Date(e.date)
      return d.getFullYear() === year && d.getMonth() === month
    })
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))

  const today = new Date('2026-07-20')
  const prev = () => (month === 0 ? (setMonth(11), setYear((y) => y - 1)) : setMonth((m) => m - 1))
  const next = () => (month === 11 ? (setMonth(0), setYear((y) => y + 1)) : setMonth((m) => m + 1))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-2">
        <button onClick={prev} className="btn-outline px-2.5"><ChevronLeft size={18} /></button>
        <span className="min-w-[150px] text-center font-display text-lg text-ink">{MONTHS[month]} {year}</span>
        <button onClick={next} className="btn-outline px-2.5"><ChevronRight size={18} /></button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-4 sm:p-5">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} className="min-h-[84px] rounded-lg" />
              const items = itemsOn(day)
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
              return (
                <div key={i} className={`min-h-[84px] rounded-lg border p-1.5 ${isToday ? 'border-emerald-300 bg-emerald-50/50' : 'border-paper-200 hover:bg-paper-50'}`}>
                  <div className="mb-1 flex justify-end">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${isToday ? 'bg-emerald-500 font-semibold text-white' : 'text-ink-muted'}`}>{day}</span>
                  </div>
                  <div className="space-y-1">
                    {items.slice(0, 2).map((e) => (
                      <div key={e.id} className="truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ background: FORMAT_COLOR[e.format] }} title={e.title}>
                        {e.title}
                      </div>
                    ))}
                    {items.length > 2 && <p className="px-1 text-[10px] text-ink-muted">+{items.length - 2}</p>}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-paper-200 pt-3">
            {Object.entries(FORMAT_COLOR).map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} /> {label}
              </span>
            ))}
          </div>
        </div>

        <div className="card flex flex-col p-5">
          <h3 className="mb-4 font-display text-lg text-ink">Pipeline de contenu</h3>
          <div className="flex-1 space-y-3 overflow-y-auto">
            {monthItems.map((e) => (
              <div key={e.id} className="rounded-xl border border-paper-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{e.title}</p>
                  <StatusBadge status={e.status} />
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                  <span>{formatDateLong(e.date).replace(' 2026', '')}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={11} /> {e.time}</span>
                  <span className="inline-flex items-center gap-1"><Tag size={11} /> {e.pillar}</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full" style={{ background: FORMAT_COLOR[e.format] }} /> {e.format}
                  </span>
                </div>
              </div>
            ))}
            {monthItems.length === 0 && <p className="py-8 text-center text-sm text-ink-muted">Aucun contenu planifié ce mois-ci.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
