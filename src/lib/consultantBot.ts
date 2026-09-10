import { consultantService } from '../services/api';

export type ConsultantTopic = 'visa' | 'arrival' | 'housing' | 'local' | 'jobs' | 'general'

export interface ConsultantReplyResult {
  reply: string
  actions?: string[]
  sessionId?: string
  isFallback?: boolean
  leadDetected?: {
    email?: string
    phone?: string
  }
}

/**
 * Detect email and phone numbers from user messages
 */
export function extractContactInfo(text: string): { email?: string; phone?: string } {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{3,5}/)
  
  const validPhone = phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 8 ? phoneMatch[0].trim() : undefined

  return {
    email: emailMatch ? emailMatch[0] : undefined,
    phone: validPhone,
  }
}

/**
 * Detect if message contains high buying intent or callback requests
 */
export function hasHighLeadIntent(text: string): boolean {
  const lower = text.toLowerCase()
  const intentKeywords = [
    'call me', 'contact me', 'reach me', 'call back', 'callback',
    'enroll', 'register', 'admission', 'apply now', 'book consultation',
    'appointment', 'talk to advisor', 'speak to counselor', 'my number is',
    'my phone', 'my email'
  ]
  return intentKeywords.some((keyword) => lower.includes(keyword))
}

export const topicLabels: Record<ConsultantTopic, string> = {
  visa: 'Visa Process',
  arrival: 'Arrival in Germany',
  housing: 'Finding Rooms',
  local: 'Local Guidance',
  jobs: 'Job Hunting',
  general: 'General Help',
}


export const topicStarters: Record<ConsultantTopic, string> = {
  visa: 'I need help with my visa application process.',
  arrival: 'I am arriving in Germany soon and need guidance.',
  housing: 'How do I find affordable rooms or apartments?',
  local: 'What local services should I know about in Germany?',
  jobs: 'I am looking for job opportunities in Germany.',
  general: 'Hello, I need assistance with my ILA journey.',
}

const responses: Record<ConsultantTopic, string[]> = {
  visa: [
    'For visa processing, ILA Global supports Business, Tourist, Student, and Job Seeker visas. Upload your documents to our AI Document Processor for a completeness check — it typically saves 60% processing time.',
    'Student visa checklist: admission letter, blocked account (Sperrkonto), health insurance, passport photos, and proof of language level. I can guide you step-by-step. Which visa type are you applying for?',
    'Job Seeker visa requires proof of qualifications, CV, financial means (~€947/month), and health insurance. Our team reviews applications within 48 hours.',
  ],
  arrival: [
    'Upon arrival: register your address (Anmeldung) within 14 days at the Bürgeramt, open a bank account, and get health insurance activated. ILA provides an arrival checklist PDF — shall I outline the first week?',
    'Airport to city: use DB (Deutsche Bahn) app for trains, or FLIX/ regional buses. For Berlin, get a temporary SIM at the airport and download BVG for public transport.',
    'First 48 hours: Anmeldung appointment, SIM card, grocery run (Aldi/Lidl/Rewe), and connect with your ILA arrival buddy if enrolled in our program.',
  ],
  housing: [
    'Popular platforms: WG-Gesucht (shared flats), ImmobilienScout24, eBay Kleinanzeigen. For students, Studentenwerk dormitories are affordable. Budget: €400–800/month depending on city.',
    'Berlin tip: start in outer districts (Neukölln, Wedding) for lower rent. Always visit before paying. ILA partners with verified landlords in Munich, Frankfurt, and Berlin.',
    'Required documents for renting: SCHUFA (credit check), proof of income or blocked account, ID/passport, and sometimes Mietschuldenfreiheitsbescheinigung.',
  ],
  local: [
    'Essential apps: DB Navigator (trains), Google Maps, Too Good To Go (food deals), NINA (emergency alerts). Public transport varies by city — Berlin AB zones, Munich MVV, Frankfurt RMV.',
    'Healthcare: register with a Hausarzt (GP). Emergency: 112. Non-emergency medical: 116 117. Pharmacy (Apotheke) — look for green cross sign.',
    'Integration: Volkshochschule (VHS) offers affordable German courses. ILA\'s Work While You Study program connects you with part-time roles while studying.',
  ],
  jobs: [
    'Job portals: StepStone, Indeed.de, LinkedIn, Make it in Germany (official). Blue-collar roles: our Doctor to Driver program places candidates in logistics, warehouse, and driving roles.',
    'Upload your resume to our AI Match portal — 94% match accuracy across 500+ employers. Include German level and work authorization status for best results.',
    'Ausbildung (vocational training) pays €800–1,200/month while you learn. IT and healthcare Ausbildung are in high demand in Bavaria and NRW.',
  ],
  general: [
    'Hello! I\'m Ilas, your ILA Live Consultant. I can help with visas, arrival, housing, local life, and jobs in Germany. Pick a topic below or type your question.',
    'ILA Global offers end-to-end support: education, visa, placement, and earn-while-learn programs. What would you like to explore today?',
  ],
}

