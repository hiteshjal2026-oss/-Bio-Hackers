import React, { useState } from 'react';
import { Course, SkilledWorker, Workplace, ApplicationSubmission } from '../../types';
import { 
  ShieldAlert, 
  Plus, 
  Check, 
  X, 
  Users, 
  GraduationCap, 
  Building, 
  FileText, 
  TrendingUp, 
  Trash2, 
  Edit3, 
  Download, 
  AlertCircle,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface AdminDashboardProps {
  courses: Course[];
  workers: SkilledWorker[];
  workplaces: Workplace[];
  applications: ApplicationSubmission[];
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
  onUpdateApplicationStatus: (id: string, status: ApplicationSubmission['status']) => void;
  onAddWorker: (worker: SkilledWorker) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  courses,
  workers,
  workplaces,
  applications,
  onAddCourse,
  onDeleteCourse,
  onUpdateApplicationStatus,
  onAddWorker,
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'courses' | 'applications' | 'workers'>('overview');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<Course['category']>('Robotics');
  const [newLevel, setNewLevel] = useState<Course['level']>('Intermediate');
  const [newWeeks, setNewWeeks] = useState(6);
  const [newInstructor, setNewInstructor] = useState('Dr. Marcus Vance');
  const [newBenefits, setNewBenefits] = useState('Qualify for Senior Robotics Engineering roles; Studio bench access');

  // New Worker Form State
  const [workerName, setWorkerName] = useState('');
  const [workerRole, setWorkerRole] = useState('');
  const [workerCategory, setWorkerCategory] = useState<SkilledWorker['tradeCategory']>('Robotics & Automation');
  const [workerWorkplaceId, setWorkerWorkplaceId] = useState(workplaces[0]?.id || '');
  const [workerTools, setWorkerTools] = useState('KUKA Robotics, ROS 2, SolidWorks');
  const [workerLanguages, setWorkerLanguages] = useState('English, Spanish, German');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Course = {
      id: `crs-${Date.now()}`,
      title: newTitle,
      tagline: newTagline || 'Advanced specialized curriculum for studio fellows.',
      category: newCategory,
      level: newLevel,
      durationWeeks: Number(newWeeks) || 6,
      weeklyHours: 6,
      rating: 5.0,
      enrolledCount: 1,
      instructor: {
        name: newInstructor,
        role: 'Studio Senior Lead',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        company: 'GenWorks Studio Guild',
      },
      description: 'Comprehensive studio-led coursework designed to deliver verified hardware artifacts.',
      careerBenefits: newBenefits.split(';').map((b) => b.trim()).filter(Boolean),
      skillsAcquired: ['Advanced CAD', 'System Design', 'Studio Safety'],
      prerequisites: ['Studio fellowship admission'],
      modules: [
        {
          id: `mod-${Date.now()}`,
          title: 'Module 1: Studio Directives & Safety Protocols',
          duration: 'Week 1-2',
          lessons: [
            { id: `l-${Date.now()}-1`, title: 'Safety Protocols & Lab Operation', duration: '45 mins', type: 'video' },
            { id: `l-${Date.now()}-2`, title: 'Hands-on Workbench Exercise', duration: '90 mins', type: 'hands-on-lab' },
          ],
        },
      ],
      tuition: 'Free Studio Fellowship',
      certificationTitle: `${newTitle} Specialist`,
      featured: true,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    };

    onAddCourse(created);
    setShowAddCourseModal(false);
    setNewTitle('');
    setNewTagline('');
    triggerToast('New EdTech course successfully published to catalog.');
  };

  const handleCreateWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim()) return;

    const wp = workplaces.find((w) => w.id === workerWorkplaceId) || workplaces[0];
    const newWorker: SkilledWorker = {
      id: `w-${Date.now()}`,
      name: workerName,
      role: workerRole || 'Senior Prototyper & Artisan',
      tradeCategory: workerCategory,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      bio: 'Master artisan mentoring next-gen builders across physical hardware and precision systems.',
      workplaceId: wp.id,
      workplaceName: `${wp.name} (${wp.city}, ${wp.state})`,
      experienceYears: 7,
      verifiedBadges: ['GenWorks Certified Master', 'Shop Lead'],
      rating: 5.0,
      reviewCount: 12,
      languagesSpoken: workerLanguages.split(',').map((l) => l.trim()).filter(Boolean),
      toolsMastered: workerTools.split(',').map((t) => t.trim()).filter(Boolean),
      currentProjects: ['Next-Gen Prototype Enclosure'],
      availability: 'Available for Apprenticeship',
      contactEmail: `${workerName.toLowerCase().replace(/\s+/g, '.')}@studio.genworks.org`,
      hourlyRate: '$85/hr (Studio Fellowship covered)',
    };

    onAddWorker(newWorker);
    setShowAddWorkerModal(false);
    setWorkerName('');
    setWorkerRole('');
    triggerToast(`Added ${newWorker.name} to ${wp.name} on the map.`);
  };

  const exportRoster = () => {
    const data = {
      coursesCount: courses.length,
      workersCount: workers.length,
      workplacesCount: workplaces.length,
      applicationsCount: applications.length,
      exportedAt: new Date().toISOString(),
      courses: courses.map((c) => ({ id: c.id, title: c.title, enrolled: c.enrolledCount })),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `genworks-admin-export-${Date.now()}.json`;
    a.click();
    triggerToast('Platform audit export downloaded.');
  };

  const pendingAppsCount = applications.filter((a) => a.status === 'Pending Review').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#1C1C1E] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/15 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AF52DE]/10 text-[#AF52DE] text-xs font-semibold tracking-wide uppercase mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            Studio Administrator Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1E] dark:text-white">
            Platform Management & Ops
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E93] max-w-2xl mt-1">
            Oversee course enrollments, verify workplace machine locations, review admissions, and deploy craft instructors.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-black/[0.06] dark:bg-white/[0.1] rounded-full self-start md:self-auto">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              adminTab === 'overview'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setAdminTab('courses')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              adminTab === 'courses'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            Courses ({courses.length})
          </button>
          <button
            onClick={() => setAdminTab('applications')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              adminTab === 'applications'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            <span>Admissions</span>
            {pendingAppsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[10px] flex items-center justify-center font-bold">
                {pendingAppsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setAdminTab('workers')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              adminTab === 'workers'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            Workers & Map Pins ({workers.length})
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#007AFF]/10 text-[#007AFF] flex items-center justify-center mb-3">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white block">
                {courses.reduce((acc, c) => acc + c.enrolledCount, 0)}
              </span>
              <span className="text-xs text-[#8E8E93]">Active Course Enrollments</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#34C759]/10 text-[#34C759] flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white block">
                {workers.length}
              </span>
              <span className="text-xs text-[#8E8E93]">Verified Skilled Workers</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#AF52DE]/10 text-[#AF52DE] flex items-center justify-center mb-3">
                <Building className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white block">
                {workplaces.length}
              </span>
              <span className="text-xs text-[#8E8E93]">Distributed Innovation Labs</span>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#FF9500]/10 text-[#FF9500] flex items-center justify-center mb-3">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-2xl font-extrabold text-[#1C1C1E] dark:text-white block">
                94.8%
              </span>
              <span className="text-xs text-[#8E8E93]">Studio Artifact Completion Rate</span>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">Admin Operations & Sync</h3>
              <p className="text-xs text-[#8E8E93] mt-0.5">Publish new courses, add master workers to the map, or download audit reports.</p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setShowAddCourseModal(true)}
                className="px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3] flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
              <button
                onClick={() => setShowAddWorkerModal(true)}
                className="px-4 py-2 rounded-full bg-[#34C759] text-white text-xs font-bold hover:bg-[#2DB34D] flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Worker Pin</span>
              </button>
              <button
                onClick={exportRoster}
                className="p-2 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COURSE MANAGEMENT */}
      {adminTab === 'courses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
              Curated Courses Catalog ({courses.length})
            </span>
            <button
              onClick={() => setShowAddCourseModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Course</span>
            </button>
          </div>

          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08] bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.08] dark:border-white/[0.12] overflow-hidden">
            {courses.map((course) => (
              <div key={course.id} className="p-4 flex items-center justify-between gap-4 hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                        {course.category}
                      </span>
                      <span className="text-xs text-[#8E8E93]">{course.durationWeeks} wks</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white truncate mt-0.5">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#8E8E93] truncate">
                      Instructor: {course.instructor.name} • {course.enrolledCount} enrolled
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onDeleteCourse(course.id);
                      triggerToast(`Deleted course "${course.title}".`);
                    }}
                    className="p-2 rounded-xl text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APPLICATIONS DESK */}
      {adminTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
              Incoming Builder Applications ({applications.length})
            </span>
          </div>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#AF52DE]/10 text-[#AF52DE]">
                      {app.track}
                    </span>
                    <h4 className="text-base font-bold text-[#1C1C1E] dark:text-white mt-1">
                      {app.name} <span className="text-xs font-normal text-[#8E8E93]">({app.email})</span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      app.status === 'Approved'
                        ? 'bg-[#34C759]/15 text-[#34C759]'
                        : app.status === 'Interview Scheduled'
                        ? 'bg-[#007AFF]/15 text-[#007AFF]'
                        : 'bg-[#FF9500]/15 text-[#FF9500]'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-[11px] text-[#8E8E93]">{app.submittedAt}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#3C3C43] dark:text-[#EBEBF5] bg-black/[0.02] dark:bg-white/[0.04] p-3 rounded-2xl border border-black/[0.04]">
                  "{app.concept}"
                </p>

                {app.notes && (
                  <p className="text-xs text-[#8E8E93] italic">
                    Reviewer Note: {app.notes}
                  </p>
                )}

                <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      onUpdateApplicationStatus(app.id, 'Approved');
                      triggerToast(`Application for ${app.name} approved.`);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#34C759] text-white text-xs font-semibold hover:bg-[#2DB34D] flex items-center gap-1 shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve to Studio</span>
                  </button>
                  <button
                    onClick={() => {
                      onUpdateApplicationStatus(app.id, 'Interview Scheduled');
                      triggerToast(`Interview scheduled for ${app.name}.`);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-xs font-semibold hover:bg-[#0071E3] flex items-center gap-1 shadow-sm"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Schedule Interview</span>
                  </button>
                  <button
                    onClick={() => {
                      onUpdateApplicationStatus(app.id, 'Archived');
                      triggerToast(`Archived application from ${app.name}.`);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-xs font-semibold text-[#8E8E93] hover:text-[#1C1C1E]"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WORKERS & WORKPLACES */}
      {adminTab === 'workers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
              Skilled Workers Across Workplace Locations ({workers.length})
            </span>
            <button
              onClick={() => setShowAddWorkerModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-[#34C759] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register Worker & Map Pin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {workers.map((worker) => (
              <div
                key={worker.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] flex items-center gap-3"
              >
                <img
                  src={worker.avatar}
                  alt={worker.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="text-sm font-bold text-[#1C1C1E] dark:text-white truncate">
                    {worker.name}
                  </h5>
                  <p className="text-xs text-[#8E8E93] truncate">{worker.role}</p>
                  <p className="text-[11px] text-[#007AFF] truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {worker.workplaceName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD COURSE */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/10 dark:border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">Create New Studio Course</h3>
              <button onClick={() => setShowAddCourseModal(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">✕</button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Autonomous Robotic Perception with Depth AI"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  placeholder="e.g. Calibrate optical depth cameras and write real-time point-cloud filters."
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                  >
                    <option value="Robotics">Robotics</option>
                    <option value="Industrial Fabrication">Industrial Fabrication</option>
                    <option value="AI & Embedded">AI & Embedded</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="Spatial Design">Spatial Design</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    min="2"
                    max="16"
                    value={newWeeks}
                    onChange={(e) => setNewWeeks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Instructor Name</label>
                <input
                  type="text"
                  value={newInstructor}
                  onChange={(e) => setNewInstructor(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Career Benefits (Semicolon separated)</label>
                <input
                  type="text"
                  value={newBenefits}
                  onChange={(e) => setNewBenefits(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCourseModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#8E8E93]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3]"
                >
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD WORKER */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/10 dark:border-white/15 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1C1C1E] dark:text-white">Register Worker & Assign to Workplace</h3>
              <button onClick={() => setShowAddWorkerModal(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">✕</button>
            </div>
            <form onSubmit={handleCreateWorker} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Hayes"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Professional Role / Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Robotic Actuation Specialist"
                  value={workerRole}
                  onChange={(e) => setWorkerRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Trade Category</label>
                  <select
                    value={workerCategory}
                    onChange={(e) => setWorkerCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                  >
                    <option value="Robotics & Automation">Robotics & Automation</option>
                    <option value="Precision Machining">Precision Machining</option>
                    <option value="Renewable Energy & IoT">Renewable Energy & IoT</option>
                    <option value="Industrial Fabrication">Industrial Fabrication</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Assign Workplace Location</label>
                  <select
                    value={workerWorkplaceId}
                    onChange={(e) => setWorkerWorkplaceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                  >
                    {workplaces.map((wp) => (
                      <option key={wp.id} value={wp.id}>
                        {wp.city} — {wp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Tools & Equipment (Comma separated)</label>
                <input
                  type="text"
                  value={workerTools}
                  onChange={(e) => setWorkerTools(e.target.value)}
                  placeholder="e.g. Hermle 5-Axis, ROS 2, Altium"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#8E8E93] block mb-1">Languages Spoken / Mentoring (Comma separated)</label>
                <input
                  type="text"
                  value={workerLanguages}
                  onChange={(e) => setWorkerLanguages(e.target.value)}
                  placeholder="e.g. English, Spanish, German, Mandarin"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-xs text-[#1C1C1E] dark:text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddWorkerModal(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#8E8E93]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#34C759] text-white text-xs font-bold hover:bg-[#2DB34D]"
                >
                  Confirm Worker & Map Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
