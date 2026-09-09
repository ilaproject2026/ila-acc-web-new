import { Briefcase, Globe2, Cpu, Crown, Clock, ArrowRight } from 'lucide-react'

const pathways = [
  {
    icon: Briefcase,
    title: 'Work While You Learn in India',
    description: 'Corporate internships, IT development pilots, and commercial tasks in India with ₹10k–₹30k/mo stipend. Zero career gap.',
    highlights: ['Stipend ₹10k–₹30k/mo', 'Live corporate projects', '1-Year lifetime experience proof'],
    link: '#work-while-you-study-page#how-to-join'
  },
  {
    icon: Globe2,
    title: 'Part time While You Study Abroad',
    description: 'End-to-End Student Services: airport pickup, WG accommodation, documentation (Anmeldung/Expatrio), and part-time job placement.',
    highlights: ['Airport reception & transit', 'Guaranteed room finding', 'Legal 20 hrs/week student jobs'],
    link: '#work-while-you-study-page#earn-in-germany'
  },
  {
    icon: Cpu,
    title: 'German Project Onboarding Pathway',
    description: 'Intensive German language + technical/admin training with company toolkits provided. Win local client pilots and relocate to Germany.',
    highlights: ['Language + Tech skills', 'Company toolkits provided', 'Direct German employer sponsor'],
    link: '#work-while-you-study-page#german-pathway'
  },
  {
    icon: Crown,
    title: 'Rewards Plans & Junior Consultant',
    description: 'Select your role (Junior Consultant) and choose which vertical to promote to earn commissions, cash payouts, and official certification.',
    highlights: ['Earn 10–50 pts per referral', 'Monthly cash unlock (1,000 pts)', 'Official Marketing Consultant letter'],
    link: '#rewards'
  },
]

export default function WorkWhileYouStudySection() {
  return (
    <section id="earn-learn" className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Core Concept Banner */}
        <div className="mb-14 p-8 bg-gradient-to-r from-slate-900 via-brand-900 to-indigo-950 rounded-3xl text-white shadow-xl text-center max-w-4xl mx-auto border border-slate-800">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            ILA Global Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 mb-3 leading-tight">
            "Do not waste your time just studying; gather international experience and earn while you learn."
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Practical skills, international exposure, and verified earnings from day one through our 4 structured global pathways.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map(({ icon: Icon, title, description, highlights, link }) => (
            <div
              key={title}
              className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-700 text-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{description}</p>
                <ul className="space-y-1.5 mb-6">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800 transition-colors pt-2 border-t border-slate-100"
              >
                <span>Explore Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
