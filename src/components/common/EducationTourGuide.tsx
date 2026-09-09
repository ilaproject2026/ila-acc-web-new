import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, ArrowRight, ArrowLeft, X, Compass, CheckCircle2, 
  HelpCircle, Eye, Play, BookOpen, Layers, Gift, Filter, 
  ChevronRight, BrainCircuit, ShieldCheck, Zap
} from 'lucide-react';

export interface TourStep {
  id: string;
  targetId: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  actionTip?: string;
  highlightButtons?: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'step-hero',
    targetId: 'edu-tour-hero',
    title: 'Course Page Header & Actions',
    subtitle: 'Header Overview & Primary Intake Buttons',
    description: 'Welcome to the All Courses page! From this header, you can immediately click "Enroll in a Course" to begin your intake application, or click "Browse Catalog Blocks" to jump directly down to the full course selection.',
    icon: Sparkles,
    badge: 'Step 1 • Header Actions',
    actionTip: 'Click "Enroll in a Course" for fast intake, or "Browse Catalog Blocks" to jump directly down to the catalog.',
    highlightButtons: ['Enroll in a Course', 'Browse Catalog Blocks']
  },
  {
    id: 'step-nav',
    targetId: 'edu-tour-nav',
    title: 'Quick Course Switcher',
    subtitle: 'Sticky Header Navigation Bar',
    description: 'Jump directly to key flagship courses (like German Language A1-C2, IELTS, and Tech tracks) or jump straight to the complete catalog without endless scrolling.',
    icon: Compass,
    badge: 'Step 2 • Navigation',
    actionTip: 'Click any item to jump immediately to that course block.'
  },
  {
    id: 'step-paths',
    targetId: 'edu-tour-paths',
    title: 'Adaptive Delivery Pathways',
    subtitle: 'Methods, Pacing & Interactive Demos',
    description: 'Every course offers tailored learning tracks (Standard, Intensive, or Intelli-Coach AI). You can preview simulated lessons before committing.',
    icon: Layers,
    badge: 'Step 3 • Learning Paths',
    actionTip: 'Click "Course Demo" to test our 24/7 AI tutor, or "Enroll" to initiate intake.',
    highlightButtons: ['Course Demo', 'Enroll', 'Details']
  },
  {
    id: 'step-benefits',
    targetId: 'edu-tour-benefits',
    title: 'Guaranteed Career & Financial Perks',
    subtitle: 'Integrated Student Benefits',
    description: 'All ILA courses connect directly to our career ecosystem: Work While You Study stipends (€1,000+), module completion cashback, European job placements, and €0 tuition German universities.',
    icon: Gift,
    badge: 'Step 4 • Career Ecosystem',
    actionTip: 'Click any benefit card to explore the full track details.'
  },
  {
    id: 'step-specs',
    targetId: 'edu-tour-specs',
    title: 'Course Specifications & Faculty',
    subtitle: 'Transparent Curriculum & Pricing',
    description: 'Review curriculum units, total course duration, transparent fee structures with certification vouchers, and verified academic instructors.',
    icon: BookOpen,
    badge: 'Step 5 • Specifications',
    actionTip: 'Click "Open Standalone Specs Page" for dedicated syllabus downloads.'
  },
  {
    id: 'step-companion',
    targetId: 'edu-tour-companion',
    title: '24/7 Companion AI & Mentorship',
    subtitle: 'Intelli-Coach German Tutor',
    description: 'Access 24/7 intelligent tutoring assistance, mock German oral simulation evaluations, and real-time career counseling whenever you are studying.',
    icon: BrainCircuit,
    badge: 'Step 6 • AI Assistance',
    actionTip: 'Click "Access Companion Now" to start chatting with your AI language coach.'
  },
  {
    id: 'step-catalog',
    targetId: 'edu-tour-catalog',
    title: 'Smart Catalog & Taxonomy Filters',
    subtitle: 'Search, Filter & View Layouts',
    description: 'Looking for a specialized certification? Filter courses by Category, Sub-Category, or type any topic into the live Search bar. Toggle between Grid View and compact Line View.',
    icon: Filter,
    badge: 'Step 7 • Catalog & Views',
    actionTip: 'Try typing a keyword or switching to "Line View" for a compact summary list.'
  }
];

const STORAGE_KEY = 'ila_education_tour_completed_v2';

