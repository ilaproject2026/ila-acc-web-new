import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ScrollHandler() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  // 1. Backward compatibility: Redirect legacy hash-based URLs
  useEffect(() => {
    const currentHash = window.location.hash;
    if (!currentHash) return;

    // Check if hash matches old root hash routing (e.g. /#education, /#applications?tab=Visa)
    if (pathname === '/' && currentHash.length > 1) {
      const raw = currentHash.substring(1); // remove first #

      // Handle query param on hash, e.g. "applications?tab=Visa"
      let pathPart = raw;
      let queryPart = '';
      if (raw.includes('?')) {
        const qIdx = raw.indexOf('?');
        pathPart = raw.substring(0, qIdx);
        queryPart = raw.substring(qIdx);
      }

      // Handle double hashes, e.g. "visa-page#student-visa"
      let anchorPart = '';
      if (pathPart.includes('#')) {
        const hIdx = pathPart.indexOf('#');
        anchorPart = pathPart.substring(hIdx);
        pathPart = pathPart.substring(0, hIdx);
      }

      let targetRoute: string | null = null;

      if (pathPart === 'home') {
        targetRoute = '/';
      } else if (pathPart === 'master-hub' || pathPart === 'department-hub' || pathPart === 'admin-portal' || pathPart === 'admin-dashboard' || pathPart === 'erp-portal') {
        targetRoute = '/admin';
      } else if (pathPart === 'education') {
        targetRoute = '/education';
      } else if (pathPart === 'german-language') {
        targetRoute = '/german-language';
      } else if (pathPart === 'course-german-language') {
        targetRoute = '/course/german-language';
      } else if (pathPart === 'course-ielts') {
        targetRoute = '/course/ielts';
      } else if (pathPart === 'course-software-engineering') {
        targetRoute = '/course/software-engineering';
      } else if (pathPart.startsWith('course-')) {
        targetRoute = `/course/${pathPart.replace('course-', '')}`;
      } else if (pathPart === 'course-page') {
        targetRoute = '/course';
      } else if (pathPart === 'student-dashboard') {
        targetRoute = '/student-dashboard';
      } else if (pathPart === 'jobs-page' || pathPart === 'jobs') {
        targetRoute = '/jobs';
      } else if (pathPart === 'visa-page' || pathPart === 'visa') {
        targetRoute = `/visa${anchorPart}`;
      } else if (pathPart === 'work-while-you-study-page' || pathPart === 'work-while-you-study') {
        targetRoute = `/work-while-you-study${anchorPart}`;
      } else if (pathPart === 'rewards' || pathPart === 'rewards-page') {
        targetRoute = `/rewards${anchorPart}`;
      } else if (pathPart === 'about' || pathPart === 'about-us') {
        targetRoute = '/about';
      } else if (pathPart === 'ilas-with-you' || pathPart === 'ilas-companion') {
        targetRoute = '/ilas-with-you';
      } else if (pathPart.startsWith('applications') || pathPart.startsWith('apply')) {
        targetRoute = `/applications${queryPart}`;
      } else if (pathPart === 'privacy-policy') {
        targetRoute = '/privacy-policy';
      } else if (pathPart === 'study-abroad') {
        targetRoute = `/study-abroad${anchorPart}`;
      } else if (pathPart.startsWith('tutor-path')) {
        targetRoute = '/tutor-path';
      }

      if (targetRoute) {
        navigate(targetRoute, { replace: true });
        return;
      }
    }
  }, [pathname, navigate]);

  // 2. Scroll handling: scroll to anchor if hash exists, else scroll to top
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, search, hash]);

  return null;
}
