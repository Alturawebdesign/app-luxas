import {
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'
import { Send, MessageSquare, PhoneCall, Handshake, Wallet, Link2, Reply, CalendarCheck, Percent } from 'lucide-react'
import type { Client } from '../../data/types'
import { Delta, ProgressRing } from '../../components/ui'
import { compact, formatMoney, formatNumber } from '../../lib/format'

export default function AcquisitionPanel({ client }: { client: Client }) {
  const k = client.kpis
  const p = client.prospection
  const funnel = client.acquisitionFunnel
  const top = funnel[0].value

  const volumes = [
    { icon: Send, label: 'Demandes envoyées', value: formatNumber(p.requestsSent), accent: true },
    { icon: MessageSquare, label: 'Messages envoyés', value: formatNumber(p.messagesSent) },
    { icon: PhoneCall, label: 'Calls', value: `${p.calls}` },
    { icon: Handshake, label: 'Ventes', value: `${p.sales}` },
  ]
  const rates = [
    { icon: Link2, label: 'Taux de connexion', value: p.connectionRate },
    { icon: Reply, label: 'Taux de réponse', value: p.responseRate },
    { icon: CalendarCheck, label: 'Taux de call book', value: p.callBookRate },
    { icon: Percent, label: 'Taux de closing', value: p.closeRate },
  ]

  return (
    <div className="space-y-6">
      {/* Prospection — volumes */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-muted">Prospection · 30 jours</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {volumes.map((v) => (
            <div key={v.label} className={`card p-5 ${v.accent ? '!bg-forest-900/90 text-white' : ''}`}>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${v.accent ? 'bg-white/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <v.icon size={17} />
              </span>
              <p className={`stat mt-3 text-2xl ${v.accent ? 'text-white' : 'text-ink'}`}>{v.value}</p>
              <p className={`text-xs ${v.accent ? 'text-paper-200/70' : 'text-ink-muted'}`}>{v.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prospection — taux */}
      <div className="card p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg text-ink">Taux de conversion</h3>
            <p className="text-sm text-ink-muted">Du premier contact à la vente</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {rates.map((r) => (
            <div key={r.label} className="flex flex-col items-center text-center">
              <ProgressRing value={r.value} size={92} stroke={8} label={<span className="stat text-lg text-ink">{r.value}%</span>} />
              <div className="mt-3 flex items-center gap-1.5 text-emerald-600"><r.icon size={14} /></div>
              <p className="mt-1 text-sm font-medium text-ink-soft">{r.label}</p>
            </div>
          ))}
        </div>
        {/* Outbound chain */}
        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-white/40 pt-4 text-sm">
          <Node value={formatNumber(p.requestsSent)} label="Demandes" />
          <Arrow rate={p.connectionRate} />
          <Node value={formatNumber(Math.round(p.requestsSent * p.connectionRate / 100))} label="Connexions" />
          <Arrow rate={p.responseRate} />
          <Node value={formatNumber(Math.round(p.messagesSent * p.responseRate / 100))} label="Réponses" />
          <Arrow rate={p.callBookRate} />
          <Node value={`${p.calls}`} label="Calls" />
          <Arrow rate={p.closeRate} />
          <Node value={`${p.sales}`} label="Ventes" accent />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Inbound funnel */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-display text-lg text-ink">Funnel inbound</h3>
          <p className="mb-4 text-sm text-ink-muted">Le contenu qui génère de la demande entrante</p>
          <div className="space-y-2.5">
            {funnel.map((stage, i) => {
              const pct = (stage.value / top) * 100
              const conv = i > 0 ? (stage.value / funnel[i - 1].value) * 100 : 100
              return (
                <div key={stage.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">{stage.label}</span>
                    <span className="flex items-center gap-2">
                      <span className="stat font-medium text-ink">{formatNumber(stage.value)}</span>
                      {i > 0 && <span className="text-xs text-ink-muted">{conv.toFixed(1)}%</span>}
                    </span>
                  </div>
                  <div className="h-6 overflow-hidden rounded-lg bg-white/50">
                    <div className="h-full rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all" style={{ width: `${Math.max(pct, 4)}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Trend */}
        <div className="card p-6 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg text-ink">Acquisition dans le temps</h3>
              <p className="text-sm text-ink-muted">Impressions · appels · ventes (par semaine)</p>
            </div>
            <Delta value={k.impressionsGrowth} />
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={client.acquisitionTrend} margin={{ left: -18, right: 6, top: 6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(16,40,30,0.06)" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#8A948F', fontSize: 12 }} dy={4} />
                <YAxis yAxisId="l" axisLine={false} tickLine={false} tick={{ fill: '#8A948F', fontSize: 11 }} tickFormatter={(v) => compact(v)} />
                <YAxis yAxisId="r" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#8A948F', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 12px 30px -12px rgba(16,40,30,0.3)', fontSize: 13 }} cursor={{ fill: 'rgba(16,185,129,0.05)' }} />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} iconType="circle" />
                <Bar yAxisId="l" dataKey="impressions" name="Impressions" fill="#A7F3D0" radius={[8, 8, 8, 8]} maxBarSize={22} />
                <Line yAxisId="r" dataKey="calls" name="Appels" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} />
                <Line yAxisId="r" dataKey="deals" name="Ventes" stroke="#0A0F0D" strokeWidth={2} strokeDasharray="4 3" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pipeline highlight */}
      <div className="card !bg-forest-900/90 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lime-400"><Wallet size={22} /></span>
            <div>
              <p className="text-sm text-paper-200/70">Pipeline généré (30 jours)</p>
              <p className="stat text-3xl text-white">{formatMoney(k.pipelineValue)}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div><p className="stat text-2xl text-emerald-400">{k.qualifiedCallsPerWeek}</p><p className="text-xs text-paper-200/70">appels qualifiés / sem.</p></div>
            <div><p className="stat text-2xl text-emerald-400">{p.closeRate}%</p><p className="text-xs text-paper-200/70">taux de closing</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Node({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl px-3 py-1.5 text-center ${accent ? 'bg-emerald-500 text-white' : 'bg-white/60 text-ink'}`}>
      <p className="stat text-base leading-none">{value}</p>
      <p className={`mt-0.5 text-[10px] uppercase tracking-wide ${accent ? 'text-white/80' : 'text-ink-muted'}`}>{label}</p>
    </div>
  )
}

function Arrow({ rate }: { rate: number }) {
  return (
    <div className="flex flex-col items-center text-ink-muted">
      <span className="text-[10px] font-semibold text-emerald-600">{rate}%</span>
      <span className="text-xs">→</span>
    </div>
  )
}
