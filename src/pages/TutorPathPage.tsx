import { useState } from 'react';
import {
  BrainCircuit, Sparkles, ArrowRight, ArrowLeft, CheckCircle2,
  Play, Volume2, Mic, Layers, BookOpen, Clock, Award, Zap,
  ShieldCheck, Compass, Gift, Briefcase, GraduationCap,
  HelpCircle, ChevronDown, ChevronUp, ExternalLink, FileText,
  Check, Activity, Headphones, MessageSquareCode, MessageCircle,
  Star, Target, Video, Presentation, Users, Flame, School,
  ChevronRight, LayoutGrid, X
} from 'lucide-react';

interface TeachingFormat {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  targetSectionId: string;
  icon: typeof BrainCircuit;
  borderClass: string;
  bgClass: string;
  textClass: string;
  badgeClass: string;
  hoverClass: string;
  summary: string;
  description: string;
  metrics: string[];
  actionLabel: string;
  actionType: 'trainer' | 'scroll' | 'hash';
  actionTarget?: string;
}

const TEACHING_FORMATS: TeachingFormat[] = [
  {
    id: 'core-ai',
    title: 'IntelliCoach AI™',
    badge: 'PRIMARY CORE AI',
    subtitle: '24/7 Engine →',
    targetSectionId: 'format-core-ai',
    icon: BrainCircuit,
    borderClass: 'border-cyan-400/80',
    bgClass: 'bg-cyan-950/40',
    textClass: 'text-cyan-400',
    badgeClass: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
    hoverClass: 'group-hover:text-cyan-300',
    summary: 'Autonomous 24/7 AI-First immersion trainer providing real-time phonetic acoustic grading (<0.2s latency), infinite voice simulations, and case diagnostics.',
    description: 'The revolutionary heart of ILA language acquisition. Replaces passive classroom lectures with 60 minutes of uninterrupted spoken output per hour. Acoustic wave analysis grades dental friction, vowel length, and compound word articulation in under 200ms.',
    metrics: ['24/7 Unlimited Access', '< 0.2s Phonetics', 'CEFR A1–C2 Mock Tests', 'B1 Stipend Unlocked'],
    actionLabel: 'Launch Live IntelliCoach Demo',
    actionType: 'trainer'
  },
  {
    id: 'video-ai',
    title: 'Video + AI',
    badge: 'AVATAR SYNC',
    subtitle: 'Neural Avatar →',
    targetSectionId: 'format-video-ai',
    icon: Video,
    borderClass: 'border-purple-400/80',
    bgClass: 'bg-purple-950/40',
    textClass: 'text-purple-400',
    badgeClass: 'text-purple-300 bg-purple-400/10 border-purple-400/30',
    hoverClass: 'group-hover:text-purple-300',
    summary: 'Synchronized photorealistic AI native video avatars delivering interactive masterclasses with conversational voice-stops and visual mouth articulation cues.',
    description: 'High-definition neural avatars simulate 1-on-1 human tutoring with photorealistic lipsync and facial micro-expressions. Features interactive pauses where the avatar waits for your spoken reply before advancing the lesson.',
    metrics: ['Photorealistic Lipsync', 'Interactive Pause-to-Speak', 'Bilingual Subtitles', 'Searchable Transcripts'],
    actionLabel: 'Practice with Neural Avatar',
    actionType: 'trainer'
  },
  {
    id: 'slide-ai',
    title: 'Slide + AI',
    badge: 'SMART DECKS',
    subtitle: 'Visual Drills →',
    targetSectionId: 'format-slide-ai',
    icon: Presentation,
    borderClass: 'border-indigo-400/80',
    bgClass: 'bg-indigo-950/40',
    textClass: 'text-indigo-400',
    badgeClass: 'text-indigo-300 bg-indigo-400/10 border-indigo-400/30',
    hoverClass: 'group-hover:text-indigo-300',
    summary: 'Interactive smart slide presentations with embedded audio pronunciation, visual grammar tree breakdowns, and spaced repetition (SRS) memory drills.',
    description: 'Combines German structural grammar architecture with dynamic audio playback and cognitive spaced repetition. Complex declensions and modal verb placements are visually mapped with color-coded syntax guides.',
    metrics: ['Animated Grammar Maps', 'SRS Flashcard Memory', 'Instant Audio Comparison', 'Downloadable Handouts'],
    actionLabel: 'Explore Smart Decks',
    actionType: 'scroll',
    actionTarget: 'format-slide-ai'
  },
  {
    id: 'human-tutors',
    title: 'Human Tutors',
    badge: '1-TO-1 & GROUP',
    subtitle: 'Live Faculty →',
    targetSectionId: 'format-human-tutors',
    icon: Users,
    borderClass: 'border-emerald-400/80',
    bgClass: 'bg-emerald-950/40',
    textClass: 'text-emerald-400',
    badgeClass: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30',
    hoverClass: 'group-hover:text-emerald-300',
    summary: 'Certified native German faculty and Telc/Goethe examiners conducting small group cohorts (max 12 students) and 1-on-1 embassy visa defense prep.',
    description: 'Live interactive classes with certified native German faculty. Provides deep cultural immersion, dialect nuances, and intensive mock visa defense rounds to guarantee your consulate and workplace readiness.',
    metrics: ['Goethe/Telc Certified', 'Max 12 Per Batch', 'Consular Defense Drills', 'Weekly 1-on-1 Audits'],
    actionLabel: 'View Live Faculty Batches',
    actionType: 'hash',
    actionTarget: '#education'
  },
  {
    id: 'camp-classes',
    title: 'Camp Classes',
    badge: 'MEGA COHORTS',
    subtitle: 'Public Camps →',
    targetSectionId: 'format-camp-classes',
    icon: Flame,
    borderClass: 'border-rose-400/80',
    bgClass: 'bg-rose-950/40',
    textClass: 'text-rose-400',
    badgeClass: 'text-rose-300 bg-rose-400/10 border-rose-400/30',
    hoverClass: 'group-hover:text-rose-300',
    summary: 'High-intensity weekend immersion camps and mega cohort bootcamps with peer speaking pods, competitive grammar blitzes, and mock exam marathons.',
    description: 'Weekend bootcamps that bring together hundreds of motivated German learners. Includes timed exam simulation marathons, peer breakout speaking pods, and high-energy vocabulary hackathons at competitive tuition.',
    metrics: ['Weekend Intensive Camps', 'Peer Dialogue Pods', 'Exam Marathon Blitz', 'Affordable Mass Cohorts'],
    actionLabel: 'Explore Mega Cohorts',
    actionType: 'hash',
    actionTarget: '#education'
  },
  {
    id: 'spot-classes',
    title: 'Spot Classes',
    badge: 'ON-SITE CAMPUS',
    subtitle: 'Schools & Unis →',
    targetSectionId: 'format-spot-classes',
    icon: School,
    borderClass: 'border-amber-400/80',
    bgClass: 'bg-amber-950/40',
    textClass: 'text-amber-400',
    badgeClass: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
    hoverClass: 'group-hover:text-amber-300',
    summary: 'On-site physical masterclasses delivered at partner universities, international schools, and enterprise corporate campuses with direct visa intake.',
    description: 'In-person workshops held directly on university and partner high school campuses. Equipped with dedicated hardware acoustic voice testing booths, on-the-spot document attestation, and counselor admissions desks.',
    metrics: ['On-Campus Workstations', 'Hardware Voice Booths', 'Biometric Assessment', 'Direct Document Intake'],
    actionLabel: 'Find Campus Spots',
    actionType: 'hash',
    actionTarget: '#applications?tab=Education'
  }
];


