import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Briefcase, 
  TrendingUp, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Crown, 
  GraduationCap, 
  Gift, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Home, 
  Users, 
  BarChart3, 
  Code, 
  Zap, 
  SunMedium, 
  Flame,
  ChevronLeft,
  ChevronRight,
  Check,
  Coins,
  Euro,
  Wallet,
  Clock
} from 'lucide-react';

const brochureSlides = [
  {
    id: 'freshers-pathway',
    tag: 'Immediate Corporate Intake',
    badge: 'Zero Career Gap',
    title: 'Freshers: Step Straight Into Corporate Job Pilots',
    subtitle: '₹10,000 to ₹30,000 Monthly Stipend • 1-Year Lifetime Certificate',
    desc: 'Do not waste months searching for entry-level vacancies. Join our active corporate projects right after completing your degree or diploma and build verified work experience.',
    targetSection: 'freshers-pathway',
    statNumber: '₹30,000/mo',
    statLabel: 'Candidate Stipend Tier',
    bgImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80'
  },
  {
    id: 'german-pathway',
    tag: 'International Relocation',
    badge: 'German Project Pathway',
    title: 'Validate Local Service Pilots & Fly to Germany',
    subtitle: 'Company Toolkits Provided • Direct Sponsor Relocation',
    desc: 'Run hands-on technical or business pilots (Solar, EV, Diagnostics, Trade) locally. Win client orders with our supply chain to qualify for direct German business sponsorships.',
    targetSection: 'german-pathway',
    statNumber: '100%',
    statLabel: 'Sponsorship Pathway',
    bgImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=85&w=1600'
  },
  {
    id: 'paid-tracks',
    tag: 'Practical Work Tracks',
    badge: '3 Paid Domains',
    title: 'Paid Junior Consultant Work Tracks & Toolkits',
    subtitle: 'Software, SEO, AI Social & Solar Technical Service Businesses',
    desc: 'Work on live web applications, multi-channel growth funnels, or on-ground solar and technical installation pilots with dedicated senior guidance.',
    targetSection: 'paid-tracks',
    statNumber: '3 Major',
    statLabel: 'High-Demand Work Tracks',
    bgImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=85&w=1600'
  },
  {
    id: 'earn-in-germany',
    tag: 'On-Ground European Income',
    badge: 'Abroad Student Coordination',
    title: 'Part-Time Earning in Germany & Abroad as Coordinator',
    subtitle: '€50 to €250 Per Task: Rooms, Transit & Local Documentation',
    desc: 'When you arrive in Germany, pick up student support tasks on your portal. Help new arriving Indian students with WG rooms, city registration, and airport pickups for Euro payouts.',
    targetSection: 'earn-in-germany',
    statNumber: '€250+',
    statLabel: 'Per On-Ground Task',
    bgImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=85&w=1600'
  },
  {
    id: 'salary-terms',
    tag: 'Official Credentials',
    badge: 'Corporate Verification',
    title: '1-Year Corporate Work Certificate & Visa Support',
    subtitle: 'Formal Experience Letter for German Embassy & Blue Card Files',
    desc: 'After completing your internship and pilot phase, ILA Global provides a 100% verified 1-Year Corporate Experience Letter, project portfolio proof, and full visa backing.',
    targetSection: 'salary-terms',
    statNumber: '1-Year',
    statLabel: 'Verified Experience Proof',
    bgImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=85&w=1600'
  }
];

const jobCategories = [
  {
    category: "Office Admin & Accounts",
    icon: BarChart3,
    roles: ["AI-Assisted Accounting", "Billing & Auditing", "Office Administration"],
    color: "bg-blue-50 text-blue-700"
  },
  {
    category: "Software, SEO & Social AI",
    icon: Code,
    roles: ["AI-Powered Web Dev", "High-Level SEO & Growth", "Digital Client Campaigns"],
    color: "bg-indigo-50 text-indigo-700"
  },
  {
    category: "Import, Export & Trade",
    icon: Globe2,
    roles: ["European Sourcing", "Import-Export Papers", "Logistics Operations"],
    color: "bg-emerald-50 text-emerald-700"
  },
  {
    category: "Engineering & Technical Services",
    icon: SunMedium,
    roles: ["Solar Systems & Installation", "EV & Auto Diagnostics", "HVAC & Industrial Kits"],
    color: "bg-amber-50 text-amber-700"
  }
];

