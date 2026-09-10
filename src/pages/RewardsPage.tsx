import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Users, 
  Globe, 
  Smartphone, 
  ShieldCheck, 
  Star, 
  Zap, 
  Award,
  ArrowRight, 
  TrendingUp, 
  MapPin, 
  HeartHandshake, 
  Crown,
  Gift,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plane,
  Home,
  FileCheck,
  Compass,
  PlusCircle
} from 'lucide-react';

const ecosystemReferralCatalog = [
  {
    vertical: "Academy & Language",
    icon: GraduationCap,
    rewardRate: "₹2,500 – ₹5,000 / admission",
    terms: "Paid upon fee settlement & initial course enrollment",
    desc: "Refer peers for Goethe German (A1-B2) or IELTS/OET coaching batches.",
    tag: "Education",
    color: "bg-blue-50 text-blue-800 border-blue-300 hover:border-blue-500",
    iconBg: "bg-blue-600 text-white"
  },
  {
    vertical: "Work While You Study Track",
    icon: Zap,
    rewardRate: "₹5,000 + 500 Reward Points",
    terms: "Paid upon 6-month pilot milestone confirmation",
    desc: "Connect freshers & graduates to our paid Junior Consultant incubation programs.",
    tag: "Incubation",
    color: "bg-amber-50 text-amber-900 border-amber-300 hover:border-amber-500",
    iconBg: "bg-amber-500 text-slate-950"
  },
  {
    vertical: "Global Visa & Migration",
    icon: Globe,
    rewardRate: "₹7,500 – ₹15,000 / successful file",
    terms: "Paid upon visa file submission & embassy clearance",
    desc: "Introduce candidates aiming for Student, Opportunity Card, Healthcare (18a/b), or Au Pair Visas.",
    tag: "Mobility",
    color: "bg-indigo-50 text-indigo-900 border-indigo-300 hover:border-indigo-500",
    iconBg: "bg-indigo-600 text-white"
  },
  {
    vertical: "European Direct Placement",
    icon: Briefcase,
    rewardRate: "100% Free Placement Unlock",
    terms: "Unlocked upon referring 3 verified candidates",
    desc: "Refer active candidates to claim a complete €0 fee waiver on your own European Job Placement package.",
    tag: "Free Placement",
    color: "bg-emerald-50 text-emerald-900 border-emerald-300 hover:border-emerald-500",
    iconBg: "bg-emerald-600 text-white"
  }
];

const onGroundAbroadServices = [
  {
    title: "Room & WG Flat Scouting",
    earning: "€100 – €250 / verified room",
    icon: Home,
    desc: "Inspect apartments, verify local landlords, and coordinate flatshares for arriving international students."
  },
  {
    title: "Airport Welcome & Transit",
    earning: "€50 – €100 / arrival group",
    icon: Plane,
    desc: "Receive fresh scholars at international airports and guide train transit to their designated university campus."
  },
  {
    title: "City Paperwork (Anmeldung)",
    earning: "€50 – €100 / completed dossier",
    icon: FileCheck,
    desc: "Assist incoming students with city municipal registration (Anmeldung), local bank accounts, and health insurance."
  },
  {
    title: "Mini-Job & Employer Connections",
    earning: "€50 – €250 / job connection",
    icon: Briefcase,
    desc: "Connect new arrivals with verified part-time student mini-jobs across supermarkets, retail, and logistics hubs."
  }
];

const consultantTiers = [
  {
    level: "Junior Consultant",
    tag: "Entry Level",
    criteria: "0 – 10 Referrals",
    perks: [
      "Official Verified Consultant Digital ID",
      "Instant Wallet Cashback per Referral Milestone",
      "Access to Ilas With You Companion AI",
      "Special 20% Discount on Goethe German Courses"
    ],
    highlight: false
  },
  {
    level: "Senior Executive Consultant",
    tag: "Community Leader",
    criteria: "11 – 50 Referrals",
    perks: [
      "Priority 2x Points Multiplier on all Services",
      "100% Free €0 European Placement Package",
      "Exclusive Annual Apple iPad / Tech Toolkit Gift",
      "Direct Channel to European Recruiter Network"
    ],
    highlight: true
  },
  {
    level: "Global Venture Partner",
    tag: "Top Tier Performer",
    criteria: "50+ Active Network Referrals",
    perks: [
      "All-Expense Paid 7-Day Germany & Swiss Tour Package",
      "Permanent Salaried European Project Sponsorship",
      "Revenue Profit Sharing on Managed Batches",
      "Lifetime Royal Ilas With You Executive AI Access"
    ],
    highlight: false
  }
];

