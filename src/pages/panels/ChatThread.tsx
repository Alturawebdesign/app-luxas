import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import type { Message } from '../../data/types'
import { formatMessageTime, TODAY } from '../../lib/format'

export default function ChatThread({
  initial,
  self,
  placeholder,
  otherLabel,
}: {
  initial: Message[]
  self: 'thomas' | 'client'
  placeholder: string
  otherLabel: string
}) {
  const [messages, setMessages] = useState<Message[]>(initial)
  const [draft, setDraft] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  // reset when switching threads
  useEffect(() => setMessages(initial), [initial])

  const send = () => {
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}-${text.length}`, from: self, text, time: new Date(TODAY).toISOString(), read: true },
    ])
    setDraft('')
  }

  return (
    <>
      <div className="flex-1 space-y-3 overflow-y-auto bg-paper-50/60 p-4">
        {messages.map((m) => {
          const mine = m.from === self
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm shadow-soft ${
                  mine ? 'rounded-br-md bg-emerald-600 text-white' : 'rounded-bl-md bg-white text-ink-soft'
                }`}
              >
                {!mine && <p className="mb-0.5 text-[11px] font-semibold text-emerald-700">{otherLabel}</p>}
                <p className="leading-relaxed">{m.text}</p>
                <p className={`mt-1 text-right text-[10px] ${mine ? 'text-white/60' : 'text-ink-muted/70'}`}>
                  {formatMessageTime(m.time)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-paper-200 p-3">
        <div className="flex items-center gap-2">
          <input
            className="input"
            placeholder={placeholder}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button onClick={send} disabled={!draft.trim()} className="btn-primary shrink-0 px-3.5 py-2.5 disabled:opacity-40" aria-label="Envoyer">
            <Send size={17} />
          </button>
        </div>
      </div>
    </>
  )
}
