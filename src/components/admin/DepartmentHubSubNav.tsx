import React, { useState } from 'react';
import { 
  Bot, Calendar, CheckSquare, Plus, Send, 
  Building2, Globe2, Sparkles, Filter, CheckCircle2, 
  Clock, ShieldAlert, FileText, ArrowRight, UserCheck, 
  Users, RefreshCw, Trash2, ExternalLink
} from 'lucide-react';

export interface TieUpPartner {
  id: string;
  name: string;
  category: 'University' | 'Corporate Employer' | 'Hospital / Healthcare' | 'Vocational School (Ausbildung)';
  country: string;
  city: string;
  contactPerson: string;
  email: string;
  targetCriteria: string;
  commissionRatio: string;
  status: 'Target Identified' | 'Outreach Drafted' | 'Proposal Dispatched' | 'In Discussion' | 'MOU Signed' | 'Active Tie-up Partner';
  lastUpdated: string;
  draftProposal?: string;
  syncedDepartments: string[];
}

export interface DepartmentAgendaItem {
  id: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium';
  dueDate: string;
  assignedTo: string;
  isCompleted: boolean;
}

export interface DepartmentMeeting {
  id: string;
  title: string;
  agenda: string;
  attendees: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Follow-up Required';
}

interface DepartmentHubSubNavProps {
  departmentName: string;
  hodName?: string;
  hodTitle?: string;
  children?: React.ReactNode;
}

const SEED_TIEUPS: TieUpPartner[] = [
  {
    id: 'TU-101',
    name: 'Technical University of Munich (TUM) - International Liaison',
    category: 'University',
    country: 'Germany',
    city: 'Munich',
    contactPerson: 'Dr. Wolfgang Becker',
    email: 'admissions.global@tum.de',
    targetCriteria: 'B.Tech graduates with GPA > 3.2 & German B1 proficiency',
    commissionRatio: '€1,200 per direct master intake',
    status: 'Active Tie-up Partner',
    lastUpdated: '2026-08-20',
    draftProposal: 'Proposing direct talent pipeline of evaluated Indian STEM applicants with verified APS certificates.',
    syncedDepartments: ['Study Abroad', 'Education', 'HR']
  },
  {
    id: 'TU-102',
    name: 'Charité Universitätsmedizin Berlin - Nursing Intake',
    category: 'Hospital / Healthcare',
    country: 'Germany',
    city: 'Berlin',
    contactPerson: 'Karin Schneider (HR Global)',
    email: 'recruiting.care@charite.de',
    targetCriteria: 'B.Sc Nursing with B2 German & Defizitbescheid registration',
    commissionRatio: '€3,500 clinical onboarding placement',
    status: 'In Discussion',
    lastUpdated: '2026-08-24',
    draftProposal: 'Pre-screened 45 healthcare graduates undergoing clinical German B2 training with immediate relocation readiness.',
    syncedDepartments: ['Visa', 'Work While You Study', 'HR']
  },
  {
    id: 'TU-103',
    name: 'Siemens Energy - Automation & Solar Apprenticeship',
    category: 'Corporate Employer',
    country: 'Germany',
    city: 'Erlangen',
    contactPerson: 'Marcus Weber',
    email: 'dual.talent@siemens-energy.com',
    targetCriteria: 'Diploma/Degree in Electrical, Solar or Mechatronics',
    commissionRatio: '€2,000 corporate sponsorship allowance',
    status: 'Proposal Dispatched',
    lastUpdated: '2026-08-28',
    draftProposal: 'Dual-study & Ausbildung cohort placement matching Indian candidates trained on hands-on company toolkits.',
    syncedDepartments: ['Work While You Study', 'Jobs', 'Finance']
  }
];