const consultantTracks = [
  {
    id: 'it-automation',
    icon: Cpu,
    title: 'Software, SEO & AI Social Media',
    badge: 'IT & Growth Tech',
    stipend: '₹15,000 - ₹30,000 / mo',
    desc: 'Work on live software architectures, AI-assisted development, high-level SEO, and social media client acquisition funnels.',
    deliverables: [
      'Building web applications using modern AI coding frameworks',
      'Advanced SEO & targeted multi-channel digital lead campaigns',
      'Deploying automated client management and database systems'
    ]
  },
  {
    id: 'engineering-services',
    icon: SunMedium,
    title: 'Solar & Technical Service Business',
    badge: 'Toolkit Business Model',
    stipend: '₹12,000 - ₹28,000 / mo',
    desc: 'Master hands-on technical solutions (Solar, EV, Diagnostics). We provide toolkits and supply chains to run local service pilots before Germany setup.',
    deliverables: [
      'Executing on-ground solar/technical installation pilot projects',
      'Customer acquisition & local business service establishment',
      'Validating commercial viability for German sponsor visas'
    ]
  },
  {
    id: 'global-trade',
    icon: Globe2,
    title: 'International Trade & Cross-Border Sourcing',
    badge: 'Commerce & Logistics',
    stipend: '₹10,000 - ₹25,000 / mo',
    desc: 'Research cross-border products, connect European suppliers, manage customs documentation, and coordinate supply chains.',
    deliverables: [
      'International supplier price benchmarking and verification',
      'Preparing export-import compliance and transport files',
      'B2B client onboarding for European distribution'
    ]
  }
];

const globalExpatPerks = [
  { icon: Home, title: "Finding Rooms & WG Flats", desc: "Help incoming Indian students in Germany find apartments/WG flatshares and earn verified local finder fees." },
  { icon: Users, title: "Airport Pickup & Welcome", desc: "Receive fresh students at German airports, guide transit, and assist in smooth local orientation." },
  { icon: ShieldCheck, title: "City Office Paperwork (Anmeldung)", desc: "Guide newcomers with German city hall registration, bank account openings, and health insurance." },
  { icon: Briefcase, title: "Part-Time Job Connections", desc: "Connect fresh students with legal 20 hrs/week student mini-jobs and earn direct referral bonuses." }
];

const ecosystemPerks = [
  { icon: Award, title: "1-Year Experience Certificate", highlight: "Verified Letter", desc: "formal corporate proof for German job & visa files.", link: "/applications?tab=Work While You Study" },
  { icon: GraduationCap, title: "Course Fee Discounts", highlight: "Up to 50% Off", desc: "on Goethe German (A1-B2) and IELTS courses.", link: "/applications?tab=Education" },
  { icon: ShieldCheck, title: "100% Visa & Job Support", highlight: "Germany Pathways", desc: "direct assistance for Opportunity Card and Work Visas.", link: "/jobs" },
  { icon: Gift, title: "Lifetime Referral Rewards", highlight: "Continuous Bonus", desc: "earn rewards for project completions & candidate referrals.", link: "/rewards" }
];

