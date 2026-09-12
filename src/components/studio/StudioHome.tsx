import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Lightbulb, 
  Compass, 
  Layers, 
  Send, 
  CheckCircle2, 
  Users, 
  Check, 
  Wrench, 
  GraduationCap 
} from 'lucide-react';
import { ApplicationSubmission } from '../../types';

interface StudioHomeProps {
  onNavigateTab: (tab: 'studio' | 'courses' | 'workers' | 'students' | 'admin') => void;
  onSubmitApplication: (app: Omit<ApplicationSubmission, 'id' | 'submittedAt' | 'status'>) => void;
}

export const StudioHome: React.FC<StudioHomeProps> = ({
  onNavigateTab,
  onSubmitApplication,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantConcept, setApplicantConcept] = useState('');
  const [applicantTrack, setApplicantTrack] = useState('Hardware Systems');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitApplication({
        name: applicantName,
        email: applicantEmail,
        concept: applicantConcept || 'Early physical prototype for studio review.',
        track: applicantTrack,
        notes: 'Submitted via studio portal fast-track form.',
      });
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantConcept('');
    }, 600);
  };

  return (
    <div className="space-y-12 pb-8">
      {/* HERO SECTION (Apple aesthetics with GenWorks brand) */}
      <section className="relative pt-4 sm:pt-8 pb-8 px-4 sm:px-8 rounded-3xl bg-[#0F1419] text-white overflow-hidden border border-white/10 shadow-xl">
        {/* Subtle architectural grid pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="32" id="hero-grid" patternUnits="userSpaceOnUse" width="32">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#324353" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect fill="url(#hero-grid)" height="100%" width="100%" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl space-y-5">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A232C] border border-[#324353] text-[#D4FF32] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4FF32] animate-ping" />
            <span>A home for student builders</span>
          </div>

          {/* Large Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#F7F9FB]">
            Curiosity <br />
            has a <span className="text-[#D4FF32] italic font-light">career.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#9AA8B6] leading-relaxed max-w-xl">
            GenWorks is a hands-on learning studio for people who want to turn their early ideas into useful, visible work.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#apply-portal"
              className="h-12 px-6 rounded-full bg-[#D4FF32] text-[#0E1318] font-bold text-sm inline-flex items-center gap-2 shadow-lg hover:bg-[#c3ec2b] active:scale-95 transition-all"
            >
              <span>Build with us</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigateTab('courses')}
              className="h-12 px-6 rounded-full bg-[#1A232C] hover:bg-[#25303c] text-white font-bold text-sm inline-flex items-center gap-2 border border-[#324353] active:scale-95 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-[#D4FF32]" />
              <span>Explore EdTech Courses</span>
            </button>

            <button
              onClick={() => onNavigateTab('workers')}
              className="h-12 px-5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs inline-flex items-center gap-1.5 backdrop-blur-md active:scale-95 transition-all"
            >
              <Wrench className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>Workplace Map & Mentors</span>
            </button>
          </div>

          {/* Student Stack Proof */}
          <div className="flex items-center gap-3 pt-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#FF7B5C] text-[#0E1318] flex items-center justify-center font-bold text-xs shadow-md">J</div>
              <div className="w-8 h-8 rounded-full bg-[#D4FF32] text-[#0E1318] flex items-center justify-center font-bold text-xs shadow-md">M</div>
              <div className="w-8 h-8 rounded-full bg-[#B599FF] text-[#0E1318] flex items-center justify-center font-bold text-xs shadow-md">A</div>
              <div className="w-8 h-8 rounded-full bg-white text-[#0E1318] flex items-center justify-center font-bold text-xs shadow-md">R</div>
            </div>
            <p className="text-xs text-[#9AA8B6]">
              Made for the next generation of creative problem-solvers.
            </p>
          </div>
        </div>

        {/* Tactical Interactive Hero Showcase Card */}
        <div className="relative z-10 mt-8 w-full bg-[#1A232C] rounded-2xl p-4 border border-[#324353] shadow-lg">
          <div className="w-full bg-[#1e2d7d] rounded-xl p-5 relative min-h-[220px] flex flex-col justify-between text-white overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-white/80 tracking-widest uppercase">PROJECT_024</span>
              <span className="px-2 py-0.5 rounded bg-[#D4FF32] text-[#0E1318] text-[10px] uppercase font-bold tracking-wider animate-pulse">
                LIVE IN LAB
              </span>
            </div>

            <div className="my-4 flex items-center justify-between">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <div className="w-8 h-8 rounded-full bg-white/40 animate-ping" />
              </div>

              <div className="bg-[#FF7B5C] text-[#0E1318] p-3 rounded-xl shadow-md rotate-2 hover:rotate-0 transition-transform">
                <span className="font-mono text-[10px] block font-bold">✣ FEATURED BUILD</span>
                <span className="text-xs block font-extrabold leading-tight mt-0.5">Closed-Loop Hydroponics</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2">
              <div className="bg-[#D4FF32] text-[#0E1318] p-3 rounded-xl shadow-md">
                <span className="text-[10px] tracking-wider uppercase block text-[#495763] font-bold">SKILL STATUS</span>
                <span className="text-base font-extrabold block -mt-1">rising to production</span>
              </div>
              <div className="text-right">
                <p className="font-mono text-[11px] text-white/90">From brief to breakthrough</p>
                <span className="text-[#D4FF32] text-sm">✦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER RIBBON */}
      <section className="w-full bg-[#D4FF32] py-2.5 overflow-hidden select-none rounded-2xl shadow-sm">
        <div className="flex whitespace-nowrap text-[#0E1318] font-mono text-xs tracking-widest uppercase font-bold items-center gap-6 animate-[marquee_15s_linear_infinite]">
          <span>MAKE IT REAL</span>
          <span>✦</span>
          <span>LEARN OUT LOUD</span>
          <span>✦</span>
          <span>AUTONOMOUS ROBOTICS</span>
          <span>✦</span>
          <span>5-AXIS CNC MACHINING</span>
          <span>✦</span>
          <span>SPATIAL VISIONOS</span>
          <span>✦</span>
          <span>CLEANTECH BATTERIES</span>
          <span>✦</span>
          <span>MAKE IT REAL</span>
          <span>✦</span>
          <span>LEARN OUT LOUD</span>
        </div>
      </section>

      {/* SECTION 01 — WHY WE EXIST */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#007AFF] uppercase">
          <span>01 — WHY WE EXIST</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
          Good ideas deserve more than a <span className="text-[#B599FF] underline decoration-[#B599FF]/40 underline-offset-4">notebook.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed max-w-3xl">
          The gap between knowing and doing can feel enormous. GenWorks makes it smaller: an honest space to explore real work, find your people, and gather the proof that you can make physical things happen.
        </p>

        <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <p className="text-xs sm:text-sm font-medium text-[#1C1C1E] dark:text-white">
            Transforming raw student hunches into tested, deployed software and hardware artifacts with 1-on-1 artisan mentors.
          </p>
        </div>
      </section>

      {/* SECTION 02 — INSIDE THE STUDIO (PATHS) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] block mb-1">
            02 — INSIDE THE STUDIO
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white">
            Pick a signal. Follow it.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8E93] mt-1">
            There isn’t one way to contribute. Start where your energy is, then grow into the work that needs you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 01: Discover */}
          <div 
            onClick={() => onNavigateTab('courses')}
            className="group cursor-pointer p-6 rounded-3xl bg-[#D4FF32] text-[#0E1318] shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase">
                <span>01 DISCOVER</span>
                <span className="text-lg">⌕</span>
              </div>
              <h3 className="text-xl font-extrabold mt-4 leading-tight">
                Research &amp;<br />Insight
              </h3>
              <p className="text-xs text-[#0E1318]/80 mt-2 font-medium">
                Spot the human and engineering problem before anyone starts prototyping.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold uppercase underline underline-offset-4">
              <span>Explore courses &amp; tracks ↗</span>
            </div>
          </div>

          {/* Card 02: Design */}
          <div 
            onClick={() => onNavigateTab('courses')}
            className="group cursor-pointer p-6 rounded-3xl bg-[#FF7B5C] text-[#0E1318] shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase">
                <span>02 DESIGN</span>
                <span className="text-lg">✳</span>
              </div>
              <h3 className="text-xl font-extrabold mt-4 leading-tight">
                Creative &amp;<br />Hardware Brand
              </h3>
              <p className="text-xs text-[#0E1318]/80 mt-2 font-medium">
                Give powerful ideas a tactile shape, functional casing, and a clear point of view.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold uppercase underline underline-offset-4">
              <span>Explore courses &amp; tracks ↗</span>
            </div>
          </div>

          {/* Card 03: Ship */}
          <div 
            onClick={() => onNavigateTab('workers')}
            className="group cursor-pointer p-6 rounded-3xl bg-[#B599FF] text-[#0E1318] shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase">
                <span>03 SHIP & FABRICATE</span>
                <span className="text-lg">⌁</span>
              </div>
              <h3 className="text-xl font-extrabold mt-4 leading-tight">
                Growth &amp;<br />Operations
              </h3>
              <p className="text-xs text-[#0E1318]/80 mt-2 font-medium">
                Fabricate real prototypes in distributed innovation labs with certified tool leads.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-bold uppercase underline underline-offset-4">
              <span>View workplace map ↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE PROCESS */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#34C759] block mb-1">
            03 — THE PROCESS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white">
            Small moves. Real momentum.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E8E93] mt-1">
            You do not need a finished portfolio to begin. Just arrive with curiosity and a willingness to build in the open.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { step: '01', title: 'Raise your hand', desc: 'Tell us what you care about and what you want to prototype.' },
            { step: '02', title: 'Find your crew', desc: 'Meet builders with complementary skills and shared craft focus.' },
            { step: '03', title: 'Make visible work', desc: 'Learn on live briefs, with workbench feedback from master artisans.' },
            { step: '04', title: 'Carry it forward', desc: 'Leave with tested artifacts, verified credentials, and studio momentum.' },
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.08]">
              <span className="text-sm font-mono font-bold text-[#007AFF]">{item.step}</span>
              <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white mt-1">{item.title}</h4>
              <p className="text-xs text-[#8E8E93] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04 — APPLICATION PORTAL (Directly integrated with Admin Desk) */}
      <section id="apply-portal" className="p-6 sm:p-8 rounded-3xl bg-[#0F1419] text-white border border-white/10 shadow-2xl space-y-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4FF32]">
            <span>GENWORKS / APPLICATION PORTAL</span>
            <span>✦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Start with a spark.
          </h2>
          <p className="text-xs sm:text-sm text-[#9AA8B6] mt-1">
            We like the rough sketch, the late-night schematic, the prototype you haven't quite figured out yet.
          </p>
        </div>

        {submittedSuccess ? (
          <div className="p-6 rounded-2xl bg-[#1A232C] border border-[#34C759]/40 text-center space-y-2 animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-[#34C759] mx-auto" />
            <h4 className="text-base font-bold text-white">Application Received!</h4>
            <p className="text-xs text-[#9AA8B6] max-w-md mx-auto">
              Your application has been logged into the Studio Admissions desk. You can check the Administrator portal or wait for email notification from our shop mentor.
            </p>
            <button
              onClick={() => setSubmittedSuccess(false)}
              className="mt-2 text-xs text-[#D4FF32] font-semibold underline"
            >
              Submit another application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="text-xs font-mono uppercase text-[#9AA8B6] block mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Ada Lovelace"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#171C21] border border-[#324353] text-sm text-white placeholder-[#637381] focus:outline-none focus:border-[#D4FF32]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9AA8B6] block mb-1">Your Email</label>
              <input
                type="email"
                required
                placeholder="ada@domain.edu"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#171C21] border border-[#324353] text-sm text-white placeholder-[#637381] focus:outline-none focus:border-[#D4FF32]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9AA8B6] block mb-1">Preferred Track</label>
              <select
                value={applicantTrack}
                onChange={(e) => setApplicantTrack(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#171C21] border border-[#324353] text-sm text-white focus:outline-none focus:border-[#D4FF32]"
              >
                <option value="Hardware Systems">Hardware Systems (Robotics & 5-Axis)</option>
                <option value="Research & Insight">Research & Insight</option>
                <option value="Creative & Brand">Creative & Brand</option>
                <option value="Growth & Operations">Growth & Operations</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-[#9AA8B6] block mb-1">What do you want to make?</label>
              <textarea
                required
                rows={3}
                placeholder="I have an early prototype for an autonomous hydroponics system with optical sensing..."
                value={applicantConcept}
                onChange={(e) => setApplicantConcept(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#171C21] border border-[#324353] text-sm text-white placeholder-[#637381] focus:outline-none focus:border-[#D4FF32] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#D4FF32] text-[#0E1318] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#c3ec2b] active:scale-95 transition-all shadow-lg"
            >
              <span>{isSubmitting ? 'Transmitting to Studio...' : 'Send application ↗'}</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