interface ScenarioDetail {
  id: string;
  title: string;
  badge: string;
  germanPrompt: string;
  englishPrompt: string;
  hint: string;
  recommendedResponse: string;
  phoneticBreakdown: string;
  fluencyScore: number;
  grammarScore: number;
  accentScore: number;
  feedbackNote: string;
}


const SCENARIOS: ScenarioDetail[] = [
  {
    id: 'embassy',
    title: 'German Embassy & Visa Consular Interview',
    badge: 'Consular Defense • Visa Readiness',
    germanPrompt: 'Warum möchten Sie in Deutschland studieren und wie finanzieren Sie Ihren Aufenthalt?',
    englishPrompt: 'Why do you wish to study in Germany and how will you finance your stay?',
    hint: 'State your enrolled program, emphasize your blocked bank account (Sperrkonto), and mention long-term career value.',
    recommendedResponse: 'Ich habe eine Zulassung an einer deutschen Hochschule erhalten und mein Sperrkonto ist bereits eingerichtet. Dieses Studium ermöglicht mir eine fundierte akademische Weiterbildung.',
    phoneticBreakdown: 'Akkusativ/Dativ harmony verified. Phonetics clear on "Sperrkonto" [ˈʃpɛʁˌkɔnto] and "Zulassung".',
    fluencyScore: 98,
    grammarScore: 99,
    accentScore: 95,
    feedbackNote: 'Flawless grammatical syntax with correct auxiliary verb placement. Exceeds B1/B2 consular standards.'
  },
  {
    id: 'workplace',
    title: 'Healthcare, Nursing & Tech Workplace Daily Standup',
    badge: 'Professional & Clinical German',
    germanPrompt: 'Können Sie uns ein kurzes Update über den Patientenstatus und Ihre anstehenden Aufgaben geben?',
    englishPrompt: 'Can you give us a quick update regarding the patient status and your upcoming tasks?',
    hint: 'Use standard handover phrasing (Übergabe), medication terminology, or sprint status in German.',
    recommendedResponse: 'Guten Morgen Team. Der Patient auf Zimmer vier ist stabil. Die Vitalwerte wurden dokumentiert und die Infusion wurde planmäßig gewechselt.',
    phoneticBreakdown: 'Strong emphasis on compound noun "Vitalwerte" and smooth dental articulation on "dokumentiert".',
    fluencyScore: 96,
    grammarScore: 97,
    accentScore: 94,
    feedbackNote: 'Clear professional tone. Proper usage of clinical passive constructions and polite greetings.'
  },
  {
    id: 'housing',
    title: 'City Registration (Anmeldung) & Flat Hunting (WG)',
    badge: 'Everyday German Life & Relocation',
    germanPrompt: 'Haben Sie die Wohnungsgeberbestätigung Ihres Vermieters für die offizielle Anmeldung dabei?',
    englishPrompt: 'Do you have the landlord confirmation (Wohnungsgeberbestätigung) with you for the official registration?',
    hint: 'Confirm having the original signed form, your passport, and rental agreement.',
    recommendedResponse: 'Ja, hier ist das unterschriebene Formular meines Vermieters zusammen mit meinem Reisepass und Mietvertrag.',
    phoneticBreakdown: 'Accurate pronunciation of compound term "Wohnungsgeberbestätigung" [ˈvoːnʊŋsˌɡeːbɐbəˌʃtɛːtɪɡʊŋ].',
    fluencyScore: 94,
    grammarScore: 98,
    accentScore: 92,
    feedbackNote: 'Handles administrative bureaucracy with native confidence. Critical for day-1 German relocation.'
  },
  {
    id: 'academic',
    title: 'University Oral Seminar & Technical Presentation',
    badge: 'Academic CEFR C1 & Research',
    germanPrompt: 'Welche Schlussfolgerungen ziehen Sie aus den empirischen Daten Ihrer Fallstudie?',
    englishPrompt: 'What conclusions do you draw from the empirical data of your case study?',
    hint: 'Use academic transition phrases like "Daraus lässt sich schließen, dass..."',
    recommendedResponse: 'Daraus lässt sich ableiten, dass die vorgeschlagene Systemarchitektur die Latenzzeit um mehr als dreißig Prozent reduziert.',
    phoneticBreakdown: 'Sophisticated academic connectors ("Daraus lässt sich ableiten") with exact modal verb positioning.',
    fluencyScore: 97,
    grammarScore: 100,
    accentScore: 96,
    feedbackNote: 'Academic C1 precision. Seamless subjunctive and complex clause subordinators.'
  }
];

