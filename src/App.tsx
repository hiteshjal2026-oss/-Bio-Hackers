import React, { useState, useEffect } from 'react';
import { ViewTab, Course, SkilledWorker, Workplace, StudentBuilder, ApplicationSubmission, UserEnrollment } from './types';
import { 
  INITIAL_COURSES, 
  INITIAL_WORKERS, 
  INITIAL_WORKPLACES, 
  INITIAL_STUDENTS, 
  INITIAL_APPLICATIONS 
} from './data/mockData';
import { AppleNavBar } from './components/common/AppleNavBar';
import { AppleTabBar } from './components/common/AppleTabBar';
import { StudioHome } from './components/studio/StudioHome';
import { EdTechPortal } from './components/courses/EdTechPortal';
import { SkilledWorkersView } from './components/workers/SkilledWorkersView';
import { StudentsView } from './components/students/StudentsView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2, Sparkles, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('studio');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);

  // App Data State
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [workers, setWorkers] = useState<SkilledWorker[]>(INITIAL_WORKERS);
  const [workplaces, setWorkplaces] = useState<Workplace[]>(INITIAL_WORKPLACES);
  const [students] = useState<StudentBuilder[]>(INITIAL_STUDENTS);
  const [applications, setApplications] = useState<ApplicationSubmission[]>(INITIAL_APPLICATIONS);

  // Active User Enrollments (Initial sample enrollment for instant interactive feedback)
  const [enrollments, setEnrollments] = useState<UserEnrollment[]>([
    {
      id: 'enr-init-1',
      courseId: 'crs-1',
      enrolledAt: '3 days ago',
      progressPercent: 50,
      completedLessonIds: ['l-101', 'l-102', 'l-104'],
      status: 'in-progress',
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Dark Mode with HTML element class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Course Enrollment Handler
  const handleEnrollCourse = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments.some((e) => e.courseId === courseId)) {
      showToast(`Already enrolled in "${course.title}".`);
      return;
    }

    const newEnrollment: UserEnrollment = {
      id: `enr-${Date.now()}`,
      courseId,
      enrolledAt: 'Just now',
      progressPercent: 0,
      completedLessonIds: [],
      status: 'in-progress',
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);

    // Update course enrolled count in state
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c))
    );

    showToast(`Enrolled in "${course.title}" with Studio Fellowship!`);
  };

  // Check/Uncheck Lesson Progress
  const handleToggleLessonCompletion = (courseId: string, lessonId: string) => {
    setEnrollments((prev) =>
      prev.map((enr) => {
        if (enr.courseId !== courseId) return enr;

        const isCompleted = enr.completedLessonIds.includes(lessonId);
        const nextCompleted = isCompleted
          ? enr.completedLessonIds.filter((id) => id !== lessonId)
          : [...enr.completedLessonIds, lessonId];

        const course = courses.find((c) => c.id === courseId);
        const totalLessons = course?.modules.reduce((sum, m) => sum + m.lessons.length, 0) || 1;
        const newPct = Math.round((nextCompleted.length / totalLessons) * 100);

        if (newPct === 100 && enr.progressPercent < 100) {
          showToast(`Congratulations! You completed all lessons for "${course?.title}". Certificate issued!`);
        }

        return {
          ...enr,
          completedLessonIds: nextCompleted,
          progressPercent: newPct,
          status: newPct === 100 ? 'completed' : 'in-progress',
        };
      })
    );
  };

  // Admin Course Handlers
  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  };

  // Admin Worker Handler
  const handleAddWorker = (newWorker: SkilledWorker) => {
    setWorkers((prev) => [newWorker, ...prev]);
    // update active count in workplace
    setWorkplaces((prev) =>
      prev.map((wp) =>
        wp.id === newWorker.workplaceId
          ? { ...wp, activeWorkersCount: wp.activeWorkersCount + 1 }
          : wp
      )
    );
  };

  // Application Submission from Studio
  const handleSubmitApplication = (appData: Omit<ApplicationSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission: ApplicationSubmission = {
      id: `app-${Date.now()}`,
      name: appData.name,
      email: appData.email,
      concept: appData.concept,
      track: appData.track,
      submittedAt: 'Just now',
      status: 'Pending Review',
      notes: appData.notes,
    };
    setApplications((prev) => [newSubmission, ...prev]);
    showToast(`Application from ${appData.name} transmitted to Administrator desk.`);
  };

  const handleUpdateApplicationStatus = (id: string, status: ApplicationSubmission['status']) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const pendingAppsCount = applications.filter((a) => a.status === 'Pending Review').length;

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#000000] text-[#1C1C1E] dark:text-[#F2F2F7] flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notification (Apple Capsule Notification) */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-2xl border border-black/10 dark:border-white/15 shadow-2xl text-xs font-semibold text-[#1C1C1E] dark:text-white flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#007AFF] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Apple Navigation Bar */}
      <AppleNavBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isDeviceFrame={isDeviceFrame}
        onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        enrolledCount={enrollments.length}
        pendingAppsCount={pendingAppsCount}
      />

      {/* Device Frame Wrapper (Optional Apple iPhone 16 Pro Frame view or Standard Fluid view) */}
      <div className={`flex-1 w-full ${isDeviceFrame ? 'py-8 flex justify-center items-center bg-[#E5E5EA] dark:bg-[#121214]' : ''}`}>
        <div
          className={`w-full transition-all duration-300 ${
            isDeviceFrame
              ? 'max-w-[420px] rounded-[52px] border-[10px] border-[#2C2C2E] shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden bg-[#F2F2F7] dark:bg-[#000000] relative min-h-[860px]'
              : 'max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8'
          }`}
        >
          {/* iOS Dynamic Island & Status Bar (shown in Device Frame mode) */}
          {isDeviceFrame && (
            <div className="sticky top-0 z-30 pt-3 px-6 pb-2 bg-white/80 dark:bg-[#000000]/80 backdrop-blur-md flex items-center justify-between text-xs font-semibold select-none border-b border-black/5 dark:border-white/5">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-24 h-5 rounded-full bg-black flex items-center justify-center gap-1.5 px-2">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse"></span>
                <span className="text-[9px] text-white font-mono">GENWORKS</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#1C1C1E] dark:text-white">
                <Signal className="w-3.5 h-3.5" />
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Main Content Rendered According to Active Tab */}
          <main className={`${isDeviceFrame ? 'p-4 pb-28' : 'pb-24'}`}>
            {currentTab === 'studio' && (
              <StudioHome
                onNavigateTab={setCurrentTab}
                onSubmitApplication={handleSubmitApplication}
              />
            )}

            {currentTab === 'courses' && (
              <EdTechPortal
                courses={courses}
                enrollments={enrollments}
                onEnrollCourse={handleEnrollCourse}
                onToggleLessonCompletion={handleToggleLessonCompletion}
              />
            )}

            {currentTab === 'workers' && (
              <SkilledWorkersView
                workers={workers}
                workplaces={workplaces}
              />
            )}

            {currentTab === 'students' && (
              <StudentsView
                students={students}
              />
            )}

            {currentTab === 'admin' && (
              <AdminDashboard
                courses={courses}
                workers={workers}
                workplaces={workplaces}
                applications={applications}
                onAddCourse={handleAddCourse}
                onDeleteCourse={handleDeleteCourse}
                onUpdateApplicationStatus={handleUpdateApplicationStatus}
                onAddWorker={handleAddWorker}
              />
            )}
          </main>
        </div>
      </div>

      {/* Apple-style Bottom Tab Bar for Instant Mobile Access */}
      <AppleTabBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        enrolledCount={enrollments.length}
        pendingAppsCount={pendingAppsCount}
      />
    </div>
  );
}
