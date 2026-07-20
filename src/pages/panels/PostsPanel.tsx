import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
  Area,
  AreaChart,
} from 'recharts'
import { Eye, Heart, MessageSquare, Repeat2, Flame, TrendingUp } from 'lucide-react'
import type { Client } from '../../data/types'
import { Delta } from '../../components/ui'
import { compact, formatNumber, formatShort } from '../../lib/format'

export default function PostsPanel({ client }: { client: Client }) {
  const k = client.kpis
  const published = client.posts.filter((p) => p.status === 'Publié')
  const bestPosts = [...published].sort((a, b) => b.impressions - a.impressions).slice(0, 5)
  const avgImpr = published.length
    ? Math.round(published.reduce((s, p) => s + p.impressions, 0) / published.length)
    : 0

  const routineToday = client.engagementWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric icon={Eye} label="Impressions / 30j" value={compact(k.impressions)} delta={k.impressionsGrowth} accent />
        <Metric icon={TrendingUp} label="Taux d’engagement" value={`${k.engagementRate}%`} />
        <Metric icon={Heart} label="Posts publiés / 30j" value={`${k.posts}`} />
        <Metric icon={Eye} label="Impressions moy. / post" value={compact(avgImpr)} />
      </div>

      {/* Impressions trend */}
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-ink">Impressions</h3>
            <p className="text-sm text-ink-muted">6 derniers mois</p>
          </div>
          <Delta value={k.impressionsGrowth} />
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={client.impressionsSeries} margin={{ left: -14, right: 8, top: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="imprArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E7ECE9', fontSize: 13 }}
                formatter={(v: number) => [formatNumber(v), 'Impressions']}
              />
              <Area type="monotone" dataKey="value" stroke="#059669" strokeWidth={2.5} fill="url(#imprArea)" dot={{ r: 3, fill: '#059669' }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Engagement routine */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-ink">Routine d’engagement</h3>
              <p className="text-sm text-ink-muted">Commentaires à valeur postés cette semaine</p>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={client.engagementWeek} margin={{ left: -20, right: 4, top: 4, bottom: 0 }}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: '#F3F6F4' }}
                  contentStyle={{ borderRadius: 12, border: '1px solid #E7ECE9', fontSize: 13 }}
                  formatter={(v: number, n) => [v, n === 'comments' ? 'Commentaires' : 'Objectif']}
                />
                <Bar dataKey="comments" radius={[6, 6, 0, 0]} maxBarSize={34}>
                  {client.engagementWeek.map((d, i) => (
                    <Cell key={i} fill={d.comments >= d.target ? '#10B981' : '#A7F3D0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card flex flex-col justify-center gap-4 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-300/30 text-emerald-700">
              <Flame size={22} />
            </span>
            <div>
              <p className="stat text-3xl text-ink">{client.engagementStreak}</p>
              <p className="text-sm text-ink-muted">jours de routine consécutifs</p>
            </div>
          </div>
          <div className="rounded-xl bg-paper-100 p-3">
            <p className="text-xs text-ink-muted">Aujourd’hui</p>
            <p className="mt-0.5 text-sm font-medium text-ink">
              {routineToday ? `${routineToday.comments}/${routineToday.target} commentaires` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Top posts */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-paper-200 px-6 py-4">
          <h3 className="font-display text-lg text-ink">Top 5 des posts</h3>
          <span className="text-sm text-ink-muted">{published.length} posts publiés</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-paper-200 text-left text-xs uppercase tracking-wide text-ink-muted">
                <th className="px-6 py-3 font-semibold">Post</th>
                <th className="px-3 py-3 font-semibold">Format</th>
                <th className="px-3 py-3 font-semibold"><Eye size={14} /></th>
                <th className="px-3 py-3 font-semibold"><Heart size={14} /></th>
                <th className="px-3 py-3 font-semibold"><MessageSquare size={14} /></th>
                <th className="px-3 py-3 font-semibold"><Repeat2 size={14} /></th>
              </tr>
            </thead>
            <tbody>
              {bestPosts.map((p) => (
                <tr key={p.id} className="border-b border-paper-100 last:border-0 hover:bg-paper-50">
                  <td className="max-w-[280px] px-6 py-3">
                    <p className="truncate font-medium text-ink">{p.hook}</p>
                    <p className="text-xs text-ink-muted">{formatShort(p.date)}</p>
                  </td>
                  <td className="px-3 py-3"><span className="chip bg-paper-100 text-ink-soft">{p.format}</span></td>
                  <td className="px-3 py-3 font-medium text-ink">{compact(p.impressions)}</td>
                  <td className="px-3 py-3 text-ink-soft">{p.likes}</td>
                  <td className="px-3 py-3 text-ink-soft">{p.comments}</td>
                  <td className="px-3 py-3 text-ink-soft">{p.reposts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  delta,
  accent,
}: {
  icon: typeof Eye
  label: string
  value: string
  delta?: number
  accent?: boolean
}) {
  return (
    <div className={`card p-5 ${accent ? 'bg-forest-900 text-white' : ''}`}>
      <div className="flex items-center justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
          <Icon size={17} />
        </span>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      <p className={`stat mt-3 text-2xl ${accent ? 'text-white' : 'text-ink'}`}>{value}</p>
      <p className={`text-xs ${accent ? 'text-paper-200/70' : 'text-ink-muted'}`}>{label}</p>
    </div>
  )
}