export function getConsultantReply(topic: ConsultantTopic, userMessage: string, messageIndex: number): string {
  const topicResponses = responses[topic]
  const lower = userMessage.toLowerCase()

  if (lower.includes('thank') || lower.includes('danke')) {
    return 'Gerne! If you need human support, use "Talk to Us" below — our team responds within 24 hours. Viel Erfolg!'
  }
  if (lower.includes('chancenkarte') || lower.includes('opportunity card')) {
    return 'The **Opportunity Card (Chancenkarte)** allows you to search for jobs in Germany for up to 1 year with a recognized degree or vocational qualification, plus German (A1+) or English (B2). Check our **Jobs** page to run your eligibility evaluation!'
  }
  if (lower.includes('ausbildung')) {
    return '**Ausbildung (Vocational Training)** pays €800–€1,200/month while you learn and requires German B1/B2. High demand in IT, healthcare/nursing, and mechatronics across Bavaria and NRW.'
  }
  if (lower.includes('work while') || lower.includes('earn while')) {
    return 'Our **Work While You Study** pathway allows you to earn ₹10k–₹25k/mo in India or €900–€1,400/mo in Germany (140 full days allowance), complete with airport pickup, WG accommodation, and job placement support.'
  }
  if (lower.includes('berlin')) {
    return 'Berlin has strong demand for IT Ausbildung, healthcare trainees, and logistics jobs. Average part-time: 20 hrs/week for students. ILA has partner housing in Neukölln and Wedding.'
  }
  if (lower.includes('munich') || lower.includes('münchen')) {
    return 'Munich offers premium medical and engineering pathways. Public hospitals like Klinikum rechts der Isar accept FSP candidates. Housing is competitive — start search 3 months early.'
  }
  if (lower.includes('frankfurt')) {
    return 'Frankfurt is ideal for finance, logistics, and import-export careers. Part-time work common in airport/logistics hubs. ILA matches candidates with Rhein-Main employers.'
  }
  if (lower.includes('reward') || lower.includes('points') || lower.includes('junior consultant')) {
    return 'Our **Rewards & Junior Consultant** program awards 10 pts for verified signups, 50 pts for course enrollments, and cash unlocks of up to ₹5,000/mo along with an official work experience letter.'
  }

  return topicResponses[messageIndex % topicResponses.length]
}

export const consultantWelcome =
  'Hi! I\'m **Ilas**, your ILA Live Consultant. I\'ll guide you through visa processes, arriving in Germany, finding rooms, local tips, and job hunting. Choose a topic or ask anything!'

export const ILA_SYSTEM_PROMPT = `You are "Ilas", the official AI Live Consultant for ILA Global & ILA Academy (ilaglobal.com).
Your goal is to guide prospective students, professionals, and job seekers on education, career pathways, visas, and relocation to Germany and Europe.

Key Knowledge Base:
1. ILA ACADEMY COURSES:
   - Foreign Languages: German (A1, A2, B1, B2, C1) with Goethe/Telc exam prep; French (DELF/DALF A1-B2).
   - Professional Software: SAP certifications (MM, SD, FICO, ABAP).
   - IT & Computer: Fullstack Web Development, Cloud & DevOps, Python Data Science.
   - Engineering Crash Courses: Electrical, Mechanical, and Mechatronics accelerated review.
   - Competitive Exams: GATE, GRE, IELTS coaching.
   - Learning Modes: Human-Led (online/offline batches), AI-Integrated (Video + AI, Slide + AI, and IntelliCoach).

2. WORK WHILE YOU STUDY:
   - In India: Earn ₹10,000–₹25,000/month while undergoing technical & language training.
   - Abroad (Germany/Europe): Earn €900–€1,400/month in part-time student roles (students can legally work 140 full days or 280 half days per year).
   - Complete relocation support: Airport pickup, WG (shared flat) housing assistance, bank account setup, Blocked Account (Sperrkonto ~€11,904/yr), German health insurance (TK/Barmer), and Bürgeramt address registration (Anmeldung within 14 days).
   - German Project Onboarding Pathway: Language immersion + technical readiness.

3. JOBS & CAREER PATHWAYS:
   - Opportunity Card (Chancenkarte): Points-based job search visa for Germany. Requirements: recognized degree/vocational qualification, German A1 or English B2.
   - Job Seeker Visas, direct employer placement, and interview prep.
   - Ausbildung: Dual vocational training in Germany paying €800–€1,200/month stipend while studying.
   - Doctor to Driver / Logistics pathways.
   - AI Resume Match with 500+ European partner companies.

4. REWARDS & JUNIOR CONSULTANT PROGRAM:
   - Students earn 10 points per signup, 50 points per enrollment, and 1,000 points milestones.
   - Monthly cash rewards unlock at ₹5,000 with a digital consultant ID card and official experience certificate.

5. WEBSITE NAVIGATION:
   - Education: /#education (course catalog)
   - Study Abroad: /#study-abroad (eligibility checker)
   - Visa Services: /#visa (embassy requirements & checklist)
   - Jobs & Placements: /#jobs (Chancenkarte & job portal)
   - Work While You Study: /#work-while-you-study
   - Rewards: /#rewards (Junior Consultant dashboard)

Instructions:
- Keep answers concise, highly informative, and encouraging (2 to 4 short paragraphs or bullet points).
- Use markdown bolding (**example**) for key requirements, numbers, and deadlines.
- If the user asks for human contact, remind them to use the "Call Us" or "Email Us" buttons below.
- Always answer directly and specifically to the user's question.`

