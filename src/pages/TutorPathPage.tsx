import { useState } from 'react';
import { 
  BrainCircuit, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, 
  Play, Volume2, Mic, Layers, BookOpen, Clock, Award, Zap, 
  ShieldCheck, Compass, Gift, Briefcase, GraduationCap, 
  HelpCircle, ChevronDown, ChevronUp, ExternalLink, FileText, 
  Check, Activity, Headphones, MessageSquareCode, MessageCircle,
  Star, Target
} from 'lucide-react';

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
                  href="#path-breakdown"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-brand-300" />
                  <span>Explore 4 Delivery Paths</span>
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

      {/* 2. CORE HIGHLIGHT: INTELLI-COACH™ NEURAL AI TRAINER IN-DEPTH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-black uppercase tracking-wider border border-brand-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>The Main Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            How Intelli-Coach™ AI Transforms Your Learning
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            In typical language classrooms with 25 students, you speak for barely 2 minutes per hour. 
            <strong> Intelli-Coach™ gives you 60 minutes of uninterrupted spoken practice per hour</strong>, analyzed with millisecond phonetic precision.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center font-black text-lg shadow-inner">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Real-Time Acoustic Phonetics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Analyzes micro-intonations, German vowel elongation, and complex consonant clusters like <em>"ch"</em> and <em>"pf"</em> with instant audio playback comparison.
            </p>
            <div className="pt-2 text-[11px] font-bold text-brand-600 flex items-center gap-1">
              <span>99.2% Phonetic Accuracy</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-black text-lg shadow-inner">
              <MessageSquareCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">German Grammatical Case Diagnostics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly diagnoses slip-ups between <strong>Nominativ, Akkusativ, Dativ, and Genitiv</strong>, explaining prepositions and article mutations on the fly.
            </p>
            <div className="pt-2 text-[11px] font-bold text-indigo-600 flex items-center gap-1">
              <span>Automatic Syntax Rectifier</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center font-black text-lg shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Real Embassy &amp; Visa Simulation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prepares candidates for official German Consular interviews, student blocked account defense, and European employer technical screenings.
            </p>
            <div className="pt-2 text-[11px] font-bold text-amber-600 flex items-center gap-1">
              <span>Zero-Failure Embassy Drill</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-black text-lg shadow-inner">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Spaced Repetition Memory (SRS)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dynamically generates flashcards based on your vocabulary hesitation time, locking 500+ high-frequency words into long-term cognitive memory.
            </p>
            <div className="pt-2 text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <span>Cognitive Recall Engine</span>
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

        {/* INTERACTIVE LIVE SIMULATOR CONSOLE WIDGET */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  Interactive Live Simulator Console
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Test an Intelli-Coach Scenario Right Now
              </h3>
            </div>

            <button
              onClick={handleLaunchTrainer}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Mic className="w-4 h-4 text-amber-300" />
              <span>Open Full Voice Simulator</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Scenario Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedScenarioIndex === idx
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 text-[10px] flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Active Scenario Card Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Prompt & Recommended Response */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-950/80 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400 px-2.5 py-0.5 bg-brand-500/10 rounded border border-brand-500/20">
                    {activeScenario.badge}
                  </span>
                  <button 
                    onClick={handleTriggerAudio}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Volume2 className={`w-4 h-4 ${simulatedAudioActive ? 'text-amber-400 animate-bounce' : ''}`} />
                    <span>Listen Native</span>
                  </button>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    AI Examiner Question (German):
                  </div>
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                    "{activeScenario.germanPrompt}"
                  </p>
                  <p className="text-xs text-slate-400 italic mt-1">
                    English: {activeScenario.englishPrompt}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                  <strong>Examiner Goal:</strong> {activeScenario.hint}
                </div>
              </div>

              {/* Recommended Student Output */}
              <div className="bg-brand-950/40 rounded-2xl p-5 sm:p-6 border border-brand-800/40 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-brand-300">
                  <span className="uppercase tracking-wider">Candidate Model Response</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> CEFR Certified
                  </span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-brand-100 leading-relaxed">
                  "{activeScenario.recommendedResponse}"
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-brand-900/50">
                  <strong>Phonetic Check:</strong> {activeScenario.phoneticBreakdown}
                </div>
              </div>

            </div>

            {/* Right Live Score Diagnostic Gauge */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/90 rounded-2xl p-6 border border-slate-800 space-y-6">
              
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Instant Neural Evaluation
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">Real-time Performance Metrics</h4>
              </div>

              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">Grammar &amp; Case Agreement</span>
                    <span className="text-emerald-400">{activeScenario.grammarScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500" 
                      style={{ width: `${activeScenario.grammarScore}%` }} 
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">Acoustic Accent &amp; Pitch</span>
                    <span className="text-brand-400">{activeScenario.accentScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-400 rounded-full transition-all duration-500" 
                      style={{ width: `${activeScenario.accentScore}%` }} 
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">Fluency &amp; Spoken Speed</span>
                    <span className="text-amber-400">{activeScenario.fluencyScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                      style={{ width: `${activeScenario.fluencyScore}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Examiner Feedback</span>
                <p className="leading-relaxed text-[11px]">
                  {activeScenario.feedbackNote}
                </p>
              </div>

              <button
                onClick={handleLaunchTrainer}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Practice Spoken Voice Session</span>
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* 3. DETAILED PATH EXPLANATION (The 4 Delivery Pathways) */}
      <section id="path-breakdown" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 scroll-mt-20">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Path Explanations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Choose the Perfect Delivery Pathway for Your Pace
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every ILA course allows you to select from 4 distinct learning tracks based on your availability, career timeline, and preference for live faculty versus autonomous AI practice.
          </p>
        </div>

        {/* Path Selection Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActivePathTab('ai-first')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activePathTab === 'ai-first'
                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'
            }`}
          >
            <BrainCircuit className={`w-5 h-5 mb-2 ${activePathTab === 'ai-first' ? 'text-amber-300' : 'text-brand-600'}`} />
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Track 1</div>
            <div className="text-sm sm:text-base font-black leading-snug mt-0.5">Intelli-Coach™ AI-First</div>
          </button>

          <button
            onClick={() => setActivePathTab('intensive')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activePathTab === 'intensive'
                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'
            }`}
          >
            <Zap className={`w-5 h-5 mb-2 ${activePathTab === 'intensive' ? 'text-amber-300' : 'text-amber-500'}`} />
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Track 2</div>
            <div className="text-sm sm:text-base font-black leading-snug mt-0.5">Super-Intensive Fast-Track</div>
          </button>

          <button
            onClick={() => setActivePathTab('hybrid')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activePathTab === 'hybrid'
                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'
            }`}
          >
            <Clock className={`w-5 h-5 mb-2 ${activePathTab === 'hybrid' ? 'text-amber-300' : 'text-indigo-600'}`} />
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Track 3</div>
            <div className="text-sm sm:text-base font-black leading-snug mt-0.5">Flexible Evening &amp; Weekend</div>
          </button>

          <button
            onClick={() => setActivePathTab('career')}
            className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
              activePathTab === 'career'
                ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-600/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-brand-300'
            }`}
          >
            <Briefcase className={`w-5 h-5 mb-2 ${activePathTab === 'career' ? 'text-amber-300' : 'text-emerald-600'}`} />
            <div className="text-xs font-bold uppercase tracking-wider opacity-80">Track 4</div>
            <div className="text-sm sm:text-base font-black leading-snug mt-0.5">Job &amp; Ausbildung Blueprint</div>
          </button>
        </div>

        {/* Selected Path Deep Breakdown Card */}
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl transition-all">
          
          {activePathTab === 'ai-first' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-black uppercase tracking-wider border border-brand-200">
                  Autonomous 24/7 AI-First Immersion
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Intelli-Coach™ AI-First Pathway
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engineered for independent, ambitious self-starters who want maximum speaking repetitions without waiting for scheduled physical classrooms. Practice around the clock with infinite voice simulations, speech recognition analysis, and instant scoring.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">24/7 Unlimited AI Access</h5>
                      <p className="text-[11px] text-slate-500">Zero session caps or queue wait-times</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Instant Pronunciation Grading</h5>
                      <p className="text-[11px] text-slate-500">Waveform acoustic breakdown in &lt;200ms</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Official Exam Mock Tests</h5>
                      <p className="text-[11px] text-slate-500">Goethe, Telc &amp; TestDaF rubric simulation</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Stipend Track Eligible</h5>
                      <p className="text-[11px] text-slate-500">Unlocks Work While You Study upon B1</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigateTo('#applications?tab=Education&path=Intelli-Coach-AI-First')}
                    className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs transition-all shadow-md shadow-brand-600/25 cursor-pointer flex items-center gap-2"
                  >
                    <span>Enroll for AI-First Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleLaunchTrainer}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 text-brand-600" />
                    <span>Test AI Lesson</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-brand-900 to-slate-900 text-white p-7 rounded-3xl shadow-xl space-y-4">
                <span className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">Track Specifications</span>
                <div className="space-y-3 divide-y divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Weekly Commitment</span>
                    <span className="font-bold text-white">5–10 Hours (Adaptive Self-Pace)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">CEFR Level Speed</span>
                    <span className="font-bold text-white">4–6 Weeks per Level</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Faculty Review</span>
                    <span className="font-bold text-white">Bi-Weekly Milestone Audit</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Certification Voucher</span>
                    <span className="font-bold text-emerald-400">Included (Telc / Goethe)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Device Support</span>
                    <span className="font-bold text-white">Mobile, Tablet, Desktop Browser</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePathTab === 'intensive' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
                  Daily Immersion • Fast Embassy Readiness
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Super-Intensive Fast-Track Cohort
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tailored for students who need to submit their German visa applications or university admissions in under 90 days. Features daily live classes with German native trainers supplemented by daily evening drills in the Intelli-Coach AI simulator.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Daily Live Faculty Sessions</h5>
                      <p className="text-[11px] text-slate-500">2.5 hours of live instruction Monday–Friday</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Full Level in 4 Weeks</h5>
                      <p className="text-[11px] text-slate-500">Fastest pathway to German A1, A2, or B1</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Embassy Interview Coaching</h5>
                      <p className="text-[11px] text-slate-500">1-on-1 consular visa defense drills</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Guaranteed Exam Booking</h5>
                      <p className="text-[11px] text-slate-500">Priority seat reservation at official centers</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigateTo('#applications?tab=Education&path=Super-Intensive-Fast-Track')}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition-all shadow-md shadow-amber-500/25 cursor-pointer flex items-center gap-2"
                  >
                    <span>Enroll for Super-Intensive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigateTo('#education')}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    View Upcoming Batches
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-7 rounded-3xl shadow-xl space-y-4">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Track Specifications</span>
                <div className="space-y-3 divide-y divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Weekly Commitment</span>
                    <span className="font-bold text-white">15–20 Hours Live + AI Drills</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Schedule</span>
                    <span className="font-bold text-white">Morning (09:00) / Evening (18:00)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Class Size</span>
                    <span className="font-bold text-white">Capped at 12 Students</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Certification Pass Assurance</span>
                    <span className="font-bold text-emerald-400">100% Free Retake Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePathTab === 'hybrid' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider border border-indigo-200">
                  For University Students &amp; Working Professionals
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Flexible Evening &amp; Weekend Cohort
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Designed so you never have to choose between your current job or degree and your European migration aspirations. Live faculty lectures occur on Friday evenings and Saturdays, while weekday homework is automatically coached by Intelli-Coach AI.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Zero Workday Conflict</h5>
                      <p className="text-[11px] text-slate-500">Late evenings (20:00) or Saturday/Sunday</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Recorded Live Masterclasses</h5>
                      <p className="text-[11px] text-slate-500">Cloud recordings with searchable transcripts</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">AI Night Companion</h5>
                      <p className="text-[11px] text-slate-500">Ask grammar doubts anytime at 2:00 AM</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Flexible Module Pausing</h5>
                      <p className="text-[11px] text-slate-500">Pause for university exams without penalty</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigateTo('#applications?tab=Education&path=Flexible-Evening-Weekend')}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow-md shadow-indigo-600/25 cursor-pointer flex items-center gap-2"
                  >
                    <span>Enroll for Flexible Track</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigateTo('#education')}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                  >
                    Select Batch Timings
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white p-7 rounded-3xl shadow-xl space-y-4">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Track Specifications</span>
                <div className="space-y-3 divide-y divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Weekly Commitment</span>
                    <span className="font-bold text-white">6–8 Hours Live + 4 Hours AI</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">CEFR Completion</span>
                    <span className="font-bold text-white">8–10 Weeks per Level</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Attendance Policy</span>
                    <span className="font-bold text-white">Adaptive (Recorded Lectures)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Mentorship</span>
                    <span className="font-bold text-indigo-300">1-on-1 Academic Advisor</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePathTab === 'career' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
                  Direct European Employment &amp; Dual Vocational Training
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  German Job-Seeker &amp; Ausbildung Blueprint
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A career-bound program that bundles B1/B2 German mastery with European CV formatting, employer interview simulations, and verified placements for IT, nursing, logistics, and engineering Ausbildung contracts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Direct Employer Interviews</h5>
                      <p className="text-[11px] text-slate-500">Interviews with German healthcare &amp; tech firms</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Europass CV &amp; Anschreiben</h5>
                      <p className="text-[11px] text-slate-500">German cover letters written to DIN 5008 norms</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">Opportunity Card (Chancenkarte)</h5>
                      <p className="text-[11px] text-slate-500">Point calculation and visa dossier assembly</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">€0 Tuition University Link</h5>
                      <p className="text-[11px] text-slate-500">Option to transition to funded German degrees</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigateTo('#applications?tab=Education&path=Job-Ausbildung-Blueprint')}
                    className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-md shadow-emerald-600/25 cursor-pointer flex items-center gap-2"
                  >
                    <span>Enroll for Career Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => navigateTo('#jobs-page')}
                    className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Browse Open Positions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white p-7 rounded-3xl shadow-xl space-y-4">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Track Specifications</span>
                <div className="space-y-3 divide-y divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Target Outcome</span>
                    <span className="font-bold text-emerald-300">Signed German Work Contract / Visa</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Starting Salary / Stipend</span>
                    <span className="font-bold text-white">€1,100 – €3,800 / Month</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">B2 Professional Mock Rounds</span>
                    <span className="font-bold text-white">Included with HR Specialists</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Visa Approval Guarantee</span>
                    <span className="font-bold text-white">99.9% Document Audit</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </section>

      {/* 4. COMPARATIVE MATRIX TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded">
                Feature Comparison
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Side-by-Side Pathway Comparison
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">
              All tracks include verified European CEFR certification vouchers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-slate-50 text-slate-700">
                  <th className="py-3 px-4 font-black">Pathway Feature</th>
                  <th className="py-3 px-4 font-black text-brand-700">AI-First Track</th>
                  <th className="py-3 px-4 font-black text-amber-700">Super-Intensive</th>
                  <th className="py-3 px-4 font-black text-indigo-700">Flexible Evening</th>
                  <th className="py-3 px-4 font-black text-emerald-700">Career &amp; Ausbildung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Weekly Pacing</td>
                  <td className="py-3.5 px-4">5–10 hrs (Self-Paced)</td>
                  <td className="py-3.5 px-4">15–20 hrs (Daily)</td>
                  <td className="py-3.5 px-4">8–10 hrs (Fri/Sat/Sun)</td>
                  <td className="py-3.5 px-4">12–15 hrs (Custom)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Live Native Faculty</td>
                  <td className="py-3.5 px-4">Bi-Weekly Audits</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Daily (Mon–Fri)</td>
                  <td className="py-3.5 px-4">Weekends + Recordings</td>
                  <td className="py-3.5 px-4">Weekly + HR Mentors</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">24/7 Intelli-Coach AI Access</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Unlimited VIP</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Unlimited VIP</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Unlimited VIP</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Unlimited VIP</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Exam Voucher (Goethe / Telc)</td>
                  <td className="py-3.5 px-4">Optional Add-on</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Included ($220 value)</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Included ($220 value)</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Included ($220 value)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Work &amp; Study Stipend Link</td>
                  <td className="py-3.5 px-4">Upon B1 Clear</td>
                  <td className="py-3.5 px-4">Fast-tracked (30 days)</td>
                  <td className="py-3.5 px-4">Upon B1 Clear</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">Immediate Placement Match</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-900">Recommended For</td>
                  <td className="py-3.5 px-4">Self-learners, Tech coders</td>
                  <td className="py-3.5 px-4">Imminent visa deadlines</td>
                  <td className="py-3.5 px-4">Full-time employees</td>
                  <td className="py-3.5 px-4">Immediate job/dual study</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. USER INSTRUCTION MANUAL: HOW TO USE THE COURSE PAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-black uppercase tracking-wider border border-amber-200">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Course Page User Manual</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            How to Navigate the Course Page Like a Pro
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Follow this step-by-step visual blueprint to easily browse courses, preview syllabus material, select batch timings, and initiate intake.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                1
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Header Actions</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Hero Section &amp; Fast Jump</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              At the top of the Course Page, use <strong>"Enroll in a Course"</strong> to jump directly into the application pool, or click <strong>"Browse Catalog Blocks"</strong> to jump directly down to the full course card selection.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Saves you from endless scrolling</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                2
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sub Navigation</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Sticky Sub-Nav Bar Switcher</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              As you scroll, the sticky bar remains docked at the top. Click any course pill (German Language, IELTS, Software Engineering, Tutor Path) to smoothly jump directly to that program block.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Includes the highlighted "Tutor Path" key</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                3
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batch &amp; Timings</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Path Cards &amp; Batch Timings</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under each course, examine the delivery path tiles. Use the dropdown to toggle between morning, evening, or weekend batches. Click an available timing slot to pre-configure your enrollment.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Real-time availability indicator</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                4
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Free Materials</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Curriculum Handouts &amp; Vouchers</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore the dedicated materials section on the course page. Download sample chapter PDFs, CEFR exam roadmaps, vocabulary flashcards, and visa checklist toolkits before registering.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Free instant PDF &amp; media downloads</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                5
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interactive Testing</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">1-Click Interactive Demos</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click <strong>"Watch Course Demo"</strong> on any path tile to trigger the interactive AI trainer modal. Test pronunciation corrections and sample questions before enrolling.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Experience real lessons with 0 commitment</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 text-xs font-black flex items-center justify-center border border-brand-200">
                6
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seamless Handoff</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">Smart Intake Pre-Population</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              When you click <strong>"Enroll for this Path"</strong>, the application form automatically pre-selects your course name, selected batch, timing slot, and pathway without redundant re-typing.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-brand-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Connected with DRF backend token generator</span>
            </div>
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
