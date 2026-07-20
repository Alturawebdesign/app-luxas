import { Link } from 'react-router-dom'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts'
import { Eye, PhoneCall, Handshake, Wallet, Trophy, Medal, Send, MessageSquare, Percent } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import { compact, formatMoney, formatNumber, formatShort } from '../lib/format'
import { Avatar } from '../components/ui'

export default function ClientsData() {
  const totalImpr = clients.reduce((s, c) => s + c.kpis.impressions, 0)
  const totalCalls = clients.reduce((s, c) => s + c.kpis.callsBooked, 0)
  const totalDeals = clients.reduce((s, c) => s + c.kpis.dealsWon, 0)
  const totalPipeline = clients.reduce((s, c) => s + c.kpis.pipelineValue, 0)
  const avgEngagement = (clients.reduce((s, c) => s + c.kpis.engagementRate, 0) / clients.length).toFixed(1)

  const byImpressions = [...clients].sort((a, b) => b.kpis.impressions - a.kpis.impressions)
  const chartData = byImpressions.map((c) => ({ name: c.firstName, impressions: c.kpis.impressions, calls: c.kpis.qualifiedCallsPerWeek, color: c.avatarColor }))

  // aggregate funnel
  const stages = clients[0].acquisitionFunnel.map((s) => s.label)
  const aggFunnel = stages.map((label, i) => ({
    label,
    value: clients.reduce((s, c) => s + (c.acquisitionFunnel[i]?.value ?? 0), 0),
  }))
  const top = aggFunnel[0].value

  // best posts across all clients
  const bestPosts = clients
    .flatMap((c) => c.posts.filter((p) => p.status === 'Publié').map((p) => ({ ...p, client: c })))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)

  const totalRequests = clients.reduce((s, c) => s + c.prospection.requestsSent, 0)
  const totalMessages = clients.reduce((s, c) => s + c.prospection.messagesSent, 0)
  const totalSales = clients.reduce((s, c) => s + c.prospection.sales, 0)
  const avgClose = Math.round(clients.reduce((s, c) => s + c.prospection.closeRate, 0) / clients.length)

  const stats = [
    { icon: Eye, label: 'Impressions / mois', value: compact(totalImpr) },
    { icon: PhoneCall, label: 'Appels bookés / 30j', value: `${totalCalls}` },
    { icon: Handshake, label: 'Clients signés / 30j', value: `${totalDeals}` },
    { icon: Wallet, label: 'Pipeline généré', value: formatMoney(totalPipeline) },
  ]
  const prospectStats = [
    { icon: Send, label: 'Demandes envoyées / 30j', value: formatNumber(totalRequests) },
    { icon: MessageSquare, label: 'Messages envoyés / 30j', value: formatNumber(totalMessages) },
    { icon: Handshake, label: 'Ventes / 30j', value: `${totalSales}` },
    { icon: Percent, label: 'Closing moyen', value: `${avgClose}%` },
  ]

  return (
    <div className="animate-in space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink">Datas clients</h1>
        <p className="mt-1 text-ink-muted">Performance agrégée de votre portefeuille · engagement moyen {avgEngagement}%</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><s.icon size={17} /></span>
            <p className="stat mt-3 text-2xl text-ink">{s.value}</p>
            <p className="text-xs text-ink-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">Prospection — tous clients</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {prospectStats.map((s) => (
            <div key={s.label} className="card p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><s.icon size={17} /></span>
              <p className="stat mt-3 text-2xl text-ink">{s.value}</p>
              <p className="text-xs text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Comparatif impressions */}
        <div className="card p-6 lg:col-span-3">
          <h3 className="mb-4 font-display text-lg text-ink">Impressions par client</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 16, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(16,40,30,0.06)" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#8A948F', fontSize: 11 }} tickFormatter={(v) => compact(v)} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#232A27', fontSize: 12 }} width={60} />
                <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 12px 30px -12px rgba(16,40,30,0.3)', fontSize: 13 }} formatter={(v: number) => [formatNumber(v), 'Impressions']} cursor={{ fill: 'rgba(16,185,129,0.05)' }} />
                <Bar dataKey="impressions" radius={[8, 8, 8, 8]} maxBarSize={26}>
                  {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aggregate funnel */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-display text-lg text-ink">Funnel global</h3>
          <p className="mb-4 text-sm text-ink-muted">Tous clients confondus</p>
          <div className="space-y-2.5">
            {aggFunnel.map((s) => {
              const pct = (s.value / top) * 100
              return (
                <div key={s.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{s.label}</span>
                    <span className="stat font-medium text-ink">{formatNumber(s.value)}</span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-lg bg-paper-100">
                    <div className="h-full rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600" style={{ width: `${Math.max(pct, 3)}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Leaderboard */}
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Trophy size={18} className="text-lime-400" />
            <h3 className="font-display text-lg text-ink">Classement — impressions</h3>
          </div>
          <div className="space-y-2">
            {byImpressions.map((c, i) => (
              <Link key={c.id} to={`/clients/${c.id}`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-paper-100">
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-display text-sm font-semibold ${i === 0 ? 'bg-lime-300/40 text-emerald-800' : 'bg-paper-100 text-ink-muted'}`}>
                  {i + 1}
                </span>
                <Avatar initials={initials(c)} color={c.avatarColor} size={36} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{fullName(c)}</p>
                  <p className="truncate text-xs text-ink-muted">{c.niche}</p>
                </div>
                <span className="stat text-sm font-semibold text-ink">{compact(c.kpis.impressions)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Best posts global */}
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Medal size={18} className="text-emerald-500" />
            <h3 className="font-display text-lg text-ink">Top 5 posts — tous clients</h3>
          </div>
          <div className="space-y-2">
            {bestPosts.map((p, i) => (
              <Link key={`${p.client.id}-${p.id}`} to={`/clients/${p.client.id}/posts`} className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-paper-100">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-paper-100 font-display text-sm font-semibold text-ink-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{p.hook}</p>
                  <p className="truncate text-xs text-ink-muted">{p.client.firstName} · {formatShort(p.date)}</p>
                </div>
                <span className="stat text-sm font-semibold text-emerald-600">{compact(p.impressions)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