export default function RewardsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ecosystem-catalog');

  const navigateTo = (url: string) => {
    if (url.startsWith('#applications') || url.startsWith('#apply')) {
      const q = url.includes('?') ? url.substring(url.indexOf('?')) : '';
      navigate(`/applications${q}`);
    } else if (url === '#learn-while-earn') {
      navigate('/work-while-you-study');
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

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      
      {/* 1. Magazine Cover Hero Banner */}
      <section className="relative bg-slate-950 text-white py-12 sm:py-16 px-6 rounded-b-[2.5rem] shadow-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] opacity-15 bg-cover bg-center mix-blend-overlay" />
        <div className="container-max mx-auto relative z-10 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-black uppercase tracking-widest mb-3 border border-amber-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Word-of-Mouth Promo Magazine & Wealth Club
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight">
            The ILA Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">Reward & Income Club</span>
          </h1>
          <p className="text-slate-200 text-xs sm:text-base mb-6 max-w-3xl mx-auto leading-relaxed">
            Build your community, earn continuous referral cashback, unlock <strong>€0 Free Placement Packages</strong>, and pick up verified on-ground Euro student support tasks worldwide.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => navigateTo('#applications?tab=Reward Club - Join as Consultant')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <Crown className="w-4 h-4" /> Join as Consultant & Get ID <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollTo('abroad-services')} 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-emerald-400" /> Post Availability & Earn Tasks
            </button>
          </div>
        </div>
      </section>

      {/* 2. Text-Only Clean Sub-Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-2.5 mb-8 transition-all duration-300">
        <div className="container-max mx-auto px-4 flex justify-center items-center gap-4 sm:gap-8 flex-wrap">
          {[
            { id: 'ecosystem-catalog', label: '1. Referral Catalog' },
            { id: 'blueprint-story', label: '2. Wealth Blueprint' },
            { id: 'abroad-services', label: '3. Earn Abroad Support' },
            { id: 'tiers-tours', label: '4. Consultant Tiers & Tours' },
            { id: 'ilas-consultant', label: '5. Ilas With You Companion' }
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

      {/* 3. Main Magazine Content Area */}
      <div className="container-max mx-auto px-6 space-y-16 pb-20">
        
        {/* ================= JUNIOR CONSULTANT DIGITAL ID CARD & POINT SYSTEM ================= */}
        <section id="junior-consultant-card" className="scroll-mt-28">
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl border border-slate-800">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Digital ID Card Preview */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 mb-4">
                  Official Consultant Credential
                </span>

                {/* Digital Card */}
                <div className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-850 to-brand-950 p-6 rounded-3xl border-2 border-amber-400/40 shadow-2xl relative overflow-hidden space-y-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Top Bar */}
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-sm">
                        ILA
                      </div>
                      <div>
                        <span className="text-[10px] font-black tracking-widest text-slate-300 block">ILA ACADEMY GLOBAL</span>
                        <span className="text-[8px] text-amber-300 font-bold uppercase">Consultant Credential</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                      ACTIVE VERIFIED
                    </span>
                  </div>

                  {/* Member Details */}
                  <div className="flex items-center gap-3.5 py-1">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 border-2 border-amber-400/50 flex items-center justify-center text-amber-300 font-black text-lg shadow-inner">
                      JC
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">Aditya Sharma</h4>
                      <span className="text-xs font-bold text-amber-300 block">Junior Consultant</span>
                      <span className="text-[10px] font-mono text-slate-400">ID: ILA-JC-2026-8842</span>
                    </div>
                  </div>

                  {/* Privileges & Points */}
                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Active Points</span>
                      <span className="text-sm font-black text-amber-300">680 PTS</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase block">Monthly Tier</span>
                      <span className="text-sm font-black text-emerald-400">68% to ₹15k Cash</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-white/10">
                    <span>Authorized Marketing Executive</span>
                    <span className="font-mono">VALID: 2026-2027</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => alert('Digital ID Card & Starter Kit downloaded to your device!')}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all cursor-pointer shadow-md"
                  >
                    Download Digital ID & Kit 🪪
                  </button>
                </div>
              </div>

              {/* Right Column: Points System & Work Experience Value */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                    Tier & Point System
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1 text-white">
                    Junior Consultant Point System & Work Certification
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-medium">
                    Every candidate enrolled in any ILA vertical receives dual-provisioning in our Rewards Program. Turn recommendations into verified points, cash rewards, and formal work experience.
                  </p>
                </div>

                {/* Milestones Breakdown */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-base font-black text-amber-300">10 Points</div>
                    <div className="font-bold text-white text-xs">Per Generated Inquiry</div>
                    <p className="text-[10px] text-slate-400">Awarded immediately when your lead submits their first intake enquiry.</p>
                  </div>

                  <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-base font-black text-emerald-400">50 Points</div>
                    <div className="font-bold text-white text-xs">Per Successful Enrollment</div>
                    <p className="text-[10px] text-slate-400">Credited when your referral converts into an enrolled candidate.</p>
                  </div>

                  <div className="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-base font-black text-amber-400">1,000 Points / Mo</div>
                    <div className="font-bold text-white text-xs">Cash Reward & Letter</div>
                    <p className="text-[10px] text-slate-400">Unlocks financial cash commission + official Marketing Executive experience letter.</p>
                  </div>
                </div>

                {/* Progress toward 1,000 pts target */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">Current Monthly Progress (Threshold: 1,000 PTS)</span>
                    <span className="text-amber-400 font-mono">680 / 1,000 PTS</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500" style={{ width: '68%' }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>320 points needed to unlock next cash commission cycle</span>
                    <span className="text-emerald-400 font-bold">Payout: ₹15,000 / €200</span>
                  </div>
                </div>

                {/* Career Progression & Certificate */}
                <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h4 className="text-xs font-black text-amber-300">Official Work Experience Letter & Career Progression</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Participants who consistently meet monthly targets receive verified tenure letters recognizing them as Marketing Executives with ILA Academy. Outstanding performers transition to permanent or part-time freelance consultant roles.
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Work Experience Letter Certificate generated! Verified with ILA Corporate Registry.')}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap shadow-sm"
                  >
                    View Experience Letter Preview 📜
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= 1. REWARDS CATALOG ACROSS ALL SERVICES ================= */}
        <section id="ecosystem-catalog" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-brand-700 uppercase bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              Cross-Ecosystem Referral Income
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Refer Across Every ILA Vertical</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Recommend friends and candidates to any ILA Academy vertical and collect verified rewards in your wallet.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ecosystemReferralCatalog.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`p-6 rounded-3xl border-2 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group ${item.color}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform ${item.iconBg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 mb-1">
                      {item.vertical}
                    </h3>

                    <div className="text-xs font-black text-slate-950 bg-white/90 px-3 py-1 rounded-lg border border-slate-200 inline-block mb-2 shadow-xs">
                      {item.rewardRate}
                    </div>

                    <p className="text-[11px] font-bold text-slate-700 mb-3 italic">
                      ✓ {item.terms}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                      {item.desc}
                    </p>
                  </div>

                  <button 
                    onClick={() => navigateTo(`#applications?tab=Reward Club - Refer for ${encodeURIComponent(item.vertical)}`)}
                    className="w-full py-2.5 bg-slate-950 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    Refer a Candidate <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 2. EDITORIAL WEALTH BLUEPRINT (PLACED BELOW CATALOG) ================= */}
        <section id="blueprint-story" className="scroll-mt-28 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border-2 border-amber-400/30">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-amber-400/20 inline-flex items-center gap-1.5 mb-2.5">
                <Star className="w-3.5 h-3.5 text-amber-400" /> The Word-of-Mouth Wealth Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-2 text-white">
                Turn Every Referral into Long-Term Global Income & European Relocation
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-4">
                From referring school peers to language batches to earning on-ground Euro fees by arranging rooms and airport pickups in all countries (Germany, London, America, wherever you are).
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-black">
                <Gift className="w-4 h-4 text-amber-400" /> Earn Unlimited ₹ & € / Month + Tier Tour Gifts
              </div>
            </div>
            
            <div className="lg:col-span-4 bg-white/5 border border-white/10 p-5 rounded-2xl text-center backdrop-blur-md">
              <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
              <h3 className="text-lg font-black text-white mb-1">Join & Achieve Passive Income Plans</h3>
              <p className="text-xs text-slate-300 mb-4">Transform your personal connections into a sustainable international career and sponsored business pathway.</p>
              <button 
                onClick={() => navigateTo('#applications?tab=Reward Club - Join as Consultant')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md"
              >
                Register as Consultant →
              </button>
            </div>
          </div>
        </section>

        {/* ================= 3. EARN IN GERMANY SUPPORT & LIST AVAILABILITY ================= */}
        <section id="abroad-services" className="scroll-mt-28 border-t border-slate-200 pt-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Euro & Dollar On-Ground Earning
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Pick Tasks in Germany & Abroad for Instant Income</h2>
            <p className="text-slate-600 text-xs sm:text-sm">When you or your contacts are abroad, register available rooms, jobs, and local guidance on our portal to get assigned candidates, boost your reward points, and claim direct payouts.</p>
          </div>

          {/* List Availability Action Box */}
          <div className="bg-emerald-950 text-white p-6 rounded-3xl border-2 border-emerald-500/50 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Have a Room, Student Job, or Local Service Available?</h3>
                <p className="text-xs text-slate-300">Listing vacancies on our portal automatically matches you with arriving candidates and upgrades your Reward Tier to the next level.</p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('#applications?tab=Reward Club - Register Availability')}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-md"
            >
              + Post Room / Job / Service
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {onGroundAbroadServices.map((task, idx) => {
              const TaskIcon = task.icon;
              return (
                <div key={idx} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-white shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                      <TaskIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30 inline-block mb-2">
                      {task.earning}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{task.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6 font-medium">
                      {task.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo('#applications?tab=Reward Club - Claim Abroad Tasks')}
                    className="w-full py-2 bg-white/10 hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-white/15"
                  >
                    Claim This Task Track →
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= 4. CONSULTANT TIERS & TOURS ================= */}
        <section id="tiers-tours" className="scroll-mt-28 border-t border-slate-200 pt-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-widest text-indigo-700 uppercase bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200">
              Career Elevation Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-2">Consultant Tiers, Gifts & European Tours</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Progress through performance milestones to unlock company-sponsored tours, gadget gifts, and equity sharing.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {consultantTiers.map((tier, idx) => (
              <div 
                key={idx}
                className={`p-8 sm:p-10 rounded-3xl border-2 flex flex-col justify-between relative shadow-lg hover:shadow-2xl transition-all ${
                  tier.highlight 
                    ? 'bg-slate-900 text-white border-amber-400 ring-4 ring-amber-400/30' 
                    : 'bg-white text-slate-900 border-slate-300'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                    Top Career Choice
                  </div>
                )}
                
                <div>
                  <div className="mb-6">
                    <span className={`text-xs font-black uppercase tracking-wider ${tier.highlight ? 'text-amber-400' : 'text-brand-600'}`}>
                      {tier.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black mt-1">{tier.level}</h3>
                    <div className="text-xs font-bold text-slate-400 mt-1">Requirement: {tier.criteria}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.perks.map((perk, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlight ? 'text-amber-400' : 'text-brand-600'}`} />
                        <span className={tier.highlight ? 'text-slate-200' : 'text-slate-700'}>
                          {perk}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigateTo(`#applications?tab=Reward Club - Tier: ${tier.level}`)}
                  className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                    tier.highlight 
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Join {tier.level} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5. ILAS WITH YOU CONSULTANT COMPANION ================= */}
        <section id="ilas-consultant" className="scroll-mt-28 border-t border-slate-200 pt-12">
          <div className="bg-slate-950 p-8 sm:p-12 rounded-3xl text-white border-2 border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div>
              <div className="text-amber-400 font-black uppercase text-xs mb-2 flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" /> Royal Lifetime Consultant Partner
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-100 mb-2">
                Ilas With You Consultant AI Suite
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                24/7 Personal Consulting Advisor: Auto-generate client pitch presentations, calculate referral rewards in real-time, simulate European visa eligibility, and track every student arrival dossier.
              </p>
            </div>
            <button 
              onClick={() => navigateTo('#ilas-companion')} 
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all shadow-lg shadow-amber-500/20"
            >
              Access Ilas Consultant Companion →
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}