import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import { Phone, Handshake, Wallet, Percent, PhoneCall } from 'lucide-react'
import type { Client } from '../../data/types'
import { Delta } from '../../components/ui'
import { compact, formatMoney, formatNumber } from '../../lib/format'

export default function AcquisitionPanel({ client }: { client: Client }) {
  const k = client.kpis
  const funnel = client.acquisitionFunnel
  const top = funnel[0].value

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Metric icon={PhoneCall} label="Appels qualifiés / sem." value={`${k.qualifiedCallsPerWeek}`} accent />
        <Metric icon={Phone} label="Appels bookés / 30j" value={`${k.callsBooked}`} />
        <Metric icon={Handshake} label="Clients signés / 30j" value={`${k.dealsWon}`} />
        <Metric icon={Percent} label="Taux de closing" value={`${k.closeRate}%`} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Funnel */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-display text-lg text-ink">Funnel d’acquisition</h3>
          <p className="mb-4 text-sm text-ink-muted">Des impressions aux clients signés</p>
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
                  <div className="h-7 overflow-hidden rounded-lg bg-paper-100">
                    <div
                      className="flex h-full items-center rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
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
              <p className="text-sm text-ink-muted">Impressions · appels · clients (par semaine)</p>
            </div>
            <Delta value={k.impressionsGrowth} />
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={client.acquisitionTrend} margin={{ left: -18, right: 6, top: 6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E7ECE9" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 12 }} />
                <YAxis yAxisId="l" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 11 }} tickFormatter={(v) => compact(v)} />
                <YAxis yAxisId="r" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#697570', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7ECE9', fontSize: 13 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="l" dataKey="impressions" name="Impressions" fill="#A7F3D0" radius={[5, 5, 0, 0]} maxBarSize={26} />
                <Line yAxisId="r" dataKey="calls" name="Appels" stroke="#059669" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line yAxisId="r" dataKey="deals" name="Clients" stroke="#0A0F0D" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pipeline highlight */}
      <div className="card flex flex-wrap items-center justify-between gap-4 bg-forest-900 p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lime-400">
            <Wallet size={22} />
          </span>
          <div>
            <p className="text-sm text-paper-200/70">Pipeline généré (30 jours)</p>
            <p className="stat text-3xl text-white">{formatMoney(k.pipelineValue)}</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="stat text-2xl text-emerald-400">{k.qualifiedCallsPerWeek}</p>
            <p className="text-xs text-paper-200/70">appels qualifiés / sem.</p>
          </div>
          <div>
            <p className="stat text-2xl text-emerald-400">{k.closeRate}%</p>
            <p className="text-xs text-paper-200/70">taux de closing</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Phone
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className={`card p-5 ${accent ? 'bg-emerald-500 text-white' : ''}`}>
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
        <Icon size={17} />
      </span>
      <p className={`stat mt-3 text-2xl ${accent ? 'text-white' : 'text-ink'}`}>{value}</p>
      <p className={`text-xs ${accent ? 'text-white/80' : 'text-ink-muted'}`}>{label}</p>
    </div>
  )
}
