import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import PortalLogin from './components/common/PortalLogin'
import LanguageTrainer from './components/common/LanguageTrainer'
import LiveConsultant from './components/common/LiveConsultant'
import UnifiedIntakeForms from './components/common/UnifiedIntakeForms'
import FloatingContact from './components/common/FloatingContact'
import CookieBanner from './components/common/CookieBanner'
import ScrollHandler from './components/common/ScrollHandler'

import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { logVisitorActivity } from './lib/db'

import HomePage from './pages/HomePage'
import GermanLanguagePage from './pages/GermanLanguagePage'
import StudentDashboard from './pages/StudentDashboard'
import AdminPortal from './pages/AdminPortal'
import CoursePage from './pages/CoursePage'
import JobsPage from './pages/JobsPage'
import VisaPage from './pages/VisaPage'
import WorkWhileYouStudyPage from './pages/WorkWhileYouStudyPage'
import RewardsPage from './pages/RewardsPage'
import AboutUsPage from './pages/AboutUsPage'
import IlasWithYouPage from './pages/IlasWithYouPage'
import StudyAbroadPage from './pages/StudyAbroadPage'
import EducationPage from './pages/EducationPage'
import ApplicationPoolPage from './pages/ApplicationPoolPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TutorPathPage from './pages/TutorPathPage'

function App() {
  const location = useLocation()

  // Track visitor engagement per route
  useEffect(() => {
    const startTime = Date.now()
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      if (timeSpent > 0) {
        logVisitorActivity(location.pathname, timeSpent)
      }
    }
  }, [location.pathname])

  const adminPaths = [
    '/admin',
    '/admin-portal',
    '/admin-dashboard',
    '/master-hub',
    '/department-hub',
    '/erp-portal',
  ]
  const isAdminPage = adminPaths.some(
    (p) => location.pathname === p || location.pathname.startsWith(p + '/')
  )

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col relative">
      <ScrollHandler />
      {!isAdminPage && <Navbar />}
      <main className="w-full flex-grow">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/education" element={<EducationPage />} />
          
          {/* Courses */}
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course/:courseIdOrSlug" element={<CoursePage />} />
          <Route path="/courses" element={<Navigate to="/education" replace />} />
          <Route path="/courses/:courseIdOrSlug" element={<CoursePage />} />
          <Route path="/german-language" element={<GermanLanguagePage />} />

          {/* Core Service Hubs */}
          <Route path="/study-abroad" element={<StudyAbroadPage />} />
          <Route path="/work-while-you-study" element={<WorkWhileYouStudyPage />} />
          <Route path="/work-while-you-study-page" element={<Navigate to="/work-while-you-study" replace />} />
          <Route path="/visa" element={<VisaPage />} />
          <Route path="/visa-page" element={<Navigate to="/visa" replace />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs-page" element={<Navigate to="/jobs" replace />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/rewards-page" element={<Navigate to="/rewards" replace />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/ilas-with-you" element={<IlasWithYouPage />} />
          <Route path="/ilas-companion" element={<Navigate to="/ilas-with-you" replace />} />

          {/* Applications & Admissions */}
          <Route path="/applications" element={<ApplicationPoolPage />} />
          <Route path="/apply" element={<Navigate to="/applications" replace />} />

          {/* Academic & Specialized Pathways */}
          <Route path="/tutor-path" element={<TutorPathPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />

          {/* Admin & Portals */}
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin-portal" element={<Navigate to="/admin" replace />} />
          <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/master-hub" element={<Navigate to="/admin" replace />} />
          <Route path="/department-hub" element={<Navigate to="/admin" replace />} />
          <Route path="/erp-portal" element={<Navigate to="/admin" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
      <PortalLogin />
      <UnifiedIntakeForms />
      {!isAdminPage && <LanguageTrainer />}
      {!isAdminPage && <LiveConsultant />}
      {!isAdminPage && <FloatingContact />}
      <CookieBanner />
    </div>
  )
}

export default App