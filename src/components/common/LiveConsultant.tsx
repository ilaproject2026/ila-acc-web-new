import { useState, useEffect, useRef, useCallback } from 'react'
import {
  MessageCircle,
  X,
  Send,
  Plane,
  Home,
  MapPin,
  Briefcase,
  FileText,
  Phone,
  Mail,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'
import type { ChatMessage } from '../../types'
import {
  consultantWelcome,
  getConsultantReply,
  askGeminiConsultant,
  topicLabels,
  topicStarters,
  type ConsultantTopic,
} from '../../lib/consultantBot'
import { consultantService } from '../../services/api/consultant.service'
import { STORAGE_KEYS } from '../../services/api/client'
import { saveInquiry } from '../../lib/db'

const topicIcons: Record<ConsultantTopic, typeof Plane> = {
  visa: FileText,
  arrival: Plane,
  housing: Home,
  local: MapPin,
  jobs: Briefcase,
  general: MessageCircle,
}

const SESSION_STORAGE_KEY = 'ilas_consultant_session'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000 // 30 minutes inactivity timeout

interface StoredSessionData {
  sessionId: string
  lastActive: number
  topic: ConsultantTopic
  messages: Array<{
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    actions?: string[]
    timestamp: string
  }>
  leadConverted?: boolean
  pendingSync?: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: string
  }>
}

