import { useState, useRef, useEffect } from 'react'
import { Send, Phone, Video } from 'lucide-react'
import type { Client, Message } from '../../data/types'
import { Avatar } from '../../components/ui'
import { formatMessageTime } from '../../lib/format'

export default function ClientMessages({ client }: { client: Client }) {
  const [messages, setMessages] = useState<Message[]>(() => [...client.messages])
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        from: 'client',
        text,
        time: new Date('2026-07-09T12:00:00').toISOString(),
        read: true,
      },
    ])
    setDraft('')
  }

  return (
    <div className="animate-in">
      <h1 className="mb-5 font-serif text-3xl text-ink">Messagerie</h1>

      <div className="card flex h-[calc(100vh-13rem)] flex-col overflow-hidden">
        {/* Header — Lilia */}
        <div className="flex items-center gap-3 border-b border-cream-200 p-4">
          <Avatar initials="LM" color="#8A5E3B" size={42} />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-ink">Lilia Maksimtchouk</p>
            <p className="truncate text-xs text-ink-muted">Experte en image · The Look by Lilia</p>
          </div>
          <span className="chip bg-sage-100 text-sage-600">
            <span className="h-1.5 w-1.5 rounded-full bg-current" /> En ligne
          </span>
          <button className="btn-ghost" aria-label="Appel"><Phone size={17} /></button>
          <button className="btn-ghost" aria-label="Visio"><Video size={17} /></button>
        </div>

        {/* Messages — client's own on the right */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-cream-50/60 p-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'client' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                  m.from === 'client'
                    ? 'rounded-br-md bg-ink text-cream-50'
                    : 'rounded-bl-md bg-white text-ink-soft'
                }`}
              >
                {m.from === 'lilia' && (
                  <p className="mb-0.5 text-[11px] font-semibold text-camel-600">Lilia</p>
                )}
                <p className="leading-relaxed">{m.text}</p>
                <p
                  className={`mt-1 text-right text-[10px] ${
                    m.from === 'client' ? 'text-cream-100/60' : 'text-ink-muted/70'
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
              placeholder="Écrire à Lilia…"
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
  )
}