export default function DepartmentHubSubNav({
  departmentName,
  hodName = 'Department Head (HOD)',
  hodTitle = 'Executive Lead',
  children
}: DepartmentHubSubNavProps) {
  const [activeSubTab, setActiveSubTab] = useState<'hod' | 'agenda' | 'meetings' | 'tieup_bot' | 'workspace'>('workspace');

  // Agenda State
  const [agendas, setAgendas] = useState<DepartmentAgendaItem[]>([
    { id: '1', title: `Execute Q3 operational goals & student sync for ${departmentName}`, priority: 'High', dueDate: '2026-09-15', assignedTo: hodName, isCompleted: false },
    { id: '2', title: `Review pending walk-in & online intake logs with Front Office`, priority: 'Critical', dueDate: '2026-09-10', assignedTo: 'Intake Coordinator', isCompleted: false },
    { id: '3', title: `Sync active tie-up list with HR and Accounts dashboards`, priority: 'Medium', dueDate: '2026-09-18', assignedTo: hodName, isCompleted: true }
  ]);
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaPriority, setNewAgendaPriority] = useState<'Critical' | 'High' | 'Medium'>('High');
  const [newAgendaDate, setNewAgendaDate] = useState('');

  // Meetings State
  const [meetings, setMeetings] = useState<DepartmentMeeting[]>([
    { id: 'm1', title: `${departmentName} HOD Strategy & Performance Sync`, agenda: 'Review student migration pipeline & corporate deliverables', attendees: `${hodName}, GM, Academic Counselors`, date: '2026-09-12', time: '11:00 AM', status: 'Scheduled' },
    { id: 'm2', title: 'Institutional Partner Outreach Review', agenda: 'Assess AI Tie-up Bot outreach drafts and proposal replies', attendees: `${hodName}, Marketing Lead, CEO Desk`, date: '2026-09-14', time: '03:30 PM', status: 'Scheduled' }
  ]);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingAgenda, setNewMeetingAgenda] = useState('');
  const [newMeetingAttendees, setNewMeetingAttendees] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState('');
  const [newMeetingTime, setNewMeetingTime] = useState('10:00 AM');

  // Tie-Up Bot State
  const [tieUps, setTieUps] = useState<TieUpPartner[]>(() => {
    try {
      const saved = localStorage.getItem(`ilas_tieups_${departmentName}`);
      return saved ? JSON.parse(saved) : SEED_TIEUPS;
    } catch {
      return SEED_TIEUPS;
    }
  });

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterCountry, setFilterCountry] = useState<string>('All');
  
  // AI Outreach Generator Form
  const [targetPartnerName, setTargetPartnerName] = useState('');
  const [targetCountry, setTargetCountry] = useState('Germany');
  const [targetCategory, setTargetCategory] = useState<TieUpPartner['category']>('University');
  const [targetEmail, setTargetEmail] = useState('');
  const [isDraftingAI, setIsDraftingAI] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');

  const saveTieUps = (list: TieUpPartner[]) => {
    setTieUps(list);
    try {
      localStorage.setItem(`ilas_tieups_${departmentName}`, JSON.stringify(list));
      // Cross-department dispatch
      window.dispatchEvent(new CustomEvent('ilas-tieups-updated', { detail: { department: departmentName, list } }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgendaTitle.trim()) return;
    const item: DepartmentAgendaItem = {
      id: Date.now().toString(),
      title: newAgendaTitle,
      priority: newAgendaPriority,
      dueDate: newAgendaDate || '2026-09-30',
      assignedTo: hodName,
      isCompleted: false
    };
    setAgendas([item, ...agendas]);
    setNewAgendaTitle('');
    setNewAgendaDate('');
  };

  const toggleAgenda = (id: string) => {
    setAgendas(agendas.map(a => a.id === id ? { ...a, isCompleted: !a.isCompleted } : a));
  };

  const handleScheduleMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle.trim()) return;
    const meet: DepartmentMeeting = {
      id: Date.now().toString(),
      title: newMeetingTitle,
      agenda: newMeetingAgenda || 'Strategic synchronization',
      attendees: newMeetingAttendees || `${hodName}, Team`,
      date: newMeetingDate || 'Upcoming',
      time: newMeetingTime,
      status: 'Scheduled'
    };
    setMeetings([meet, ...meetings]);
    setNewMeetingTitle('');
    setNewMeetingAgenda('');
    setNewMeetingAttendees('');
  };

  const handleGenerateOutreachDraft = () => {
    if (!targetPartnerName.trim()) {
      alert('Please enter the institution or employer name.');
      return;
    }
    setIsDraftingAI(true);
    setTimeout(() => {
      const draft = `Subject: Strategic Educational & Talent Recruitment Partnership Proposal — ILA Global & ${targetPartnerName}

Dear International Partnerships & Admissions Team at ${targetPartnerName},

I am writing on behalf of the Department of ${departmentName} at ILA Academy (International Learning Academy). We specialize in preparing high-caliber Indian candidates in Foreign Languages (German Goethe/Telc standard), Engineering, IT, and Healthcare.

We propose a formal institutional recruitment tie-up with ${targetPartnerName} to establish a streamlined, pre-evaluated admission and onboarding corridor:
1. Candidate Profiling: Candidates are pre-screened with verified APS credentials, B1/B2 German language certificates, and authenticated academic dossiers.
2. Direct Match: Our curriculum creator aligns Indian bachelor/diploma syllabi with your institutional criteria, ensuring zero adaptation gap.
3. Transparent Partnership: We offer automated tracking, batch coordination, and structured support with full settlement services.

We welcome a brief introductory conference call to discuss partnership accreditation and agreement signing.

Best regards,
${hodName} (${hodTitle})
Head of Department — ${departmentName}
ILA Global Academy | www.ilaglobal.edu`;

      setGeneratedDraft(draft);
      setIsDraftingAI(false);
    }, 900);
  };

  const handleSaveTieUpPartner = () => {
    if (!targetPartnerName.trim()) return;
    const newPartner: TieUpPartner = {
      id: 'TU-' + Math.floor(100 + Math.random() * 900),
      name: targetPartnerName,
      category: targetCategory,
      country: targetCountry,
      city: 'International Hub',
      contactPerson: 'Director of Partnerships',
      email: targetEmail || `liaison@${targetPartnerName.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`,
      targetCriteria: 'Pre-screened qualified Indian graduates with certified language/technical training',
      commissionRatio: 'Standard Institutional Partnership terms',
      status: 'Outreach Drafted',
      lastUpdated: new Date().toISOString().split('T')[0],
      draftProposal: generatedDraft,
      syncedDepartments: [departmentName, 'HR', 'Admin']
    };

    saveTieUps([newPartner, ...tieUps]);
    setTargetPartnerName('');
    setTargetEmail('');
    setGeneratedDraft('');
    alert(`Successfully saved ${newPartner.name} into Partner Library and synced across HR & Admin!`);
  };

  const updateTieUpStatus = (id: string, newStatus: TieUpPartner['status']) => {
    const updated = tieUps.map(t => t.id === id ? { ...t, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] } : t);
    saveTieUps(updated);
  };

  const filteredTieUps = tieUps.filter(t => {
    const matchCat = filterCategory === 'All' || t.category === filterCategory;
    const matchCountry = filterCountry === 'All' || t.country === filterCountry;
    return matchCat && matchCountry;
  });

  return (
    <div className="space-y-6">
      {/* 1. UNIFIED DEPARTMENT SUB-NAVIGATION BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('workspace')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'workspace' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{departmentName} Workspace</span>
          </button>

          <button
            onClick={() => setActiveSubTab('hod')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'hod' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>HOD Desk</span>
          </button>

          <button
            onClick={() => setActiveSubTab('agenda')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'agenda' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>AGENDA ({agendas.filter(a => !a.isCompleted).length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('meetings')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'meetings' 
                ? 'bg-brand-600 text-white shadow-xs' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>APPOINTMENTS AND MEETING</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tieup_bot')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'tieup_bot' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                : 'text-purple-700 bg-purple-50 hover:bg-purple-100'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>TIEUP BOT (Status & Tracker) 🤖</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span>Active HOD: <strong className="text-slate-900">{hodName}</strong></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* 2. SUBTAB: WORKSPACE (Default department view) */}
      {activeSubTab === 'workspace' && (
        <div className="space-y-6">
          {children}
        </div>
      )}

      {/* 3. SUBTAB: HOD DESK & OVERVIEW */}
      {activeSubTab === 'hod' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <span className="text-[10px] font-black uppercase bg-brand-100 text-brand-800 px-2.5 py-1 rounded">Executive Control</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{hodName} — {departmentName} HOD Desk</h2>
              <p className="text-xs text-slate-500 mt-0.5">Direct oversight of department agendas, appointments, staff outputs, and active tie-up partnerships.</p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-500 block">Department Authority</span>
              <span className="font-black text-emerald-600">Active & Synchronized</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Active Pipeline Leads</span>
              <div className="text-2xl font-black text-slate-900 mt-1">128</div>
              <span className="text-[10px] text-emerald-600 font-bold">↑ 14% vs last week</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Open HOD Agendas</span>
              <div className="text-2xl font-black text-brand-600 mt-1">{agendas.filter(a => !a.isCompleted).length} Pending</div>
              <span className="text-[10px] text-slate-500">Highest Priority: Critical</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold uppercase text-slate-500">Institutional Tie-Ups</span>
              <div className="text-2xl font-black text-purple-600 mt-1">{tieUps.length} Partners</div>
              <span className="text-[10px] text-purple-700 font-bold">Synced with HR & Accounts</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap justify-between items-center gap-3">
            <div>
              <h4 className="text-xs font-black text-slate-900">Automatic Department Synchronization</h4>
              <p className="text-[11px] text-slate-500">All intake events, exam results, and tie-up progress automatically sync across Front Office, HR, and CEO Command Centers.</p>
            </div>
            <button
              onClick={() => alert(`Department sync refreshed for ${departmentName}!`)}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sync All Dashboards
            </button>
          </div>
        </div>
      )}

      {/* 4. SUBTAB: AGENDA */}
      {activeSubTab === 'agenda' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">Priority Board</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{departmentName} HOD Agendas & Action Items</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{agendas.filter(a => !a.isCompleted).length} Active Tasks</span>
          </div>

          {/* New Agenda Form */}
          <form onSubmit={handleAddAgenda} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-brand-600" /> Create New HOD Agenda Item
            </h4>
            <div className="grid sm:grid-cols-4 gap-3">
              <input
                type="text"
                required
                placeholder="Agenda description / task name"
                value={newAgendaTitle}
                onChange={(e) => setNewAgendaTitle(e.target.value)}
                className="sm:col-span-2 p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
              <select
                value={newAgendaPriority}
                onChange={(e) => setNewAgendaPriority(e.target.value as any)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-semibold outline-none"
              >
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
              </select>
              <input
                type="date"
                value={newAgendaDate}
                onChange={(e) => setNewAgendaDate(e.target.value)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
            >
              + Add to HOD Agenda
            </button>
          </form>

          {/* Agenda List */}
          <div className="space-y-2">
            {agendas.map(agenda => (
              <div
                key={agenda.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                  agenda.isCompleted ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={agenda.isCompleted}
                    onChange={() => toggleAgenda(agenda.id)}
                    className="w-4 h-4 rounded text-brand-600 cursor-pointer"
                  />
                  <div>
                    <span className={`font-bold text-slate-900 block ${agenda.isCompleted ? 'line-through text-slate-500' : ''}`}>
                      {agenda.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Assigned to: <strong>{agenda.assignedTo}</strong> • Due: {agenda.dueDate}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${
                  agenda.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                  agenda.priority === 'High' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                  'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {agenda.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUBTAB: APPOINTMENTS AND MEETING */}
      {activeSubTab === 'meetings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded">Calendar & Follow-ups</span>
              <h2 className="text-xl font-black text-slate-900 mt-1">{departmentName} Appointments & Meetings</h2>
            </div>
            <span className="text-xs font-bold text-slate-500">{meetings.length} Scheduled</span>
          </div>

          {/* Schedule Form */}
          <form onSubmit={handleScheduleMeeting} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" /> Schedule Meeting or Delegation Sync
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Meeting subject (e.g., German University Tie-up Review)"
                value={newMeetingTitle}
                onChange={(e) => setNewMeetingTitle(e.target.value)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
              <input
                type="text"
                placeholder="Attendees (e.g. HOD, German Admissions Team)"
                value={newMeetingAttendees}
                onChange={(e) => setNewMeetingAttendees(e.target.value)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
              <input
                type="text"
                placeholder="Agenda details & expected outcome"
                value={newMeetingAgenda}
                onChange={(e) => setNewMeetingAgenda(e.target.value)}
                className="sm:col-span-2 p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
              <input
                type="date"
                value={newMeetingDate}
                onChange={(e) => setNewMeetingDate(e.target.value)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
              />
              <input
                type="text"
                value={newMeetingTime}
                onChange={(e) => setNewMeetingTime(e.target.value)}
                className="p-2.5 text-xs bg-white rounded-xl border border-slate-300 font-medium outline-none"
                placeholder="Time (e.g. 10:00 AM)"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
            >
              + Save Appointment Schedule
            </button>
          </form>

          {/* Meeting List */}
          <div className="grid sm:grid-cols-2 gap-3">
            {meetings.map(m => (
              <div key={m.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-slate-900 leading-snug">{m.title}</h4>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                    {m.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{m.agenda}</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500">
                  <span>👥 {m.attendees}</span>
                  <span className="font-bold text-slate-700">📅 {m.date} at {m.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SUBTAB: TIEUP BOT (Status & Tracker) */}
      {activeSubTab === 'tieup_bot' && (
        <div className="bg-white rounded-3xl border-2 border-purple-200 p-6 space-y-6 shadow-lg">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded">AI Engine Hub Link</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Live Tracker Active</span>
                </div>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">Tie-up Bot with Status & Live Tracker</h2>
              </div>
            </div>
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
              {tieUps.length} Institutional Partners
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            The Tie-up Bot uses the central AI Engine to systematically filter, identify, and establish communication with target universities and corporate recruiters globally. Automated outreach drafts propose recruitment partnerships matching Indian student profiles with institutional criteria. Successful partnerships are saved in our partner DB/library and reported across HR and Accounts.
          </p>

          {/* AI Outreach Draft Generator */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Automated University / Corporate Outreach Generator
              </h4>
              <span className="text-[10px] bg-white text-purple-800 font-bold px-2 py-0.5 rounded border border-purple-200">
                AI Powered Corridor
              </span>
            </div>

            <div className="grid sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Target Institution / Employer:</label>
                <input
                  type="text"
                  placeholder="e.g. RWTH Aachen University"
                  value={targetPartnerName}
                  onChange={(e) => setTargetPartnerName(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Country:</label>
                <select
                  value={targetCountry}
                  onChange={(e) => setTargetCountry(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-semibold outline-none"
                >
                  <option value="Germany">Germany 🇩🇪</option>
                  <option value="European Union">European Union 🇪🇺</option>
                  <option value="USA">USA 🇺🇸</option>
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="India">India 🇮🇳</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Category:</label>
                <select
                  value={targetCategory}
                  onChange={(e) => setTargetCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-semibold outline-none"
                >
                  <option value="University">Public / Private University</option>
                  <option value="Corporate Employer">Corporate Employer / Placement</option>
                  <option value="Hospital / Healthcare">Hospital / Healthcare</option>
                  <option value="Vocational School (Ausbildung)">Vocational School (Ausbildung)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Contact Email:</label>
                <input
                  type="email"
                  placeholder="partnerships@institution.de"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  className="w-full p-2.5 bg-white rounded-xl border border-slate-300 font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleGenerateOutreachDraft}
                disabled={isDraftingAI}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                {isDraftingAI ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{isDraftingAI ? 'Drafting Proposal with AI...' : 'Generate AI Outreach Proposal'}</span>
              </button>
            </div>

            {generatedDraft && (
              <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-3 animate-in fade-in">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-900">
                    Draft Proposal Preview (Candidate Privacy Protected)
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedDraft)}
                    className="text-[10px] text-purple-700 font-bold hover:underline"
                  >
                    Copy Proposal
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={generatedDraft}
                  onChange={(e) => setGeneratedDraft(e.target.value)}
                  className="w-full p-3 text-xs font-mono bg-slate-50 rounded-xl border border-slate-200 text-slate-800 outline-none leading-relaxed"
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveTieUpPartner}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Save to Partner DB & Dispatch Outreach</span>
                  </button>
                  <span className="text-[11px] text-slate-500">Automatically logs in HOD, HR & Accounts records.</span>
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Filter Partners:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="All">All Categories</option>
                <option value="University">Universities</option>
                <option value="Corporate Employer">Corporate Employers</option>
                <option value="Hospital / Healthcare">Healthcare / Hospitals</option>
              </select>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="All">All Countries</option>
                <option value="Germany">Germany</option>
                <option value="European Union">European Union</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
              </select>
            </div>
            <span className="text-xs text-slate-500 font-bold">{filteredTieUps.length} Results</span>
          </div>

          {/* Live Status & Tracker Cards */}
          <div className="space-y-3">
            {filteredTieUps.map(partner => (
              <div key={partner.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                        {partner.category}
                      </span>
                      <span className="text-xs font-black text-slate-900">{partner.name}</span>
                      <span className="text-[10px] text-slate-500">📍 {partner.city}, {partner.country}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Target Criteria: <strong className="text-slate-800">{partner.targetCriteria}</strong>
                    </div>
                  </div>

                  {/* Status Dropdown Tracker */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500">Stage:</span>
                    <select
                      value={partner.status}
                      onChange={(e) => updateTieUpStatus(partner.id, e.target.value as any)}
                      className={`text-xs font-black px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                        partner.status === 'Active Tie-up Partner' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                        partner.status === 'MOU Signed' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                        partner.status === 'In Discussion' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                        partner.status === 'Proposal Dispatched' ? 'bg-indigo-50 text-indigo-800 border-indigo-300' :
                        'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Target Identified">1. Target Identified</option>
                      <option value="Outreach Drafted">2. Outreach Drafted</option>
                      <option value="Proposal Dispatched">3. Proposal Dispatched</option>
                      <option value="In Discussion">4. In Discussion</option>
                      <option value="MOU Signed">5. MOU Signed</option>
                      <option value="Active Tie-up Partner">6. Active Tie-up Partner 🤝</option>
                    </select>
                  </div>
                </div>

                {partner.draftProposal && (
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-600 font-mono line-clamp-2">
                    {partner.draftProposal}
                  </div>
                )}

                <div className="flex flex-wrap justify-between items-center text-[10px] text-slate-500 pt-1 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span>Contact: <strong>{partner.contactPerson}</strong> ({partner.email})</span>
                    <span>• Commission: <strong className="text-emerald-700">{partner.commissionRatio}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Synced with: {partner.syncedDepartments.join(', ')}</span>
                    <span>• Updated: {partner.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