export default function LiveConsultant() {
  const [open, setOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [topic, setTopic] = useState<ConsultantTopic>('general')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [replyCount, setReplyCount] = useState(0)
  const [leadConverted, setLeadConverted] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Save session state to localStorage
  const persistSession = useCallback((
    sid: string,
    currentTopic: ConsultantTopic,
    msgs: ChatMessage[],
    isConverted: boolean,
    pending: Array<{ role: 'user' | 'assistant' | 'system'; content: string; timestamp: string }> = []
  ) => {
    try {
      const data: StoredSessionData = {
        sessionId: sid,
        lastActive: Date.now(),
        topic: currentTopic,
        leadConverted: isConverted,
        messages: msgs.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          actions: m.actions,
          timestamp: m.timestamp instanceof Date ? m.timestamp.toISOString() : new Date(m.timestamp).toISOString(),
        })),
        pendingSync: pending,
      }
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.warn('[LiveConsultant] Failed to persist session to localStorage:', e)
    }
  }, [])

  // Start fresh chat session
  const startNewSession = useCallback(() => {
    const newId = crypto.randomUUID()
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: consultantWelcome,
      timestamp: new Date(),
    }
    setSessionId(newId)
    setTopic('general')
    setReplyCount(0)
    setLeadConverted(false)
    setMessages([welcomeMsg])
    persistSession(newId, 'general', [welcomeMsg], false, [])
  }, [persistSession])

  // Initialize or restore session with 30-minute inactivity check
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY)
      if (stored) {
        const parsed: StoredSessionData = JSON.parse(stored)
        const isExpired = Date.now() - parsed.lastActive > SESSION_TIMEOUT_MS

        if (!isExpired && parsed.sessionId) {
          setSessionId(parsed.sessionId)
          setTopic(parsed.topic || 'general')
          setLeadConverted(!!parsed.leadConverted)
          if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
            setMessages(
              parsed.messages.map((m) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                actions: m.actions,
                timestamp: new Date(m.timestamp),
              }))
            )
            return
          }
        }
      }
    } catch (e) {
      console.warn('[LiveConsultant] Error parsing stored session:', e)
    }

    // Default to a brand-new session if none exists or session expired
    startNewSession()
  }, [startNewSession])

  // Attempt to sync pending offline messages whenever online
  useEffect(() => {
    const syncOfflineMessages = async () => {
      try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY)
        if (!stored) return
        const parsed: StoredSessionData = JSON.parse(stored)
        if (parsed.pendingSync && parsed.pendingSync.length > 0 && parsed.sessionId) {
          const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || undefined
          const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME) || undefined

          const res = await consultantService.syncTranscript({
            session_id: parsed.sessionId,
            topic: parsed.topic,
            user_email: userEmail,
            user_name: userName,
            messages: parsed.pendingSync,
          })

          if (res.data?.success) {
            parsed.pendingSync = []
            localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(parsed))
          }
        }
      } catch {
        // Backend not yet available; will retry next time
      }
    }

    if (open) {
      syncOfflineMessages()
    }
  }, [open])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = async (text: string, selectedTopic?: ConsultantTopic) => {
    if (!text.trim()) return
    const activeTopic = selectedTopic ?? topic
    const activeSessionId = sessionId || crypto.randomUUID()
    if (!sessionId) setSessionId(activeSessionId)

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    const currentHistory = [...messages, userMsg]
    setMessages(currentHistory)
    setInput('')
    setTyping(true)

    const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL) || undefined
    const userName = localStorage.getItem(STORAGE_KEYS.USER_NAME) || undefined
    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || undefined

    let assistantMsg: ChatMessage
    let isOfflineFallback = false

    try {
      const result = await askGeminiConsultant(
        text,
        currentHistory.map((m) => ({ role: m.role, content: m.content })),
        activeTopic,
        replyCount,
        activeSessionId,
        { email: userEmail, name: userName, userId }
      )

      setReplyCount((c) => c + 1)
      if (result.sessionId && result.sessionId !== activeSessionId) {
        setSessionId(result.sessionId)
      }

      isOfflineFallback = !!result.isFallback

      assistantMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.reply,
        actions: result.actions,
        timestamp: new Date(),
      }

      // Auto-convert lead to CRM Inquiry if contact info / high purchase intent detected
      if (result.leadDetected && !leadConverted) {
        setLeadConverted(true)
        const contactEmail = result.leadDetected.email || userEmail
        const contactPhone = result.leadDetected.phone

        // 1. Post to backend lead conversion API
        consultantService.convertToInquiry(activeSessionId, {
          name: userName || 'Live Consultant Visitor',
          email: contactEmail,
          phone: contactPhone,
          notes: `Lead captured via Live Consultant (${topicLabels[activeTopic]} chat). Message: "${text.slice(0, 160)}"`,
          category: activeTopic === 'visa' ? 'Visa' : activeTopic === 'jobs' ? 'Jobs' : 'General Front Office',
        }).catch(() => {})

        // 2. Persist locally to CRM Inquiries desk for immediate dashboard visibility
        saveInquiry({
          name: userName || 'Live Consultant Lead',
          email: contactEmail || 'consultant.lead@ilaglobal.com',
          phone: contactPhone || 'Lead via Live Chat',
          type: 'Online',
          course: `Live Consultant Lead: ${topicLabels[activeTopic]}`,
          path: `Session ID: ${activeSessionId.slice(0, 8)}`,
          price: '$0.00',
          paymentStatus: 'Pending',
          category: activeTopic === 'visa' ? 'Visa' : activeTopic === 'jobs' ? 'Jobs' : 'General Front Office',
          crmStatus: 'New Lead',
          pipelineStage: 'Intake',
          intakeNotes: `Lead converted from Live Consultant. Topic: ${topicLabels[activeTopic]}. Text: "${text}". Contact: ${contactEmail || contactPhone || 'Captured in session'}.`,
          source: 'Live AI Consultant',
          source_url: window.location.pathname,
        })
      }
    } catch {
      isOfflineFallback = true
      const fallback = getConsultantReply(activeTopic, text, replyCount)
      setReplyCount((c) => c + 1)
      assistantMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fallback,
        timestamp: new Date(),
      }
    } finally {
      setTyping(false)
    }

    const updatedHistory = [...currentHistory, assistantMsg]
    setMessages(updatedHistory)

    // Build pending sync list if offline fallback was used
    let pendingMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string; timestamp: string }> = []
    if (isOfflineFallback) {
      try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY)
        if (stored) {
          const parsed: StoredSessionData = JSON.parse(stored)
          pendingMessages = parsed.pendingSync || []
        }
      } catch {
        // ignore
      }
      pendingMessages.push(
        { role: 'user', content: userMsg.content, timestamp: userMsg.timestamp.toISOString() },
        { role: 'assistant', content: assistantMsg.content, timestamp: assistantMsg.timestamp.toISOString() }
      )
    }

    persistSession(activeSessionId, activeTopic, updatedHistory, leadConverted, pendingMessages)
  }

  const selectTopic = (t: ConsultantTopic) => {
    setTopic(t)
    sendMessage(topicStarters[t], t)
  }

  const renderContent = (content: string) =>
    content.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 px-5 py-3.5 bg-brand-700 text-white rounded-full shadow-lg hover:bg-brand-800 transition-all hover:scale-105 group"
          title="Chat with Ilas, your Live Consultant"
        >
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold text-sm hidden sm:inline">Ilas Live Consultant</span>
          {messages.length > 1 && (
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          )}
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[90] w-[calc(100vw-2rem)] sm:w-[420px] max-h-[calc(100vh-3rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-brand-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent-400 flex items-center justify-center text-brand-900 font-bold text-xs shadow-xs">
                IL
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm">Ilas Live Consultant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" title="Online" />
                </div>
                <div className="text-[10px] text-blue-200 flex items-center gap-2">
                  <span>Visa · Arrival · Housing · Jobs</span>
                  {sessionId && (
                    <span className="text-blue-300 font-mono text-[9px]">#{sessionId.slice(0, 6)}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={startNewSession}
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
                title="Start New Conversation (Reset 30-min session)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-blue-200 hover:text-white transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lead conversion status badge */}
          {leadConverted && (
            <div className="bg-emerald-50 px-3 py-1.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Advisor team connected to this inquiry
              </span>
              <span className="text-[10px] text-emerald-600 bg-emerald-100/60 px-1.5 py-0.5 rounded font-mono">
                CRM Saved
              </span>
            </div>
          )}

          {/* Topic chips */}
          <div className="px-3 py-2 border-b border-slate-100 flex gap-1.5 overflow-x-auto bg-slate-50/50 scrollbar-none">
            {(Object.keys(topicLabels) as ConsultantTopic[]).filter((t) => t !== 'general').map((t) => {
              const Icon = topicIcons[t]
              return (
                <button
                  key={t}
                  onClick={() => selectTopic(t)}
                  className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    topic === t ? 'bg-brand-700 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {topicLabels[t]}
                </button>
              )
            })}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[280px] max-h-[380px] bg-slate-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-brand-700 text-white rounded-br-sm'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.actions.map((act, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => sendMessage(act)}
                        className="px-2.5 py-1 bg-white border border-brand-300 text-brand-700 hover:bg-brand-50 rounded-full text-[10px] font-semibold shadow-xs transition-all hover:scale-102"
                      >
                        {act} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="text-xs text-slate-500 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-100 w-fit">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-brand-600 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </span>
                <span className="text-[11px]">Ilas is thinking...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage(input)
            }}
            className="p-3 border-t border-slate-100 bg-white flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about visa, housing, jobs, or leave your phone/email..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50/50 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="p-2.5 rounded-xl bg-brand-700 text-white hover:bg-brand-800 disabled:opacity-50 disabled:hover:bg-brand-700 transition-colors shadow-xs"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Talk to Us backup */}
          <div className="px-3 py-2.5 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Talk to a Human Consultant
              </p>
              <span className="text-[9px] text-slate-400">30-min active session</span>
            </div>
            <div className="flex gap-2">
              <a
                href="tel:+493012345678"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:border-brand-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                Call Us
              </a>
              <a
                href="mailto:contact@ilaglobal.com"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:border-brand-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-brand-600" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