interface ChatHistoryItem {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface TokenUsageStats {
  totalPromptTokens: number
  totalCandidateTokens: number
  totalTokens: number
  totalCalls: number
  lastUpdated: string
}

const TOKEN_STORAGE_KEY = 'ila_token_usage_stats'

export function getTokenUsageStats(): TokenUsageStats {
  try {
    const saved = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // Ignore storage parse error
  }
  return {
    totalPromptTokens: 0,
    totalCandidateTokens: 0,
    totalTokens: 0,
    totalCalls: 0,
    lastUpdated: new Date().toISOString(),
  }
}

export function recordTokenUsage(promptTokens = 0, candidateTokens = 0, totalTokens = 0) {
  try {
    const current = getTokenUsageStats()
    const updated: TokenUsageStats = {
      totalPromptTokens: current.totalPromptTokens + promptTokens,
      totalCandidateTokens: current.totalCandidateTokens + candidateTokens,
      totalTokens: current.totalTokens + (totalTokens || promptTokens + candidateTokens),
      totalCalls: current.totalCalls + 1,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(updated))
    console.info(
      `%c[ILA AI Token Usage] Latest: ${totalTokens} tokens (Prompt: ${promptTokens}, Output: ${candidateTokens}) | Total Cumulative: ${updated.totalTokens} tokens across ${updated.totalCalls} calls`,
      'color: #0284c7; font-weight: bold;'
    )
    return updated
  } catch {
    return null
  }
}

/**
 * Sends a message to the Django REST Framework Live Consultant backend
 * with graceful fallback to Gemini API or predefined domain responses.
 */
export async function askGeminiConsultant(
  userMessage: string,
  history: ChatHistoryItem[],
  topic: ConsultantTopic = 'general',
  messageIndex = 0,
  sessionId?: string,
  userContext?: { email?: string; phone?: string; name?: string; userId?: string }
): Promise<ConsultantReplyResult> {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY
  const detectedContact = extractContactInfo(userMessage)
  const isHighIntent = hasHighLeadIntent(userMessage)

  const leadPayload = (detectedContact.email || detectedContact.phone || isHighIntent)
    ? {
        email: detectedContact.email || userContext?.email,
        phone: detectedContact.phone || userContext?.phone,
      }
    : undefined

  // 1. Primary: Trigger Central Django REST Framework Backend API (/api/v1/consultant/chat/)
  try {
    const { data } = await consultantService.chat({
      session_id: sessionId,
      message: userMessage,
      topic,
      history: history.slice(-8).map((h) => ({
        role: h.role === 'user' ? 'user' : 'model',
        content: h.content,
      })),
      user_id: userContext?.userId,
      user_name: userContext?.name,
      user_email: detectedContact.email || userContext?.email,
      user_phone: detectedContact.phone || userContext?.phone,
    })

    if (data && data.reply) {
      if (data.usage) {
        recordTokenUsage(data.usage.prompt_tokens, data.usage.completion_tokens, data.usage.total_tokens)
      }
      return {
        reply: data.reply,
        actions: data.suggested_actions,
        sessionId: data.session_id || sessionId,
        isFallback: false,
        leadDetected: leadPayload,
      }
    }
  } catch (err) {
    console.warn('[LiveConsultant] Backend API chat call failed, attempting direct AI or local fallback:', err)
  }

  // 2. Secondary: Direct Google Gemini API (supports both AIza and new AQ. format keys)
  if (geminiApiKey && typeof geminiApiKey === 'string' && (geminiApiKey.startsWith('AIzaSy') || geminiApiKey.startsWith('AQ.'))) {
    try {
      const contents = [
        ...history.slice(-6).map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ]

      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey}`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: ILA_SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        
        // Track token usage from Google Gemini response
        if (data?.usageMetadata) {
          const { promptTokenCount = 0, candidatesTokenCount = 0, totalTokenCount = 0 } = data.usageMetadata
          recordTokenUsage(promptTokenCount, candidatesTokenCount, totalTokenCount)
        }

        if (text && typeof text === 'string' && text.trim().length > 0) {
          return {
            reply: text.trim(),
            sessionId,
            isFallback: true,
            leadDetected: leadPayload,
          }
        }
      }
    } catch {
      // Fallback
    }
  }

  // 3. Graceful Fallback: High-quality rule-based domain responses
  return {
    reply: getConsultantReply(topic, userMessage, messageIndex),
    sessionId,
    isFallback: true,
    leadDetected: leadPayload,
  }
}


