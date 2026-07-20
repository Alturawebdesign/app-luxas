import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Search, ArrowLeft } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import { Avatar } from '../components/ui'
import { timeAgo } from '../lib/format'
import ChatThread from './panels/ChatThread'

export default function Messages() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const activeId = id ?? clients[0].id
  const active = clients.find((c) => c.id === activeId) ?? clients[0]

  const conversations = useMemo(
    () =>
      clients
        .filter((c) => fullName(c).toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          const la = a.messages[a.messages.length - 1]?.time ?? ''
          const lb = b.messages[b.messages.length - 1]?.time ?? ''
          return lb.localeCompare(la)
        }),
    [query],
  )

  return (
    <div className="animate-in">
      <h1 className="mb-5 font-display text-3xl font-semibold text-ink">Messagerie</h1>

      <div className="card grid h-[calc(100vh-13rem)] grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]">
        {/* List */}
        <div className={`flex flex-col border-r border-paper-200 ${id ? 'hidden md:flex' : 'flex'}`}>
          <div className="border-b border-paper-200 p-4">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input className="input pl-9" placeholder="Rechercher…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const last = c.messages[c.messages.length - 1]
              const unread = c.messages.filter((m) => m.from === 'client' && !m.read).length
              return (
                <button
                  key={c.id}
                  onClick={() => navigate(`/messagerie/${c.id}`)}
                  className={`flex w-full items-center gap-3 border-b border-paper-100 px-4 py-3 text-left transition-colors hover:bg-paper-50 ${
                    c.id === activeId ? 'bg-paper-100' : ''
                  }`}
                >
                  <Avatar initials={initials(c)} color={c.avatarColor} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-ink">{fullName(c)}</p>
                      {last && <span className="shrink-0 text-[11px] text-ink-muted">{timeAgo(last.time)}</span>}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-ink-muted">
                        {last ? (last.from === 'thomas' ? 'Vous : ' : '') + last.text : ''}
                      </p>
                      {unread > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-[11px] font-semibold text-white">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Thread */}
        <div className={`flex flex-col ${id ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex items-center gap-3 border-b border-paper-200 p-4">
            <button className="btn-ghost -ml-2 md:hidden" onClick={() => navigate('/messagerie')}><ArrowLeft size={18} /></button>
            <Avatar initials={initials(active)} color={active.avatarColor} size={42} />
            <div className="min-w-0 flex-1">
              <button onClick={() => navigate(`/clients/${active.id}`)} className="font-medium text-ink hover:text-emerald-700">
                {fullName(active)}
              </button>
              <p className="truncate text-xs text-ink-muted">{active.role} · {active.company}</p>
            </div>
          </div>
          <ChatThread
            key={active.id}
            initial={active.messages}
            self="thomas"
            otherLabel={active.firstName}
            placeholder={`Écrire à ${active.firstName}…`}
          />
        </div>
      </div>
    </div>
  )
}