export default function EducationTourGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if first-time visitor on Education page
  useEffect(() => {
    const hasSeenTour = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenTour) {
      // Gentle delay so visitor sees the page first
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  // Keyboard navigation listener (ArrowRight, ArrowLeft, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseTour();
      } else if (e.key === 'ArrowRight') {
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        handlePrevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  // Position and highlight target element
  const updateTargetHighlight = (stepIdx: number) => {
    const step = TOUR_STEPS[stepIdx];
    if (!step) return;

    const el = document.getElementById(step.targetId);
    if (el) {
      if (step.id === 'step-hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Smooth scroll target into center view
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Calculate bounding rect after scroll starts
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      }, 350);
    } else {
      setTargetRect(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateTargetHighlight(currentStepIndex);
    }
  }, [isOpen, currentStepIndex]);

  // Handle window resize or scroll during tour
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => {
      const step = TOUR_STEPS[currentStepIndex];
      if (step) {
        const el = document.getElementById(step.targetId);
        if (el) setTargetRect(el.getBoundingClientRect());
      }
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, { passive: true });
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, [isOpen, currentStepIndex]);

  const startTour = () => {
    setShowWelcomeModal(false);
    setShowCompletionModal(false);
    setCurrentStepIndex(0);
    setIsOpen(true);
  };

  const handleCloseTour = () => {
    setIsOpen(false);
    setTargetRect(null);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleNextStep = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsOpen(false);
      setTargetRect(null);
      localStorage.setItem(STORAGE_KEY, 'true');
      setShowCompletionModal(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const currentStep = TOUR_STEPS[currentStepIndex];
  const progressPercent = ((currentStepIndex + 1) / TOUR_STEPS.length) * 100;
  const StepIcon = currentStep?.icon || Compass;

  return (
    <>
      {/* 1. PERSISTENT FLOATING TRIGGER PILL (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={startTour}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-black shadow-2xl border border-white/20 backdrop-blur-xl transition-all hover:scale-105 hover:shadow-brand-500/25 cursor-pointer"
          title="Start Page Feature Guide & Tour"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
          </span>
          <Compass className="w-4 h-4 text-brand-400 group-hover:rotate-45 transition-transform duration-300" />
          <span>Page Tour Guide</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-brand-300 font-bold border border-white/10 hidden sm:inline-block">
            7 Steps
          </span>
        </button>
      </div>

      {/* 2. WELCOME MODAL FOR FIRST-TIME VISITORS */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-lg w-full border border-slate-200 shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-600 via-indigo-600 to-amber-500" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center shadow-inner shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse text-brand-600" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                    Welcome to Education Hub
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    Discover Course Features
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => { setShowWelcomeModal(false); localStorage.setItem(STORAGE_KEY, 'true'); }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              New here? Take a quick <strong>60-second interactive tour</strong> to learn how to navigate the header actions, preview AI language lessons, explore delivery tracks, and filter certifications.
            </p>

            <div className="grid grid-cols-2 gap-3 py-1 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="font-bold text-slate-700">Header &amp; Intake Actions</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span className="font-bold text-slate-700">Course Quick Switcher</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Play className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-bold text-slate-700">1-Click AI Course Demos</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <Gift className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="font-bold text-slate-700">Student Stipends &amp; Rewards</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={startTour}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-sm transition-all shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Start Guided Tour</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => { setShowWelcomeModal(false); localStorage.setItem(STORAGE_KEY, 'true'); }}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                I'll Explore on My Own
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. INTERACTIVE SPOTLIGHT TOUR OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none transition-all duration-300">
          
          {/* Highlight Spotlight Ring around Target Element */}
          {targetRect && (
            <div
              className="absolute rounded-3xl border-4 border-brand-500 shadow-[0_0_0_9999px_rgba(2,6,23,0.7)] pointer-events-none transition-all duration-500 ease-out animate-pulse"
              style={{
                top: Math.max(0, targetRect.top - 10),
                left: Math.max(0, targetRect.left - 10),
                width: targetRect.width + 20,
                height: targetRect.height + 20,
              }}
            />
          )}

          {/* Floating Interactive Guide Card (Pointer events enabled on card) */}
          <div className="fixed inset-x-0 bottom-6 sm:bottom-8 z-50 flex justify-center px-4 pointer-events-auto">
            <div 
              ref={tooltipRef}
              className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 max-w-xl w-full border-2 border-brand-500/80 shadow-2xl backdrop-blur-2xl animate-fade-in space-y-4"
            >
              
              {/* Progress & Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-black uppercase tracking-wider border border-brand-400/30">
                      {currentStep.badge}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">
                      {currentStepIndex + 1} of {TOUR_STEPS.length}
                    </span>
                  </div>

                  <button
                    onClick={handleCloseTour}
                    className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Exit Tour (Escape)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Smooth Progress Bar */}
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-500 to-indigo-400 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/20 border border-brand-400/30 text-brand-400 flex items-center justify-center shrink-0 mt-1 shadow-inner">
                  <StepIcon className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <h4 className="text-lg font-black text-white leading-tight">
                    {currentStep.title}
                  </h4>
                  <p className="text-xs font-semibold text-brand-300">
                    {currentStep.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {currentStep.description}
                  </p>
                </div>
              </div>

              {/* Action Tip */}
              {currentStep.actionTip && (
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] text-amber-300 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Tip:</strong> {currentStep.actionTip}</span>
                </div>
              )}

              {/* Highlighted Button Tags if any */}
              {currentStep.highlightButtons && (
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="text-slate-400 font-bold">Key Buttons:</span>
                  {currentStep.highlightButtons.map(btn => (
                    <span key={btn} className="px-2 py-0.5 rounded-md bg-white/10 text-white font-black border border-white/20">
                      {btn}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <button
                  onClick={handleCloseTour}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer underline"
                >
                  Skip Tour
                </button>

                <div className="flex items-center gap-2">
                  {currentStepIndex > 0 && (
                    <button
                      onClick={handlePrevStep}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs transition-all shadow-md shadow-brand-600/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. COMPLETION CELEBRATION MODAL */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-7 sm:p-9 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Tour Completed
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                You're Ready to Explore!
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                You now know how to preview courses, access AI tutoring, and check certifications. You can restart this tour anytime using the floating <strong>Page Tour Guide</strong> button at the bottom-left.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowCompletionModal(false)}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-all shadow-md cursor-pointer"
              >
                Got It, Let's Learn! →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
