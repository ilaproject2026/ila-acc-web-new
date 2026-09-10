import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('gdpr_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // In case localStorage is disabled or restricted
      setShowBanner(true);
    }
  }, []);

  const handleAccept = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      localStorage.setItem('gdpr_cookie_consent', 'accepted');
    } catch {
      // fallback
    }
    setShowBanner(false);
  };

  const handleDecline = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      localStorage.setItem('gdpr_cookie_consent', 'declined');
    } catch {
      // fallback
    }
    setShowBanner(false);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      localStorage.setItem('gdpr_cookie_consent', 'dismissed');
    } catch {
      // fallback
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-0 inset-x-0 z-[100] bg-slate-900/98 backdrop-blur-xl text-white border-t border-slate-800 shadow-2xl transition-all duration-300 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Icon & Text */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0 pr-2">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              We use cookies to personalize content, analyze website traffic, and ensure an optimal experience across all ILA Global programs and portals.{' '}
              <Link
                to="/privacy-policy"
                onClick={() => setShowBanner(false)}
                className="text-brand-400 hover:text-brand-300 underline font-semibold transition-colors inline-flex items-center gap-1"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all cursor-pointer text-center"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 sm:flex-initial px-5 py-2 text-xs sm:text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-md transition-all cursor-pointer text-center"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cookie banner"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;





