import { useState, useMemo, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Send, Search, ArrowLeft, Phone, Video } from 'lucide-react'
import { clients, fullName, initials } from '../data/clients'
import type { Message } from '../data/types'
import { Avatar } from '../components/ui'
import { formatMessageTime, timeAgo } from '../lib/format'

interface Thread {
  clientId: string
  messages: Message[]
}

export default function Messages() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Local, mutable copy of conversations so sending works in the demo.
  const [threads, setThreads] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(clients.map((c) => [c.id, [...c.messages]])),
  )
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')

  const activeId = id ?? clients[0].id
  const active = clients.find((c) => c.id === activeId) ?? clients[0]
  const messages = threads[activeId] ?? []

  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, activeId])

  const conversations: Thread[] = useMemo(
    () =>
      clients
        .filter((c) => fullName(c).toLowerCase().includes(query.toLowerCase()))
        .map((c) => ({ clientId: c.id, messages: threads[c.id] ?? [] }))
        .sort((a, b) => {
          const la = a.messages[a.messages.length - 1]?.time ?? ''
          const lb = b.messages[b.messages.length - 1]?.time ?? ''
          return lb.localeCompare(la)
        }),
    [query, threads],
  )

  const send = () => {
    const text = draft.trim()
    if (!text) return
    const msg: Message = {
      id: `local-${Date.now()}`,
      from: 'lilia',
      text,
      time: new Date('2026-07-09T12:00:00').toISOString(),
      read: true,
    }
    setThreads((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), msg] }))
    setDraft('')
  }

  return (
    <div className="animate-in">
      <h1 className="mb-5 font-serif text-3xl text-ink">Messagerie</h1>

      <div className="card grid h-[calc(100vh-13rem)] grid-cols-1 overflow-hidden md:grid-cols-[320px_1fr]">
        {/* Conversation list */}
        <div
          className={`flex flex-col border-r border-cream-200 ${
            id ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="border-b border-cream-200 p-4">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                className="input pl-9"
                placeholder="Rechercher…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map(({ clientId, messages: msgs }) => {
              const c = clients.find((x) => x.id === clientId)!
              const last = msgs[msgs.length - 1]
              const unread = msgs.filter((m) => m.from === 'client' && !m.read).length
              return (
                <button
                  key={clientId}
                  onClick={() => navigate(`/messagerie/${clientId}`)}
                  className={`flex w-full items-center gap-3 border-b border-cream-100 px-4 py-3 text-left transition-colors hover:bg-cream-50 ${
                    clientId === activeId ? 'bg-cream-100' : ''
                  }`}
                >
                  <Avatar initials={initials(c)} color={c.avatarColor} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-ink">{fullName(c)}</p>
                      {last && (
                        <span className="shrink-0 text-[11px] text-ink-muted">{timeAgo(last.time)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-ink-muted">
                        {last ? (last.from === 'lilia' ? 'Vous : ' : '') + last.text : 'Nouvelle conversation'}
                      </p>
                      {unread > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-camel-500 px-1.5 text-[11px] font-semibold text-cream-50">
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
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-cream-200 p-4">
            <button className="btn-ghost -ml-2 md:hidden" onClick={() => navigate('/messagerie')}>
              <ArrowLeft size={18} />
            </button>
            <Avatar initials={initials(active)} color={active.avatarColor} size={42} />
            <div className="min-w-0 flex-1">
              <button
                onClick={() => navigate(`/clients/${active.id}`)}
                className="font-medium text-ink hover:text-camel-600"
              >
                {fullName(active)}
              </button>
              <p className="truncate text-xs text-ink-muted">{active.role}</p>
            </div>
            <button className="btn-ghost" aria-label="Appel"><Phone size={17} /></button>
            <button className="btn-ghost" aria-label="Visio"><Video size={17} /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-cream-50/60 p-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'lilia' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                    m.from === 'lilia'
                      ? 'rounded-br-md bg-ink text-cream-50'
                      : 'rounded-bl-md bg-white text-ink-soft'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <p
                    className={`mt-1 text-right text-[10px] ${
                      m.from === 'lilia' ? 'text-cream-100/60' : 'text-ink-muted/70'
                    }`}
                  >
                    {formatMessageTime(m.time)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-cream-200 p-3">
            <div className="flex items-center gap-2">
              <input
                className="input"
                placeholder={`Écrire à ${active.firstName}…`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button
                onClick={send}
                disabled={!draft.trim()}
                className="btn-primary shrink-0 px-3.5 py-2.5 disabled:opacity-40"
                aria-label="Envoyer"
              >
                <Send size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