export default function WorkWhileYouStudyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('how-to-join');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTrackId, setSelectedTrackId] = useState('it-automation');

  // Quick Application dropdown states for top boxes
  const [studentSubTrack, setStudentSubTrack] = useState('German Language + Admin Pilot');
  const [jobSeekerSubTrack, setJobSeekerSubTrack] = useState('IT & AI Automation');
  const [indiaTrack, setIndiaTrack] = useState('IT & AI Software Pilot');
  const [abroadServiceTrack, setAbroadServiceTrack] = useState('Airport Pickup & Reception');
  const [germanPathwayTrack, setGermanPathwayTrack] = useState('Language (A1-B2) + Technical Skill Training');
  const [rewardRole, setRewardRole] = useState('Junior Consultant');
  const [rewardCategory, setRewardCategory] = useState('All Categories (Max Commissions)');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % brochureSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleHash = () => {
      const hash = location.hash || window.location.hash;
      if (hash.includes('#')) {
        const parts = hash.split('#').filter(Boolean);
        const rawTarget = parts[parts.length - 1];
        if (rawTarget && rawTarget !== 'work-while-you-study-page' && rawTarget !== 'work-while-you-study') {
          const aliasMap: Record<string, string> = {
            'overview': 'how-to-join',
            'growth': 'german-pathway',
            'roles': 'job-roles',
            'apply': 'salary-terms',
            'mini-jobs': 'part-time-and-mini-jobs',
            'part-time-and-mini-jobs': 'part-time-and-mini-jobs',
            'cost-of-living': 'student-cost-of-living',
            'student-cost-of-living': 'student-cost-of-living',
          };
          const targetId = aliasMap[rawTarget] || rawTarget;
          setTimeout(() => {
            scrollTo(targetId);
          }, 150);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [location.hash]);

  const navigateTo = (url: string) => { 
    if (url.startsWith('#applications') || url.startsWith('#apply')) {
      const q = url.includes('?') ? url.substring(url.indexOf('?')) : '';
      navigate(`/applications${q}`);
    } else if (url === '#ilas-companion') {
      navigate('/ilas-with-you');
    } else if (url.startsWith('#')) {
      const clean = url.replace('#', '');
      navigate(`/${clean}`);
    } else {
      navigate(url);
    }
  };

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const selectedTrack = consultantTracks.find(t => t.id === selectedTrackId) || consultantTracks[0];
  const SelectedTrackIcon = selectedTrack.icon;
  const currentStory = brochureSlides[currentSlide];

  return (
    <div className="pt-20 bg-slate-100 min-h-screen">
      
      {/* ================= 1. COMPACT SUB-NAVIGATION ================= */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 mb-6 shadow-xs transition-all duration-300">
        <div className="container-max mx-auto px-4 flex justify-center items-center gap-3 sm:gap-6 flex-wrap">
          {[
            { id: 'how-to-join', label: 'How to Join' },
            { id: 'freshers-pathway', label: 'Freshers Career' },
            { id: 'german-pathway', label: 'German Pathway' },
            { id: 'job-roles', label: 'Job Categories' },
            { id: 'paid-tracks', label: 'Work Tracks & Toolkits' },
            { id: 'earn-in-germany', label: 'Earn in Germany' },
            { id: 'part-time-and-mini-jobs', label: 'Part Time & Mini Jobs' },
            { id: 'student-cost-of-living', label: 'Cost of Living' },
            { id: 'salary-terms', label: 'Stipends & Certification' }
          ].map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollTo(tab.id)}
                className={`text-xs sm:text-sm font-bold pb-1 transition-all cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'text-brand-600 border-b-2 border-brand-600' 
                    : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 space-y-16 pb-20">
        
        {/* ================= 2. CORE CONCEPT MESSAGING BANNER ================= */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider">
              Core Concept & Global Mission
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              "Do not waste your time just studying; gather international experience and earn while you learn."
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Gain verified corporate project credentials, earn monthly stipends, and build direct pathways to European and Indian industry placements.
            </p>
          </div>
          <button
            onClick={() => navigateTo('#applications?tab=Work While You Study')}
            className="shrink-0 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Apply Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ================= 3. TOP SPLIT INTAKE: FOUR CORE PROGRAM BLOCKS (LEFT) + HIGH-VISIBILITY BROCHURE (RIGHT) ================= */}
        <section id="how-to-join" className="scroll-mt-28">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="grid lg:grid-cols-12 gap-6 items-stretch">
              
              {/* LEFT 6-COLUMN: 4 CORE PROGRAM BLOCKS WITH DIRECT ACTION */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-4 order-2 lg:order-1">
                
                {/* Block 1: Work While You Learn in India */}
                <div className="bg-slate-50 rounded-3xl p-4 sm:p-5 border-2 border-emerald-500/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Domestic Track</span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">Work While You Learn in India</h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        ₹10k–₹30k/mo
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-2.5 font-medium">
                      Live corporate and tech projects in India. Build verified work experience with zero career gap right after degree or diploma.
                    </p>

                    <div className="mb-2.5">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Choose India Work Program:</label>
                      <select 
                        value={indiaTrack}
                        onChange={(e) => setIndiaTrack(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="IT & AI Software Pilot">IT & AI Software Pilot</option>
                        <option value="Solar & Technical Service Business">Solar & Technical Service Business</option>
                        <option value="Office Admin, Billing & Accounts">Office Admin, Billing & Accounts</option>
                        <option value="Import-Export Logistics & Trade">Import-Export Logistics & Trade</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo(`#applications?tab=Work While You Study (India: ${encodeURIComponent(indiaTrack)})`)} 
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Apply India Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Block 2: Part time While You Study Abroad (End-to-End Student Services) */}
                <div className="bg-slate-50 rounded-3xl p-4 sm:p-5 border-2 border-blue-500/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Abroad Services</span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">Part time While You Study Abroad</h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        €50–€250/task
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-2 font-medium">
                      End-to-End Student Services: comprehensive support including airport reception, room bookings, local bank/Anmeldung, and job placement assistance.
                    </p>

                    {/* End to End Service Badges */}
                    <div className="grid grid-cols-2 gap-1 mb-2.5 text-[10px] text-slate-700 font-bold">
                      <span className="bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1">🛬 Airport pickup / reception</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1">🏠 Room & WG arrangements</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1">📑 Bank, Anmeldung & docs</span>
                      <span className="bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1">💼 Part-time job placement</span>
                    </div>

                    <div className="mb-2.5">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Select Overseas Service Focus:</label>
                      <select 
                        value={abroadServiceTrack}
                        onChange={(e) => setAbroadServiceTrack(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                      >
                        <option value="Airport Pickup & Reception">Airport Pickup & Reception</option>
                        <option value="Room & WG Flatshare Arrangements">Room & WG Flatshare Arrangements</option>
                        <option value="Documentation, Bank & Local Setup">Documentation, Bank & Local Setup</option>
                        <option value="Job Placement Assistance & Part-Time Roles">Job Placement Assistance & Part-Time Roles</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo(`#applications?tab=Work While You Study (Abroad: ${encodeURIComponent(abroadServiceTrack)})`)} 
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Join Student Services & Earn Abroad</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Block 3: German Project Onboarding Pathway */}
                <div className="bg-slate-50 rounded-3xl p-4 sm:p-5 border-2 border-indigo-500/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded">Germany Relocation</span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">German Project Onboarding Pathway</h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                        100% Sponsor
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-2.5 font-medium">
                      Focuses on intensive German language + admin and technical skill training. Win client orders with company toolkits to qualify for direct German sponsorship.
                    </p>

                    <div className="mb-2.5">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Choose Onboarding Pathway:</label>
                      <select 
                        value={germanPathwayTrack}
                        onChange={(e) => setGermanPathwayTrack(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Language (A1-B2) + Technical Skill Training">Language (A1-B2) + Technical Skill Training</option>
                        <option value="Solar & EV Diagnostics Business Pilot">Solar & EV Diagnostics Business Pilot</option>
                        <option value="Healthcare German & Clinical Admin Pilot">Healthcare German & Clinical Admin Pilot</option>
                        <option value="Software & AI Automated Lead Architecture">Software & AI Automated Lead Architecture</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo(`#applications?tab=Work While You Study (German Pathway: ${encodeURIComponent(germanPathwayTrack)})`)} 
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Apply German Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Block 4: Rewards Plans Block (Junior Consultant Role & Promotion Category) */}
                <div className="bg-slate-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-500/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                          <Crown className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase text-amber-900 bg-amber-100 px-2 py-0.5 rounded">Commissions & Certification</span>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">Rewards Plans & Junior Consultant</h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                        1,000 pts/mo
                      </span>
                    </div>

                    <p className="text-slate-600 text-xs leading-relaxed mb-2.5 font-medium">
                      Select your consultant role and the verticals you wish to promote. Earn cash commissions and official Marketing Consultant work certification.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2 mb-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Select Role:</label>
                        <select 
                          value={rewardRole}
                          onChange={(e) => setRewardRole(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-600"
                        >
                          <option value="Junior Consultant">Junior Consultant</option>
                          <option value="Campus Brand Ambassador">Campus Brand Ambassador</option>
                          <option value="Freelance Educational Consultant">Freelance Educational Consultant</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Category to Promote:</label>
                        <select 
                          value={rewardCategory}
                          onChange={(e) => setRewardCategory(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-600"
                        >
                          <option value="All Categories (Max Commissions)">All Categories (Max Commissions)</option>
                          <option value="Study Abroad">Study Abroad</option>
                          <option value="Work While Study">Work While Study</option>
                          <option value="All Courses">All Courses</option>
                          <option value="Visa & Services">Visa & Services</option>
                          <option value="Job & Career Services">Job & Career Services</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo(`#applications?tab=Rewards (${encodeURIComponent(rewardRole)} - ${encodeURIComponent(rewardCategory)})`)} 
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Register as {rewardRole}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

              {/* RIGHT 6-COLUMN: DOUBLE-WIDE PROMO ALBUM RUNNING ALL CONTENT HIGHLIGHTS */}
              <div className="lg:col-span-6 relative min-h-[520px] lg:min-h-[580px] rounded-3xl overflow-hidden text-white shadow-2xl flex flex-col justify-between p-6 sm:p-10 border border-slate-800 bg-slate-950 group order-1 lg:order-2">
                
                {/* Background Image with High Visibility */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out transform scale-105 group-hover:scale-100" 
                  style={{ backgroundImage: `url(${currentStory.bgImage})` }}
                />
                
                {/* High Contrast Darkness Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/35 z-10" />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/70 to-transparent z-10" />

                {/* Top Badge & Slide Indicators */}
                <div className="relative z-20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                      {currentStory.badge}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/25">
                      {currentStory.tag}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-300 bg-slate-950/70 px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
                    Story 0{currentSlide + 1} / 0{brochureSlides.length}
                  </span>
                </div>

                {/* Main Story Content */}
                <div className="relative z-20 my-auto py-4 max-w-2xl">
                  <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2 tracking-tight drop-shadow-md">
                    {currentStory.title}
                  </h3>
                  <h4 className="text-sm sm:text-base font-bold text-amber-300 mb-3 leading-snug">
                    {currentStory.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mb-6">
                    {currentStory.desc}
                  </p>

                  {/* Feature Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => scrollTo(currentStory.targetSection)}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl cursor-pointer transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>Explore Section Details ↓</span>
                    </button>
                    <div className="inline-flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20">
                      <span className="text-base font-black text-amber-300">{currentStory.statNumber}</span>
                      <span className="text-[10px] font-bold text-slate-200 border-l border-white/20 pl-2.5">{currentStory.statLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="relative z-20 pt-4 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {brochureSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === currentSlide ? "w-8 bg-amber-400" : "w-2.5 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + brochureSlides.length) % brochureSlides.length)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
                      aria-label="Previous Story"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % brochureSlides.length)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
                      aria-label="Next Story"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= 3. FRESHERS CAREER SPRINGBOARD ================= */}
        <section id="freshers-pathway" className="scroll-mt-28">
          <div className="bg-slate-900 p-8 sm:p-12 rounded-3xl text-white shadow-2xl border border-amber-500/30">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-white/10 px-3.5 py-1 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5 mb-4">
                  <Flame className="w-4 h-4 text-amber-400" /> Immediate Post-Education Placement
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mb-4">
                  Freshers: Step Straight Into a Corporate Job — Zero Career Gaps
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Do not waste months searching for entry-level vacancies. Join our active corporate projects right after completing your degree or diploma. Earn a verified <strong>1-Year Corporate Experience Certificate</strong> that holds lifetime value for top MNCs and German Embassy visa files.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm font-semibold text-amber-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> ₹10,000 – ₹30,000 monthly stipend from Month 1
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Lifetime-valid corporate project portfolio
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 bg-white/10 p-6 rounded-2xl border border-white/15 backdrop-blur-md text-center">
                <span className="text-xs font-bold text-slate-300 uppercase">Intake Status</span>
                <h3 className="text-2xl font-black text-white mt-1 mb-2">Open for All Batches</h3>
                <p className="text-xs text-slate-300 mb-6">Engineers, Arts, Commerce, IT & Technical Diploma freshers eligible.</p>
                <button 
                  onClick={() => navigateTo('#applications?tab=Work While You Study (Freshers)')} 
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all shadow-lg cursor-pointer"
                >
                  Apply as a Fresher →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. GERMAN PROJECT PATHWAY ================= */}
        <section id="german-pathway" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
              International Transition
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">The German Project Pathway</h2>
            <p className="text-slate-600 text-sm sm:text-base">How testing your service pilot locally unlocks direct German business sponsorships.</p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 font-black text-lg">01</div>
                <h4 className="font-black text-slate-900 text-base mb-2">Common 6-Month Foundation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whatever your trade (Solar, EV, Diagnostics, Web Tech), everyone learns administration, local market study, and client order generation.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 font-black text-lg">02</div>
                <h4 className="font-black text-slate-900 text-base mb-2">Local Pilot & Order Delivery</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Using our supplied toolkits and supply chain, you acquire local clients, deliver service orders, and prove commercial viability.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-50/50 border border-brand-200">
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center mb-4 font-black text-lg">03</div>
                <h4 className="font-black text-slate-900 text-base mb-2">German Project Sponsorship</h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Candidates who successfully validate their service pilot are selected for direct transition to our German registered business projects with visa sponsorship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 5. AVAILABLE JOB & WORK CATEGORIES ================= */}
        <section id="job-roles" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
              Department Openings
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Available Job & Work Categories</h2>
            <p className="text-slate-600 text-sm sm:text-base">We have work opportunities across 4 major departments. Select your suitable area.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobCategories.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-3xl hover:border-brand-500 hover:shadow-lg transition-all flex flex-col justify-between group">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${domain.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-3">{domain.category}</h3>
                    <ul className="space-y-2 mb-6">
                      {domain.roles.map((role, r) => (
                        <li key={r} className="flex items-start gap-2 text-xs text-slate-600 font-semibold">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => navigateTo(`#applications?tab=Role - ${domain.category}`)}
                    className="w-full py-2 bg-slate-50 hover:bg-brand-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Apply this Role →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 6. PAID WORK TRACKS & DETAILS ================= */}
        <section id="paid-tracks" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3.5 py-1 rounded-full border border-brand-200">
              Open to Any Degree / Trade
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Paid Junior Consultant Work Tracks</h2>
            <p className="text-slate-600 text-sm sm:text-base">Click on any track to see what practical work you will do and the monthly stipend you receive.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {consultantTracks.map((track) => {
              const TrackIcon = track.icon;
              const isSelected = selectedTrackId === track.id;
              return (
                <div 
                  key={track.id} 
                  onClick={() => setSelectedTrackId(track.id)}
                  className={`rounded-3xl p-6 border transition-all flex flex-col justify-between cursor-pointer group shadow-xs ${
                    isSelected 
                      ? 'border-2 border-brand-600 bg-brand-50/20 shadow-md ring-2 ring-brand-500/20' 
                      : 'bg-white border-slate-200 hover:border-brand-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                        isSelected ? 'bg-brand-600 text-white border-brand-600' : 'bg-brand-50 text-brand-600 border-brand-100'
                      }`}>
                        <TrackIcon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        {track.stipend}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">{track.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{track.desc}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 mt-6 pt-3 border-t border-slate-100">
                    <span>{isSelected ? '✓ Viewing Details' : track.badge}</span>
                    <span className="text-brand-600">See Work Details ↓</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                  <SelectedTrackIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{selectedTrack.badge}</span>
                  <h3 className="text-2xl font-black text-slate-900">{selectedTrack.title}</h3>
                </div>
              </div>
              <button 
                onClick={() => navigateTo(`#applications?tab=Consultant - ${selectedTrack.title}`)} 
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer shadow-md transition-all flex items-center gap-1.5"
              >
                Apply for this Work Track <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600" /> What Tasks You Will Perform:
              </h4>
              <div className="grid sm:grid-cols-3 gap-3">
                {selectedTrack.deliverables.map((d, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-black text-brand-600 block mb-0.5">TASK 0{i + 1}</span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= 7. PART-TIME EARNING IN GERMANY & ABROAD ================= */}
        <section id="earn-in-germany" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Earn Even After Flying
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Part-Time Earning in Germany & Abroad</h2>
            <p className="text-slate-600 text-sm sm:text-base">When you reach Germany for studies or job search, earn good extra income by helping arriving Indian students.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {globalExpatPerks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-emerald-500 transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                  <div className="text-[11px] font-bold text-emerald-600 mt-4 pt-2 border-t border-slate-100">
                    <span>Paid On-Ground Role</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 8. PART-TIME & MINI JOBS ================= */}
        <section id="part-time-and-mini-jobs" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
              German Student Work Regulations (140 Full / 280 Half Days)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Part Time and Mini Jobs in Germany</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Work legally up to 20 hours/week during semester periods and 40 hours/week in semester breaks. Earn €538/mo tax-free or €14–€25/hr in corporate student contracts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-500 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">Career Track</span>
                  <span className="text-xs font-black text-emerald-600">€15 – €25/hr</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">Werkstudent (Working Student)</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Direct employment in German tech firms, engineering hubs, or consultancies. Gain high-value resume credits while studying.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                Max 20 hrs/week • Full Pension Credits
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-emerald-500 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 group-hover:scale-105 transition-transform">
                  <Euro className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">100% Tax Free</span>
                  <span className="text-xs font-black text-emerald-600">€538/month</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">Mini-Job (538-Euro Basis)</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  German legal standard for tax-free student side income. Work roughly 10 hrs/week in retail, logistics, cafes, or libraries.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                Zero Income Tax • Zero Social Deductions
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Campus Job</span>
                  <span className="text-xs font-black text-emerald-600">€13 – €17/hr</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">HiWi (Research Assistant)</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Assist professors in university laboratories, lecture preparation, or library administration. Exceptional academic network.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                Exempt from 140-day limitation
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-500 transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100 group-hover:scale-105 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Semester Breaks</span>
                  <span className="text-xs font-black text-emerald-600">€2,000–€3,200/mo</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 mb-2">Full-Time Vacation Jobs</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Work up to 40 hours per week legally during official semester breaks. Save living expenses for the entire upcoming semester.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-500">
                Full 40 hrs/week • Uncapped Earning
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">ILA Global Career Support</span>
              <h3 className="text-xl font-black">Need verified assistance securing a part-time job or Werkstudent contract?</h3>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl">
                We format your German CV (Lebenslauf), prepare motivation letters, and connect you to vetted regional employers across Germany.
              </p>
            </div>
            <button
              onClick={() => navigateTo('#applications?tab=Work While You Study')}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl cursor-pointer shadow-md shrink-0 transition-all"
            >
              Get German Job Placement Support →
            </button>
          </div>
        </section>

        {/* ================= 9. STUDENT COST OF LIVING IN GERMANY ================= */}
        <section id="student-cost-of-living" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Realistic Budget & Blocked Account Breakdown (€992/Mo Benchmark)
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Student Cost of Living in Germany</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Germany offers tuition-free public university education. Here is the realistic monthly cost breakdown required to live comfortably as an international student.
            </p>
          </div>

          {/* Monthly Budget Breakdown Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">€320 - €550</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Accommodation (Rent)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Student dorms (Studentenwohnheim) or shared flat (WG Zimmer) including heating & electricity (Warmmiete).
                </p>
              </div>
              <span className="text-[10px] font-bold text-blue-600 mt-4 block">Largest Expense (~45%)</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">~€125</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Health Insurance</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Statutory German student health insurance (TK, Barmer, AOK). Covers all doctor visits, hospital & prescriptions.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 mt-4 block">Mandatory for Visa</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">€180 - €220</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Food & Groceries</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monthly cooking groceries from discount markets (Aldi, Lidl, Rewe) plus subsidized university Mensa meals.
                </p>
              </div>
              <span className="text-[10px] font-bold text-amber-600 mt-4 block">Mensa meals: €2.50–€4</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">€35 - €50</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Semester Transit Ticket</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Deutschlandsemesterticket included in university fee. Unlimited local buses, trams, U-Bahn, S-Bahn & regional trains nationwide.
                </p>
              </div>
              <span className="text-[10px] font-bold text-purple-600 mt-4 block">Free Transit Nationwide</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <Coins className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-black text-slate-900">€50 - €80</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Mobile, Wi-Fi & Misc</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Unlimited 5G mobile plan, Rundfunkbeitrag TV license (split among flatmates), personal toiletries & recreation.
                </p>
              </div>
              <span className="text-[10px] font-bold text-rose-600 mt-4 block">Total: ~€750 – €950/mo</span>
            </div>
          </div>

          {/* City Tier Comparison & Blocked Account Comparison */}
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-black text-slate-900">City-Wise Cost Comparison in Germany</h3>
                  <span className="text-xs font-bold text-brand-600">3 Tiers</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded">Tier 1 • High Cost</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">Munich, Frankfurt, Hamburg, Stuttgart</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Higher rent (€500-€750/mo), but immense concentration of multinational corporate jobs.</p>
                    </div>
                    <span className="text-sm sm:text-base font-black text-slate-900 shrink-0 ml-4">€950 – €1,200/mo</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Tier 2 • Moderate Cost</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">Berlin, Cologne, Düsseldorf, Nuremberg</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Balanced lifestyle with vibrant startup ecosystems, cultural life & student discounts.</p>
                    </div>
                    <span className="text-sm sm:text-base font-black text-slate-900 shrink-0 ml-4">€800 – €950/mo</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Tier 3 • Most Affordable</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">Leipzig, Dresden, Aachen, Chemnitz, Ilmenau</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Top-tier TU9 universities with low rents (€280-€400/mo), ideal for smart budgeting.</p>
                    </div>
                    <span className="text-sm sm:text-base font-black text-emerald-700 shrink-0 ml-4">€650 – €800/mo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Financial Safety Net</span>
                <h3 className="text-xl font-black mt-1 mb-2">The Blocked Account (Sperrkonto)</h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  German embassies mandate a Blocked Account of approx. €11,904/year (€992/month). Every month, €992 is deposited directly into your German checking account.
                </p>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Monthly Payout from Account:</span>
                    <span className="font-bold text-amber-400">€992 / month</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <span className="text-slate-300">Actual Average Expenses:</span>
                    <span className="font-bold text-emerald-400">€750 – €880 / month</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                    <span className="text-emerald-300 font-semibold">+ Mini-Job (10h/wk):</span>
                    <span className="font-bold text-emerald-400">+ €538 / month</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                  💡 <strong>Net Result:</strong> With a simple 10 hr/week mini-job, students cover 100% of their living expenses, leaving their blocked account money intact!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  onClick={() => navigateTo('#applications?tab=Study Abroad')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  Start German University & Visa Application →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 10. GUARANTEED BENEFITS & 1-YEAR EXPERIENCE CERTIFICATE ================= */}
        <section id="salary-terms" className="scroll-mt-28 border-t border-slate-200 pt-14">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Guaranteed Benefits */}
            <div className="lg:col-span-6 bg-slate-900 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black mb-6 border-b border-slate-800 pb-3">Guaranteed Candidate Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {ecosystemPerks.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div 
                        key={b.title} 
                        onClick={() => navigateTo(b.link)} 
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-amber-400 flex items-center justify-center shrink-0 border border-white/10">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white group-hover:text-amber-300">{b.title}</h4>
                          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                            <span className="text-amber-400 font-bold">{b.highlight}</span> {b.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <button 
                  onClick={() => navigateTo('#applications?tab=Work While You Study')} 
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm cursor-pointer shadow-md"
                >
                  Apply for Intake Interview →
                </button>
              </div>
            </div>

            {/* Right: 1-Year Certificate Proof */}
            <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Official Certificate</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-2">1-Year Corporate Work Certificate</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                  After completing your internship and pilot phase, ILA Global provides a 100% verified 1-Year Corporate Experience Letter, project portfolio proof, and full visa backing.
                </p>

                <div className="space-y-3 mb-6 text-xs sm:text-sm text-slate-700 font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Official Experience Letter with verified live project audits</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Transition to full corporate salary packages or Germany sponsorship</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct visa reference support for German Opportunity Card & Blue Card</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => navigateTo('#applications?tab=Work While You Study')} 
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer flex items-center justify-center gap-1.5"
              >
                Register for Interview <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>

        {/* ================= 9. ROYAL ILAS COMPANION SHOWCASE ================= */}
        <section className="bg-slate-950 p-8 sm:p-10 rounded-3xl text-white border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-amber-400 font-black uppercase text-xs mb-2 flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-400" /> Royal Lifetime Mentorship
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-100">Ilas With You Consultant AI</h3>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              24/7 AI Career Mentor: Market task analysis, automated case study assistance, and corporate communication help.
            </p>
          </div>
          <button 
            onClick={() => navigateTo('#ilas-companion')} 
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm whitespace-nowrap cursor-pointer"
          >
            Access Ilas Companion Now →
          </button>
        </section>

      </div>
    </div>
  );
}