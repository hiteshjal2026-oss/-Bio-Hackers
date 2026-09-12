import React, { useState } from 'react';
import { Course, UserEnrollment } from '../../types';
import { 
  GraduationCap, 
  Sparkles, 
  Clock, 
  Calendar, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  Check, 
  Zap, 
  Compass, 
  ShieldCheck, 
  ExternalLink,
  Users,
  ChevronDown,
  ChevronUp,
  Share2,
  FileCheck
} from 'lucide-react';

interface EdTechPortalProps {
  courses: Course[];
  enrollments: UserEnrollment[];
  onEnrollCourse: (courseId: string) => void;
  onToggleLessonCompletion: (courseId: string, lessonId: string) => void;
}

export const EdTechPortal: React.FC<EdTechPortalProps> = ({
  courses,
  enrollments,
  onEnrollCourse,
  onToggleLessonCompletion,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'my-learning' | 'pathway-advisor'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourseModal, setSelectedCourseModal] = useState<Course | null>(null);
  const [activeCertificateCourse, setActiveCertificateCourse] = useState<Course | null>(null);

  // Smart Pathway Advisor State
  const [advisorBackground, setAdvisorBackground] = useState<'student' | 'coder' | 'machinist' | 'designer'>('student');
  const [advisorGoal, setAdvisorGoal] = useState<'robotics' | 'hardware' | 'spatial' | 'cleantech'>('robotics');
  const [advisorSubmitted, setAdvisorSubmitted] = useState<boolean>(true);

  // Expanded Syllabus modules state in modal
  const [expandedModules, setExpandedModules] = useState<{ [key: string]: boolean }>({
    'm1': true,
    'm-201': true,
    'm-301': true,
    'm-401': true,
  });

  const categories = [
    'All',
    'Robotics',
    'Industrial Fabrication',
    'AI & Embedded',
    'CleanTech',
    'Spatial Design'
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsAcquired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.careerBenefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const enrolledCourseObjects = enrollments.map((enr) => {
    const course = courses.find((c) => c.id === enr.courseId);
    return { enrollment: enr, course };
  }).filter((item): item is { enrollment: UserEnrollment; course: Course } => item.course !== undefined);

  // Advisor recommendation scoring
  const getAdvisorRecommendations = () => {
    return courses.filter((c) => {
      if (advisorGoal === 'robotics' && (c.category === 'Robotics' || c.category === 'AI & Embedded')) return true;
      if (advisorGoal === 'hardware' && (c.category === 'Industrial Fabrication' || c.category === 'AI & Embedded')) return true;
      if (advisorGoal === 'spatial' && c.category === 'Spatial Design') return true;
      if (advisorGoal === 'cleantech' && c.category === 'CleanTech') return true;
      return false;
    });
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  return (
    <div className="space-y-6">
      {/* Apple-Style Navigation Top Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34C759]/10 text-[#34C759] dark:bg-[#34C759]/20 text-xs font-semibold tracking-wide uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            GenWorks EdTech & Studio Academy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1E] dark:text-white">
            Skill Acceleration & Courses
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E93] max-w-2xl mt-1">
            Enroll in hands-on courses taught by master craftspeople and industry leaders. Earn studio credentials and deploy verified hardware & software artifacts.
          </p>
        </div>

        {/* Apple iOS Segmented Control */}
        <div className="flex items-center p-1 bg-black/[0.06] dark:bg-white/[0.1] rounded-full self-start md:self-auto">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            Course Catalog ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('pathway-advisor')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'pathway-advisor'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#FF9500]" />
            Career Advisor
          </button>
          <button
            onClick={() => setActiveTab('my-learning')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'my-learning'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            <span>My Learning</span>
            {enrollments.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#007AFF] text-white text-[10px] flex items-center justify-center font-bold">
                {enrollments.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-5">
          {/* Smart Recommendation Banner for User Benefit */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#007AFF]/10 via-[#5856D6]/10 to-[#AF52DE]/10 border border-[#007AFF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#007AFF] text-white flex items-center justify-center shadow-md shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                  Not sure which course benefits your career trajectory?
                </h3>
                <p className="text-xs text-[#8E8E93] mt-0.5">
                  Use our 30-second skill match engine to discover sponsored courses tailored to your builder goals.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('pathway-advisor')}
              className="px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3] active:scale-95 transition-all shadow-sm shrink-0 flex items-center gap-1.5"
            >
              <span>Launch Career Matcher</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Search and Category Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
              <input
                type="text"
                placeholder="Search courses by skill (ROS 2, 5-Axis, VisionOS, BMS, TinyML)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-sm text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#007AFF] shadow-sm transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E] shadow-sm font-semibold'
                      : 'bg-white/80 dark:bg-[#1C1C1E]/80 text-[#8E8E93] border border-black/[0.06] dark:border-white/[0.08] hover:text-[#1C1C1E] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => {
              const isEnrolled = enrollments.some((e) => e.courseId === course.id);
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourseModal(course)}
                  className="group cursor-pointer bg-white dark:bg-[#1C1C1E] rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/[0.12] shadow-sm hover:shadow-lg hover:border-[#007AFF]/40 dark:hover:border-[#007AFF]/40 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Course Thumbnail */}
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                          {course.category}
                        </span>
                        {course.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FF9500] text-black text-[10px] font-bold uppercase tracking-wider">
                            Popular
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-2 text-xs text-white/80 mb-0.5 font-medium">
                          <span>{course.durationWeeks} Weeks</span>
                          <span>•</span>
                          <span>{course.level}</span>
                          <span>•</span>
                          <span>★ {course.rating}</span>
                        </div>
                        <h3 className="text-base font-bold leading-snug line-clamp-2">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Body Info */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-[#3C3C43]/90 dark:text-[#EBEBF5]/90 line-clamp-2 leading-relaxed">
                        {course.tagline}
                      </p>

                      {/* Key Career Benefit Highlight */}
                      <div className="p-2.5 rounded-xl bg-[#007AFF]/5 dark:bg-[#007AFF]/10 border border-[#007AFF]/15">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#007AFF] mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Career Benefit:</span>
                        </div>
                        <p className="text-[11px] text-[#3C3C43] dark:text-[#EBEBF5] line-clamp-1">
                          {course.careerBenefits[0]}
                        </p>
                      </div>

                      {/* Instructor mini pill */}
                      <div className="flex items-center gap-2 pt-1">
                        <img
                          src={course.instructor.avatar}
                          alt={course.instructor.name}
                          className="w-5 h-5 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs text-[#8E8E93] truncate">
                          Taught by <strong className="text-[#1C1C1E] dark:text-white font-medium">{course.instructor.name}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.02]">
                    <span className="text-[11px] font-bold text-[#34C759] uppercase tracking-wider">
                      {course.tuition}
                    </span>
                    {isEnrolled ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#34C759]/15 text-[#34C759] text-xs font-semibold">
                        <Check className="w-3 h-3" />
                        Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourseModal(course);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-xs font-semibold hover:bg-[#0071E3] active:scale-95 transition-all shadow-sm"
                      >
                        View & Enroll
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: PATHWAY ADVISOR (Helping user choose courses that benefit them) */}
      {activeTab === 'pathway-advisor' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl p-6 border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9500]/10 text-[#FF9500] text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                Personalized EdTech Pathway Engine
              </div>
              <h2 className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white">
                Find the courses that yield the highest career return for you
              </h2>
              <p className="text-xs sm:text-sm text-[#8E8E93] mt-1">
                Select your current baseline and your desired target craft to receive custom curated curriculum with bench privileges at our innovation centers.
              </p>
            </div>

            {/* Step 1: Current Background */}
            <div className="mt-6 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                1. What is your primary background right now?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'student', label: 'Student Builder / STEM Major' },
                  { id: 'coder', label: 'Software / CS Engineer' },
                  { id: 'machinist', label: 'Machinist / Tradesperson' },
                  { id: 'designer', label: 'Product / UI / UX Designer' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAdvisorBackground(item.id as any)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      advisorBackground === item.id
                        ? 'border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF]'
                        : 'border-black/[0.08] dark:border-white/[0.12] hover:bg-black/[0.02] text-[#1C1C1E] dark:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Desired Career Goal */}
            <div className="mt-5 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                2. Which high-impact hardware or software capability do you want to master?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'robotics', label: 'Autonomous Robotics & ROS 2' },
                  { id: 'hardware', label: 'Precision 5-Axis CNC & Tooling' },
                  { id: 'spatial', label: 'VisionOS & Spatial Computing' },
                  { id: 'cleantech', label: 'EV Batteries & Clean Power Grids' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAdvisorGoal(item.id as any)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      advisorGoal === item.id
                        ? 'border-[#34C759] bg-[#34C759]/10 text-[#34C759]'
                        : 'border-black/[0.08] dark:border-white/[0.12] hover:bg-black/[0.02] text-[#1C1C1E] dark:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Courses Result */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF9500]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
                  Recommended Courses Tailored for Your Background
                </h3>
              </div>
              <span className="text-xs text-[#34C759] font-semibold">
                100% Fellowship Eligible
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAdvisorRecommendations().map((course) => {
                const isEnrolled = enrollments.some((e) => e.courseId === course.id);
                return (
                  <div
                    key={course.id}
                    className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-[#007AFF]/30 shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                            98% Compatibility Match
                          </span>
                          <h4 className="text-lg font-bold text-[#1C1C1E] dark:text-white mt-1.5">
                            {course.title}
                          </h4>
                          <p className="text-xs text-[#8E8E93] mt-0.5">{course.tagline}</p>
                        </div>
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 rounded-2xl object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="mt-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-[#8E8E93] uppercase">Why this benefits you:</span>
                        {course.careerBenefits.slice(0, 2).map((benefit, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-[#1C1C1E] dark:text-white font-medium">
                            <Check className="w-3.5 h-3.5 text-[#34C759] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs text-[#8E8E93]">
                        {course.durationWeeks} weeks • {course.weeklyHours} hrs/wk
                      </span>
                      {isEnrolled ? (
                        <span className="text-xs font-bold text-[#34C759] flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Enrolled
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            onEnrollCourse(course.id);
                          }}
                          className="px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3] active:scale-95 transition-all shadow-sm"
                        >
                          1-Tap Enroll
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MY LEARNING (Enrolled Course Progress & Digital Certification) */}
      {activeTab === 'my-learning' && (
        <div className="space-y-5">
          {enrolledCourseObjects.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.08] dark:border-white/[0.12]">
              <GraduationCap className="w-10 h-10 text-[#8E8E93] mx-auto mb-2" />
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">You haven’t enrolled in any courses yet</h3>
              <p className="text-xs text-[#8E8E93] mt-1 max-w-md mx-auto">
                Explore our catalog of hardware and software courses to access workbench mentorship and build verified portfolio artifacts.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="mt-4 px-5 py-2.5 rounded-full bg-[#007AFF] text-white text-xs font-bold"
              >
                Browse Course Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                  Active Course Enrollments ({enrolledCourseObjects.length})
                </span>
                <span className="text-xs text-[#34C759] font-medium">
                  Studio Fellowship Active
                </span>
              </div>

              {enrolledCourseObjects.map(({ enrollment, course }) => {
                const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                const completedCount = enrollment.completedLessonIds.length;
                const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
                const isCompleted = progressPct === 100;

                return (
                  <div
                    key={enrollment.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-14 h-14 rounded-2xl object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                              {course.category}
                            </span>
                            <span className="text-xs text-[#8E8E93]">
                              Enrolled {enrollment.enrolledAt}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white mt-0.5">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      {/* Progress / Certificate Button */}
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        {isCompleted && (
                          <button
                            onClick={() => setActiveCertificateCourse(course)}
                            className="px-3.5 py-1.5 rounded-full bg-[#34C759] text-white text-xs font-bold hover:bg-[#2DB34D] transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>View Certificate</span>
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedCourseModal(course)}
                          className="px-3.5 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs font-semibold text-[#1C1C1E] dark:text-white hover:bg-black/[0.08]"
                        >
                          Course Details
                        </button>
                      </div>
                    </div>

                    {/* Apple Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#1C1C1E] dark:text-white">
                          Progress: {completedCount} of {totalLessons} Lessons Completed
                        </span>
                        <span className="font-mono text-[#007AFF] font-bold">{progressPct}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-black/[0.06] dark:bg-white/[0.1] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#007AFF] to-[#34C759] rounded-full transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Interactive Syllabus Checkbox Checklist */}
                    <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] block mb-2">
                        Interactive Lesson Checklist (Tap to complete):
                      </span>
                      <div className="space-y-2">
                        {course.modules.flatMap((m) => m.lessons).map((lesson) => {
                          const isDone = enrollment.completedLessonIds.includes(lesson.id);
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => onToggleLessonCompletion(course.id, lesson.id)}
                              className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-all ${
                                isDone
                                  ? 'bg-[#34C759]/10 border-[#34C759]/30 text-[#1C1C1E] dark:text-white'
                                  : 'bg-black/[0.02] dark:bg-white/[0.04] border-black/[0.04] dark:border-white/[0.06] hover:bg-black/[0.05]'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#34C759] shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-[#8E8E93] shrink-0" />
                                )}
                                <span className={`text-xs font-medium truncate ${isDone ? 'line-through text-[#8E8E93]' : ''}`}>
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-[#8E8E93] shrink-0 ml-2">
                                {lesson.duration}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* FULL COURSE DETAIL & ENROLLMENT SHEET (Apple Style) */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-56 w-full bg-zinc-900 shrink-0">
              <img
                src={selectedCourseModal.image}
                alt={selectedCourseModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/40 to-transparent"></div>

              <button
                onClick={() => setSelectedCourseModal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center text-sm font-semibold transition-colors"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#007AFF] text-white">
                  {selectedCourseModal.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {selectedCourseModal.title}
                </h2>
                <p className="text-xs text-white/80 mt-0.5">{selectedCourseModal.tagline}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Quick Course Metrics */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-center">
                <div>
                  <span className="text-[11px] text-[#8E8E93] block">Duration</span>
                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                    {selectedCourseModal.durationWeeks} Weeks ({selectedCourseModal.weeklyHours}h/wk)
                  </span>
                </div>
                <div className="border-x border-black/[0.06] dark:border-white/[0.08]">
                  <span className="text-[11px] text-[#8E8E93] block">Level</span>
                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                    {selectedCourseModal.level}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#8E8E93] block">Enrolled Builders</span>
                  <span className="text-xs font-bold text-[#007AFF]">
                    {selectedCourseModal.enrolledCount} active
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-1.5">Overview</h4>
                <p className="text-xs sm:text-sm text-[#3C3C43] dark:text-[#EBEBF5] leading-relaxed">
                  {selectedCourseModal.description}
                </p>
              </div>

              {/* Career Outcomes & Benefits */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#007AFF] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Direct Career & Prototyping Benefits
                </h4>
                <div className="space-y-1.5">
                  {selectedCourseModal.careerBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#1C1C1E] dark:text-white font-medium p-2 rounded-xl bg-[#007AFF]/5 dark:bg-[#007AFF]/10">
                      <Check className="w-3.5 h-3.5 text-[#007AFF] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Syllabus Accordion */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-2">Curriculum Syllabus</h4>
                <div className="space-y-2">
                  {selectedCourseModal.modules.map((mod) => {
                    const isExpanded = expandedModules[mod.id] ?? false;
                    return (
                      <div
                        key={mod.id}
                        className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] overflow-hidden"
                      >
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full p-3.5 bg-black/[0.02] dark:bg-white/[0.03] flex items-center justify-between text-left hover:bg-black/[0.04]"
                        >
                          <div>
                            <span className="text-xs font-bold text-[#1C1C1E] dark:text-white block">
                              {mod.title}
                            </span>
                            <span className="text-[11px] text-[#8E8E93]">{mod.duration}</span>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-[#8E8E93]" /> : <ChevronDown className="w-4 h-4 text-[#8E8E93]" />}
                        </button>

                        {isExpanded && (
                          <div className="p-3 space-y-1.5 bg-white dark:bg-[#1C1C1E]">
                            {mod.lessons.map((l) => (
                              <div key={l.id} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-black/[0.02] dark:hover:bg-white/[0.04]">
                                <span className="text-[#3C3C43] dark:text-[#EBEBF5] flex items-center gap-2">
                                  <BookOpen className="w-3 h-3 text-[#007AFF]" />
                                  {l.title}
                                </span>
                                <span className="text-[11px] font-mono text-[#8E8E93]">{l.duration}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructor */}
              <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] flex items-center gap-3">
                <img
                  src={selectedCourseModal.instructor.avatar}
                  alt={selectedCourseModal.instructor.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                    {selectedCourseModal.instructor.name}
                  </h5>
                  <p className="text-[11px] text-[#8E8E93]">{selectedCourseModal.instructor.role}</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-5 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8E8E93] block">Tuition Status</span>
                <span className="text-xs font-bold text-[#34C759]">
                  {selectedCourseModal.tuition}
                </span>
              </div>

              {enrollments.some((e) => e.courseId === selectedCourseModal.id) ? (
                <button
                  onClick={() => {
                    setSelectedCourseModal(null);
                    setActiveTab('my-learning');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#34C759] text-white text-xs font-bold hover:bg-[#2DB34D] transition-all shadow-md flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Already Enrolled • Go to Lessons</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onEnrollCourse(selectedCourseModal.id);
                    setSelectedCourseModal(null);
                    setActiveTab('my-learning');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3] active:scale-95 transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enroll with 1-Tap Studio Pass</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL CERTIFICATE MODAL (Apple Digital Credential Style) */}
      {activeCertificateCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/10 dark:border-white/20 shadow-2xl p-6 sm:p-8 text-center relative">
            <button
              onClick={() => setActiveCertificateCourse(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/[0.1] text-[#8E8E93] hover:text-[#1C1C1E] flex items-center justify-center text-sm font-semibold"
            >
              ✕
            </button>

            <div className="w-16 h-16 rounded-full bg-[#34C759]/10 text-[#34C759] flex items-center justify-center mx-auto mb-4 border border-[#34C759]/30">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
              GenWorks Studio Credential
            </span>
            <h2 className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white mt-1">
              Certificate of Completion
            </h2>
            <p className="text-xs text-[#8E8E93] mt-1">This verifies that</p>

            <div className="my-4 py-2 border-y border-black/[0.08] dark:border-white/[0.1]">
              <p className="text-lg font-bold text-[#007AFF]">Student Builder</p>
              <p className="text-xs text-[#8E8E93]">has satisfactorily completed all laboratory briefs for</p>
              <p className="text-sm font-bold text-[#1C1C1E] dark:text-white mt-1">
                {activeCertificateCourse.title}
              </p>
              <p className="text-[11px] font-mono text-[#34C759] mt-1">
                Credential ID: GW-CERT-{activeCertificateCourse.id.toUpperCase()}-2025
              </p>
            </div>

            <p className="text-xs text-[#8E8E93] leading-relaxed">
              Certified by GenWorks Studio Engineering Council and instructor {activeCertificateCourse.instructor.name}.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveCertificateCourse(null)}
                className="px-5 py-2.5 rounded-full bg-[#007AFF] text-white text-xs font-bold shadow-md hover:bg-[#0071E3]"
              >
                Add to Apple Wallet / Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
