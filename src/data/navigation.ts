export interface NavItem {
  label: string
  href?: string
  action?: string
  children?: { label: string; href: string; description?: string; action?: string }[]
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'All Courses',
    href: '/education',
    children: [
      { label: 'German Language A1-C2', href: '/course/german-language', description: 'A1–C2 certified courses' },
      { label: 'IELTS/TOEFL/PTE', href: '/course/ielts', description: 'Language proficiency training' },
      { label: 'Software Engineering', href: '/course/software-engineering', description: 'Tech & coding programs' },
      { label: 'Job-Related Programs', href: '/course/job-related-programs', description: 'Short-term certifications' },
    ],
  },
  {
    label: 'Work and Study',
    href: '/work-while-you-study',
    children: [
      { label: 'Freshers AI Training', href: '/work-while-you-study#overview', description: 'Overcome entry barriers with AI' },
      { label: 'German Project Pathway', href: '/work-while-you-study#growth', description: 'Onboarding to 1-year contracts' },
      { label: 'Domain Roles', href: '/work-while-you-study#roles', description: 'Operations, IT, Trade & Infra' },
      { label: 'Scholarship & Salary', href: '/work-while-you-study#apply', description: 'Fee subsidies & paid structure' },
      { label: 'Part Time and Mini Jobs', href: '/work-while-you-study#part-time-and-mini-jobs', description: '20 hrs/week student jobs & €538 minijobs' },
      { label: 'Student Cost of Living', href: '/work-while-you-study#student-cost-of-living', description: 'Monthly budget, rent & city-wise costs' },
    ],
  },
  {
    label: 'Study Abroad',
    href: '/study-abroad',
    children: [
      { label: 'German Public Universities', href: '/study-abroad#public', description: 'Admissions and requirements' },
      { label: 'German Private Universities', href: '/study-abroad#private', description: 'Explore top private institutions' },
      { label: 'Visa Support', href: '/study-abroad#visa', description: 'Guidance through the visa process' },
      { label: 'End-to-End Processing', href: '/study-abroad#processing', description: 'Backed by our expert team' },
    ],
  },
  {
    label: 'Visa and Services',
    href: '/visa',
    children: [
      { label: 'Student Visa', href: '/visa#student-visa', description: 'University Enrollment & Documentation' },
      { label: 'Job Seeker Visa', href: '/visa#job-seeker-visa', description: 'Professional Career Entry' },
      { label: 'Tourist Visa', href: '/visa#tourist-visa', description: 'Travel & Exploration' },
      { label: 'Business Visa', href: '/visa#business-visa', description: 'Corporate Travel & Relocation' },
      { label: 'Schengen Visa', href: '/visa#schengen-visa', description: 'Short-stay European travel' },
      { label: 'Opportunity Card', href: '/visa#opportunity-card', description: 'Chancenkarte for job seekers' },
      { label: 'All Documentation Process', href: '/visa#documentation', description: 'AI-driven document handling' },
    ],
  },
  {
    label: 'Jobs and Career',
    href: '/jobs',
    children: [
      { label: 'Premium Career Services', href: '/jobs', description: 'Strategic job support & applications' },
      { label: 'Doctor to Driver', href: '/jobs#doctor-to-driver', description: 'Blue-collar career pathways' },
      { label: 'AI Resume Match', href: '/jobs#ai-match', description: 'Smart job matching portal' },
    ],
  },
  {
    label: 'Rewards',
    href: '/rewards',
    children: [
      { label: 'Junior Consultant Network', href: '/rewards#ecosystem-catalog', description: 'Join and earn commissions & points' },
      { label: 'Digital ID Card & Kit', href: '/rewards#junior-consultant-card', description: 'Verified credential & starter kit' },
      { label: 'Referral Cashback Catalog', href: '/rewards#ecosystem-catalog', description: '10–50 pts & cash incentives' },
      { label: 'Work Experience Certification', href: '/rewards#tiers-tours', description: 'Official Marketing Consultant letter' },
    ],
  },
  { label: 'Apply Now 🎯', href: '/applications' },
]

export type PortalRole = 'student' | 'employee' | 'team' | 'employer'

export const portalRoles: { id: PortalRole; label: string; description: string }[] = [
  { id: 'student', label: 'Student', description: 'Access courses, progress & certificates' },
  { id: 'employee', label: 'Partner/Consultant', description: 'Manage assignments & referrals' },
  { id: 'team', label: 'Team / Staff', description: 'Access Admin ERP CMS Dashboard' },
  { id: 'employer', label: 'Enterprise', description: 'Hire, manage & track candidates' },
]