export default function TutorPathPage() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activePathTab, setActivePathTab] = useState<'ai-first' | 'intensive' | 'hybrid' | 'career'>('ai-first');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [simulatedAudioActive, setSimulatedAudioActive] = useState(false);

  const activeScenario = SCENARIOS[selectedScenarioIndex];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTriggerAudio = () => {
    setSimulatedAudioActive(true);
    setTimeout(() => {
      setSimulatedAudioActive(false);
    }, 2800);
  };

  const handleLaunchTrainer = () => {
    window.dispatchEvent(new CustomEvent('open-language-trainer'));
  };

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen pb-24 text-slate-900">

      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] shadow-2xl border-b border-slate-800">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6 flex-wrap">
            <button onClick={() => navigateTo('#home')} className="hover:text-brand-300 transition-colors cursor-pointer">
              Home
            </button>
            <span>/</span>
            <button onClick={() => navigateTo('#education')} className="hover:text-brand-300 transition-colors cursor-pointer">
              All Courses
            </button>
            <span>/</span>
            <span className="text-brand-300 font-bold">Tutor Path &amp; Intelli-Coach™ Blueprint</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-brand-500/20 to-indigo-500/20 text-brand-300 border border-brand-400/30 text-xs font-black uppercase tracking-wider backdrop-blur-md">
                  <BrainCircuit className="w-4 h-4 text-amber-400 animate-pulse" />
                  Official Course Guide &amp; Intelli-Coach™
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold border border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  24/7 AI Voice Immersion
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold border border-white/10">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  CEFR A1–C2 Standardized
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Mastering Course Paths with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-amber-300">Intelli-Coach™ AI</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                The comprehensive architectural breakdown of ILA course paths. Learn how our revolutionary <strong>24/7 Intelli-Coach AI language immersion tutor</strong> pairs with certified native faculty, adaptive pacing tracks, and direct German visa &amp; job placements.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={handleLaunchTrainer}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-black text-sm shadow-xl shadow-brand-600/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Launch Live Intelli-Coach Demo</span>
                </button>

                <a
                  href="#core-teaching-formats"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-brand-300" />
                  <span>Explore 6 Teaching Formats</span>
                </a>

                <button
                  onClick={() => navigateTo('#education')}
                  className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-bold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Course Hub</span>
                </button>
              </div>

            </div>

            {/* Hero Feature Metric Card */}
            <div className="lg:col-span-4">
              <div className="bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                      Methodology Engine
                    </span>
                    <h3 className="text-lg font-black text-white">Intelli-Coach Matrix</h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-400/30 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <div className="text-2xl font-black text-white">24/7</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Voice Practice</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <div className="text-2xl font-black text-emerald-400">99.4%</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">CEFR Pass Rate</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <div className="text-2xl font-black text-amber-400">&lt; 0.2s</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Acoustic Feedback</div>
                  </div>
                  <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                    <div className="text-2xl font-black text-indigo-400">€1,000+</div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Monthly Stipend Link</div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  Replaces obsolete traditional rote learning with conversational neural AI simulation, ensuring 10x more spoken output before your embassy or employer interview.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STICKY SUB-NAVIGATION BAR (TUTOR PATHS FIRST) */}
      {/* <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 mb-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">

            <a
              href="#tutor-path"
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-black transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-brand-600 text-white shadow-md shadow-brand-600/20 mr-1"
              title="Tutor Path: Intelli-Coach AI & Course Page Blueprint"
            >
              <BrainCircuit className="w-4 h-4 text-amber-100 animate-pulse" />
              <span>Tutor Paths</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded-full font-bold uppercase tracking-wider hidden sm:inline">
                Active
              </span>
            </a>

            <button
              onClick={() => navigateTo('#course-1')}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap cursor-pointer"
            >
              German Language A1–C2
            </button>

            <button
              onClick={() => navigateTo('#course-2')}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap cursor-pointer"
            >
              IELTS Test Prep
            </button>

            <button
              onClick={() => navigateTo('#course-3')}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap cursor-pointer"
            >
              Software &amp; Cloud
            </button>

            <button
              onClick={() => navigateTo('#course-4')}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-all whitespace-nowrap cursor-pointer"
            >
              SAP Enterprise
            </button>

            <button
              onClick={() => navigateTo('#education')}
              className="px-3.5 py-2 rounded-full text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Catalog Blocks</span>
            </button>
          </div>

          <button
            onClick={handleLaunchTrainer}
            className="shrink-0 px-4 py-2 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 text-brand-600 fill-brand-600" />
            <span className="hidden sm:inline">Launch AI Demo</span>
          </button>
        </div>
      </div> */}

      {/* 3. 6 CORE TEACHING FORMATS MATRIX (EXACT REPLICA OF SPECIFICATION) */}
      <section id="core-teaching-formats" className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 pt-10 pb-12 scroll-mt-20">
        <div className="bg-[#0b1120] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Ambient lighting accents */}
          <div className="absolute top-0 left-1/4 w-96 h-40 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                    TEACHING PATHS MATRIX
                  </span>
                  <span className="text-slate-400 text-xs font-medium">
                    • Click any methodology below to jump directly to in-depth specs &amp; workflows
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                  Explore Our 6 Core Teaching Formats
                </h2>
              </div>
            </div>

            <button
              onClick={() => scrollToSection('format-video-ai')}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto shrink-0 shadow-sm hover:scale-102"
            >
              <span>In-Depth Specs Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>

          {/* 6 Formats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-6 relative z-10">
            {TEACHING_FORMATS.map((format) => {
              const IconComponent = format.icon;
              return (
                <div
                  key={format.id}
                  onClick={() => scrollToSection(format.targetSectionId)}
                  className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group hover:-translate-y-1 duration-200"
                >
                  <div className={`w-14 h-14 rounded-2xl border-2 ${format.borderClass} ${format.bgClass} flex items-center justify-center ${format.textClass} shadow-lg shadow-black/30 group-hover:scale-110 transition-all`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <span className={`text-[9px] font-black tracking-wider border px-2 py-0.5 rounded-full uppercase mt-3 whitespace-nowrap ${format.badgeClass}`}>
                    {format.badge}
                  </span>

                  <h4 className="text-sm font-black text-white mt-2 group-hover:text-amber-200 transition-colors">
                    {format.title}
                  </h4>

                  <span className={`text-[11px] text-slate-400 font-medium ${format.hoverClass} transition-colors mt-0.5`}>
                    {format.subtitle}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DETAILED TEACHING METHODOLOGIES & WORKFLOWS INTRO HEADER */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-4">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 text-xs font-black uppercase tracking-wider border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>Architectural Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Detailed Teaching Methodologies &amp; Workflows
          </h2>
          <p className="text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore in-depth specifications of our core learning modalities, starting with our primary AI engine down to campus-level execution.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: INTELLICOACH AI™ TUTORING ENGINE */}
      {/* ========================================================================= */}
      <section id="format-core-ai" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 scroll-mt-24 relative">
        <span id="core-trainer-section" className="absolute -top-24 pointer-events-none" />

        <div className="bg-gradient-to-br from-cyan-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-cyan-500/30 shadow-2xl relative overflow-hidden mb-12">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
                  Primary Flagship Product • Core AI
                </span>
                <span className="text-cyan-400/80 text-xs font-semibold">
                  24/7 Autonomous Tutoring
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Section 1: IntelliCoach AI™ Tutoring Engine
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                IntelliCoach AI™ is our proprietary neural education framework that powers personalized, 24/7 autonomous learning. It dynamically diagnoses each student’s comprehension gaps, conducts interactive Socratic voice dialogues, evaluates written and spoken syntax in real time, and auto-adjusts the curriculum pace to guarantee exam readiness and technical mastery.
              </p>
            </div>

            <button
              onClick={handleLaunchTrainer}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Try IntelliCoach AI Sample</span>
            </button>
          </div>

          {/* 3 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 relative z-10">
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-cyan-500/20 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Adaptive Neural Syllabus</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Continuously reorganizes lesson modules, pacing, and practice exercises based on continuous comprehension diagnostics.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-6 border border-cyan-500/20 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Real-Time Voice Mentoring</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Speak directly to the AI in German or English; receive sub-second phoneme-level pronunciation and grammar feedback.
              </p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-6 border border-cyan-500/20 space-y-3 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-inner">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Exam Simulation Benchmarking</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated Goethe, TELC, and IELTS mock testing with strict CEFR scoring criteria and instant weak-point heatmaps.
              </p>
            </div>
          </div>

          {/* IntelliCoach 4-Phase Operational Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>IntelliCoach 4-Phase Operational Workflow</span>
              </div>
              <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                Continuous 24/7 Loop
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Diagnostic Profiling',
                  desc: 'Evaluates baseline knowledge, grammar patterns, and optimal retention speeds.'
                },
                {
                  step: '2',
                  title: 'Socratic Delivery',
                  desc: 'Explains concepts through interactive video or slide decks with guided questions.'
                },
                {
                  step: '3',
                  title: 'Instant Remediation',
                  desc: 'Pauses on errors, simulates correct pronunciation, and generates targeted drill kits.'
                },
                {
                  step: '4',
                  title: 'Milestone Clearance',
                  desc: 'Simulates official exam conditions and signs off on certified chapter credentials.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-cyan-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INTERACTIVE LIVE SIMULATOR CONSOLE WIDGET */}

      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: VIDEO + AI DELIVERY METHODOLOGY */}
      {/* ========================================================================= */}
      <section id="format-video-ai" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 scroll-mt-24">
        <div className="bg-gradient-to-br from-purple-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-purple-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Video className="w-3.5 h-3.5 text-purple-400" />
                  IntelliCoach Mode 1 • 24/7 Voice &amp; Avatar Sync
                </span>
                <span className="text-purple-400/80 text-xs font-semibold">
                  Section 2 Methodology
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Section 2: Video + AI Delivery Methodology
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Synchronized photorealistic AI video avatars with real-time audio interaction, automated pauses for oral checkpoints, and dynamic instant summary generation.
              </p>
            </div>

            <button
              onClick={handleLaunchTrainer}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Video + AI Demo</span>
            </button>
          </div>

          {/* Features & Key Learner Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* Features & Capabilities */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-purple-500/20 space-y-4">
              <div className="flex items-center gap-2 text-purple-300 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Features &amp; Capabilities</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Video className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Synchronized Avatar Lectures</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      High-definition AI lecturer avatars with real-time lip sync, native accent modulation, and multi-lingual subtitles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Interactive Video Pauses</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      AI pauses lectures automatically at key intervals to test your understanding before continuing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Timestamped AI Summaries</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Instant bullet points, flashcards, and cheat sheets generated from exact timestamps in the video.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learner Benefits */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-purple-500/20 space-y-4">
              <div className="flex items-center gap-2 text-purple-300 font-black text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-purple-400" />
                <span>Key Learner Benefits</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero Waiting Time</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Clear complex grammar or technical doubts by speaking directly to the AI during the video stream.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Personalized Revision Clips</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      AI dynamically constructs custom 3-minute review reels focusing on your specific weak spots.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Variable Speed &amp; Multimodal Playback</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Listen in German, read in English, or switch languages on the fly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Execution Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="text-xs font-black uppercase tracking-wider text-purple-300 mb-5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Step-by-Step Execution Workflow</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Lecture Streaming',
                  desc: 'High-definition AI video avatar introduces concept & real-world context.'
                },
                {
                  step: '2',
                  title: 'Adaptive AI Pause',
                  desc: 'Video pauses; voice or prompt pops up with instant comprehension checkpoint.'
                },
                {
                  step: '3',
                  title: 'Voice / Error Feedback',
                  desc: 'Neural pronunciation or syntax scoring corrects mistakes immediately.'
                },
                {
                  step: '4',
                  title: 'Milestone Mastery',
                  desc: 'Next chapter unlocked + auto-generated flashcard deck saved to dashboard.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-purple-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SLIDE + AI DELIVERY METHODOLOGY */}
      {/* ========================================================================= */}
      <section id="format-slide-ai" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <div className="bg-gradient-to-br from-indigo-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Presentation className="w-3.5 h-3.5 text-indigo-400" />
                  IntelliCoach Mode 2 • Visual Interactive Decks
                </span>
                <span className="text-indigo-400/80 text-xs font-semibold">
                  Section 3 Methodology
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Section 3: Slide + AI Delivery Methodology
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Structured visual concept diagrams with embedded AI narration, inline drag-and-drop interactive sentence builders, and instant slide-level conversational Q&amp;A.
              </p>
            </div>

            <button
              onClick={handleLaunchTrainer}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <Presentation className="w-4 h-4 text-white" />
              <span>View Slide + AI Sample</span>
            </button>
          </div>

          {/* Features & Key Learner Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* Features & Capabilities */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-indigo-500/20 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Features &amp; Capabilities</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Presentation className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Dynamic Concept Diagrams</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      High-resolution structured slides with embedded voiceovers explaining every diagram component.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Contextual Drill Widgets</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Inline code editors, drag-and-drop German sentence builders, and vocabulary matching widgets right inside the slide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-indigo-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Slide-by-Slide AI Q&amp;A</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Query any text on any slide with natural language and get contextual clarifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learner Benefits */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-indigo-500/20 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-black text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Key Learner Benefits</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Maximum Visual Retention</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Ideal for rapid conceptual scanning, revision before exams, and visual learners.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Printable PDF Notes</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      1-click export of annotated slides with AI notes and customized revision guides.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Bite-Sized Modular Progression</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Complete 5-minute slide modules anytime on mobile or desktop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Execution Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="text-xs font-black uppercase tracking-wider text-indigo-300 mb-5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Step-by-Step Execution Workflow</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Micro-Slide Presentation',
                  desc: 'Structured slide deck provides visual anchors & grammatical/technical tables.'
                },
                {
                  step: '2',
                  title: 'Neural Voice Narration',
                  desc: 'AI voice walks through intricate examples, pronunciation rules, and caveats.'
                },
                {
                  step: '3',
                  title: 'Inline Interactive Drills',
                  desc: 'Interact with embedded fill-in-the-blanks, coding sandboxes, or dialogue builders.'
                },
                {
                  step: '4',
                  title: 'Summary Export',
                  desc: 'Download clean PDF handout + study checklist directly into your student portal.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-indigo-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: HIGHLY SKILLED TUTORS & LIVE FACULTY */}
      {/* ========================================================================= */}
      <section id="format-human-tutors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <div className="bg-gradient-to-br from-emerald-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  Live Human Mentorship • 1-to-1 &amp; Small Group Cohorts
                </span>
                <span className="text-emerald-400/80 text-xs font-semibold">
                  Section 4 Methodology
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Section 4: Highly Skilled Tutors &amp; Live Faculty
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Elite European faculty providing verified Goethe/TELC examination coaching, consular visa mock defenses, and high-impact speaking workshops.
              </p>
            </div>

            <button
              onClick={() => navigateTo('#applications?tab=Education')}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <Users className="w-4 h-4 text-white" />
              <span>Enroll with Live Tutor</span>
            </button>
          </div>

          {/* Features & Key Learner Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* Features & Capabilities */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Features &amp; Capabilities</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1-to-1 Private Mentoring</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Dedicated faculty sessions tailored exclusively for high-stakes Goethe A1-C2, IELTS 8.0+, or technical interview mastery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Small Group Workshops (Max 8 Peers)</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Collaborative debate sessions, conversation circles, and peer code reviews led by senior instructors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Certified European Faculty</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Native German &amp; European language specialists with verified Goethe-Institut and TELC accreditation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learner Benefits */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-300 font-black text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Key Learner Benefits</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Authentic Accent &amp; Nuance Refinement</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Human feedback on tone, cultural nuances, and conversational confidence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Mock Exam &amp; Interview Simulations</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Rigorous oral exam drills simulating official German university admission panels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Flexible Slot Scheduling</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Early morning, evening, and weekend batches tailored for working professionals and students.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Execution Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="text-xs font-black uppercase tracking-wider text-emerald-300 mb-5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Execution Workflow</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Diagnostic Assessment',
                  desc: 'Pre-evaluation of baseline fluency, target exam deadline, and schedule preference.'
                },
                {
                  step: '2',
                  title: 'Certified Mentor Match',
                  desc: 'Assigned dedicated native trainer or small cohort group based on proficiency tier.'
                },
                {
                  step: '3',
                  title: 'Live Interactive Workshop',
                  desc: 'High-engagement live audio/video sessions, real-time correction, and speaking drills.'
                },
                {
                  step: '4',
                  title: 'Weekly Audit & Exam Prep',
                  desc: 'Formal homework critique, mock exam scorecards, and final clearance signoff.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-emerald-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 (TRACK A): CAMP CLASSES & INTENSIVE BOOTCAMPS */}
      {/* ========================================================================= */}
      <section id="format-camp-classes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <div className="bg-gradient-to-br from-rose-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-rose-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Section 5 (Track A) • Cohort Bootcamps • Public &amp; Scheduled Camps
                </span>
                <span className="text-rose-400/80 text-xs font-semibold">
                  Intensive Immersion
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Camp Classes &amp; Intensive Bootcamps
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Mass synchronous cohorts bringing together hundreds of motivated candidates for accelerated exam sprints, hackathon challenges, and European recruiter showcases.
              </p>
            </div>

            <button
              onClick={() => navigateTo('#applications?tab=Education')}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white font-black text-xs sm:text-sm transition-all shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <Flame className="w-4 h-4 text-white" />
              <span>Register for Upcoming Camp</span>
            </button>
          </div>

          {/* Features & Key Learner Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* Features & Capabilities */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-2 text-rose-300 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Features &amp; Capabilities</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-rose-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Synchronous High-Volume Cohorts</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Immersive bootcamps hosting 500 to 2,000+ simultaneous students worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-rose-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Keynote Masterclasses &amp; Industry Panels</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Live masterclasses delivered by German enterprise leaders and AI tech founders.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-rose-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Team Breakout Hackathons</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Peer teams collaborate on 48-hour sprint challenges evaluated via automated AI scoring engines.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learner Benefits */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-2 text-rose-300 font-black text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-rose-400" />
                <span>Key Learner Benefits</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">High-Energy Social Momentum</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Gamified leaderboards, badges, and peer camaraderie keep motivation at peak levels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Rapid Skill Acceleration</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Clear an entire semester's practical curriculum in an intensive 3-to-5 day bootcamp.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct Recruiter Visibility</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Top 10% camp finishers get highlighted in our European partner recruiter network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Camp Class Execution Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="text-xs font-black uppercase tracking-wider text-rose-300 mb-5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-rose-400" />
              <span>Camp Class Execution Workflow</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Camp Registration',
                  desc: 'Enroll in public scheduled camp date & receive preparatory study kit + team ID.'
                },
                {
                  step: '2',
                  title: 'Daily Live Masterclasses',
                  desc: 'Synchronous masterclasses paired with automated AI drill checkpoints.'
                },
                {
                  step: '3',
                  title: 'Hackathon Challenge',
                  desc: 'Breakout sprint challenge with peer teams + AI evaluated submission review.'
                },
                {
                  step: '4',
                  title: 'Showcase & Badges',
                  desc: 'Live ranking ceremony, blockchain certificate issuance, and recruiter dispatch.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-rose-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-rose-600/30 text-rose-300 border border-rose-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5 (TRACK B): SPOT CLASSES (ON-SITE CAMPUS DELIVERY & BOOKING) */}
      {/* ========================================================================= */}
      <section id="format-spot-classes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 scroll-mt-24">
        <div className="bg-gradient-to-br from-amber-950/40 via-[#0b1120] to-slate-950 rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-96 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <School className="w-3.5 h-3.5 text-amber-400" />
                  Section 5 (Track B) • On-Premise Institutional Delivery • Schools, Colleges &amp; Universities
                </span>
                <span className="text-amber-400/80 text-xs font-semibold">
                  On-Site Campus Delivery
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Spot Classes (On-Site Campus Delivery &amp; Booking)
              </h2>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
                Direct on-premise execution delivering traveling European faculty, mobile acoustic voice labs, and certified curriculum straight to university campuses and high schools.
              </p>
            </div>

            <button
              onClick={() => navigateTo('#applications?tab=Education')}
              className="self-start lg:self-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer shrink-0 hover:scale-102"
            >
              <School className="w-4 h-4 text-slate-950" />
              <span>Book Spot Class for Your Campus</span>
            </button>
          </div>

          {/* On-Premise Execution Framework & Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-8 relative z-10">
            {/* On-Premise Execution Framework */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>On-Premise Execution Framework</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <School className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct On-Site Classroom Execution</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      ILA dispatches certified traveling instructors and smart mobile lab hardware directly to your school/college auditorium or computer lab.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Institution-Customized Curriculum</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Tailor the workshop specifically for semester break bootcamps, annual tech symposiums, or career placement readiness weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <BrainCircuit className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Hybrid Smart-Pod Integration</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Pairs on-site physical faculty with our 24/7 IntelliCoach AI LMS for continuous student progress tracking after the workshop ends.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits for Institutions & Students */}
            <div className="bg-slate-900/80 rounded-2xl p-6 border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-2 text-amber-300 font-black text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Benefits for Institutions &amp; Students</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Zero Logistical Burden for Colleges</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      ILA handles trainer logistics, instructional materials, assessment grading, and student certification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Special Institutional Group Pricing</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Subsidized per-student fee structures with volume grants for large institutional batches.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Direct European Job &amp; University Pipeline</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Top student performers receive pre-qualified sponsorship for German Work While You Study &amp; Public University admissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Booking & Spot Execution Workflow */}
          <div className="mt-8 pt-8 border-t border-slate-800/80 relative z-10">
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Institutional Booking &amp; Spot Execution Workflow</span>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Simple 4-Step Deployment
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '1',
                  title: 'Institutional Proposal',
                  desc: 'Submit campus request with preferred dates, student batch size (30-500+), and course domain.'
                },
                {
                  step: '2',
                  title: 'Curriculum Customization',
                  desc: 'Our academic dean aligns syllabus with institutional timetable and provisions student LMS portal keys.'
                },
                {
                  step: '3',
                  title: 'On-Site Faculty Deployment',
                  desc: 'Certified ILA faculty arrives on campus to conduct interactive physical workshops and lab simulations.'
                },
                {
                  step: '4',
                  title: 'Certification & Analytics',
                  desc: 'Official certificate distribution + comprehensive student performance executive report for college leadership.'
                }
              ].map((item) => (
                <div key={item.step} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 relative group hover:border-amber-500/40 transition-all">
                  <div className="w-8 h-8 rounded-full bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center justify-center text-xs font-black mb-3">
                    {item.step}
                  </div>
                  <h5 className="text-sm font-black text-white">{item.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Proposal Callout Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div>
              <h5 className="text-sm sm:text-base font-black text-white">
                Are you a Principal, HOD, Training &amp; Placement Officer, or Student Coordinator?
              </h5>
              <p className="text-xs text-slate-300 mt-0.5">
                Bring certified ILA instructors and European university pathways directly to your student body.
              </p>
            </div>
            <button
              onClick={() => navigateTo('#applications?tab=Education')}
              className="shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-102"
            >
              <span>Request Institutional Proposal Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. INTEGRATION WITH STUDENT STIPEND & CAREER PERKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                Integrated Student Ecosystem
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                How Your Tutor Path Connects with German Jobs &amp; €1,000+ Stipends
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Learning German with ILA is not an isolated academic exercise. Every lesson with Intelli-Coach™ moves you along the progression milestone toward our verified <strong>Work While You Study junior consultancy</strong> stipend (€1,000/month), module cashback rewards, and €0 tuition German public university admission.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xl font-black text-amber-400">€1,000+</div>
                  <div className="text-xs font-bold text-white mt-1">Monthly Work-Study Stipend</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Eligible at B1 CEFR completion</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xl font-black text-emerald-400">100% Free</div>
                  <div className="text-xs font-bold text-white mt-1">German Public Uni Tuition</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Direct university matching service</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xl font-black text-brand-400">Cashback</div>
                  <div className="text-xs font-bold text-white mt-1">Module Completion Rewards</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Earn while clearing exams on time</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => navigateTo('#work-while-you-study-page')}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Work &amp; Study Program</span>
              </button>
              <button
                onClick={() => navigateTo('#rewards')}
                className="w-full py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-brand-300" />
                <span>View Reward Tier System</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
            Got Questions?
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Frequently Asked Questions About Tutor Paths
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              q: "Can I switch between delivery pathways (e.g. from AI-First to Super-Intensive)?",
              a: "Yes, absolutely! You can upgrade or transition your pathway at any time without losing your accumulated CEFR progress or flashcard memory retention data. Any tuition difference is adjusted prorated."
            },
            {
              q: "How does Intelli-Coach AI compare to a human German tutor?",
              a: "Intelli-Coach AI is designed to augment and multiply the effectiveness of human faculty. While human tutors provide deep cultural context and motivation, Intelli-Coach gives you unlimited acoustic feedback, grammatical case testing, and 24/7 speaking repetitions so you don't feel nervous practicing alone."
            },
            {
              q: "Is the CEFR examination certificate recognized by the German Embassy for visa approval?",
              a: "Yes. ILA pathways prepare candidates directly for official standardized examinations (Goethe-Zertifikat, Telc Deutsch, and TestDaF), which are 100% officially accredited and recognized by the German Federal Foreign Office (Auswärtiges Amt)."
            },
            {
              q: "Do I need any special microphone or equipment to use Intelli-Coach AI?",
              a: "No special hardware is required. Any standard smartphone, tablet, laptop, or desktop with a built-in microphone and modern web browser (Chrome, Safari, Firefox, Edge) works seamlessly."
            },
            {
              q: "When can I start receiving the €1,000+ monthly Work While You Study stipend?",
              a: "Students who achieve German B1 proficiency and complete our Junior Consultant orientation become eligible for placement in verified enterprise translation, operations, and IT support roles."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-brand-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM ACTION LAUNCHER / STICKY FOOTER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center border border-slate-800 shadow-2xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-black uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            Ready to Begin?
          </span>

          <h2 className="text-3xl sm:text-4xl font-black max-w-2xl mx-auto leading-tight">
            Launch Your Journey with European Certification &amp; 24/7 AI Guidance
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Choose your preferred path, practice live with Intelli-Coach™, or consult with our academic advisors to configure your personalized study roadmap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigateTo('#applications?tab=Education')}
              className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm shadow-xl shadow-brand-600/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Apply for Course Enrollment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleLaunchTrainer}
              className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-amber-300" />
              <span>Practice AI Live Demo</span>
            </button>

            <button
              onClick={() => navigateTo('#education')}
              className="px-6 py-4 rounded-xl bg-transparent hover:bg-white/5 text-slate-300 hover:text-white font-bold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              <span>Return to All Courses</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
