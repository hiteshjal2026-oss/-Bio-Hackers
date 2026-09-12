export type ViewTab = 'studio' | 'courses' | 'workers' | 'students' | 'admin';

export interface Workplace {
  id: string;
  name: string;
  code: string;
  category: 'Innovation Lab' | 'FabLab & Foundry' | 'Robotics Hub' | 'Clean Tech Center' | 'Advanced Prototyping';
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  description: string;
  facilities: string[];
  photo: string;
  activeWorkersCount: number;
  openBenches: number;
}

export interface SkilledWorker {
  id: string;
  name: string;
  role: string;
  tradeCategory: 'Robotics & Automation' | 'Precision Machining' | 'Renewable Energy & IoT' | 'Industrial Fabrication' | 'Embedded Systems' | 'Product Architecture';
  avatar: string;
  bio: string;
  workplaceId: string;
  workplaceName: string;
  experienceYears: number;
  verifiedBadges: string[];
  rating: number;
  reviewCount: number;
  toolsMastered: string[];
  currentProjects: string[];
  availability: 'Available for Apprenticeship' | 'Mentoring Active' | 'Full-Time Bench';
  languagesSpoken: string[];
  contactEmail: string;
  hourlyRate: string;
}

export interface ToolGlossaryItem {
  term: string;
  translation: string;
  phonetic: string;
  definition: string;
}

export interface ToolLanguageContent {
  languageCode: string;
  languageName: string;
  nativeName: string;
  flag: string;
  localizedName: string;
  tagline: string;
  overview: string;
  safetyProtocols: string[];
  quickstartSteps: { step: number; title: string; desc: string }[];
  glossary: ToolGlossaryItem[];
  quizQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface EquipmentTool {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced Master';
  image: string;
  associatedWorkerIds: string[];
  workplaceIds: string[];
  translations: Record<string, ToolLanguageContent>;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'hands-on-lab' | 'code-challenge' | 'studio-critique';
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: 'Robotics' | 'Hardware & IoT' | 'Industrial Fabrication' | 'AI & Embedded' | 'CleanTech' | 'Spatial Design';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  weeklyHours: number;
  rating: number;
  enrolledCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    company: string;
  };
  description: string;
  careerBenefits: string[];
  skillsAcquired: string[];
  prerequisites: string[];
  modules: CourseModule[];
  tuition: 'Free Studio Fellowship' | 'Sponsored by Apple Foundation' | 'Enterprise Grant';
  certificationTitle: string;
  featured?: boolean;
  image: string;
}

export interface UserEnrollment {
  id: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  status: 'in-progress' | 'completed';
  certificateIssued?: boolean;
}

export interface StudentBuilder {
  id: string;
  name: string;
  avatar: string;
  title: string;
  track: 'Research & Insight' | 'Creative & Brand' | 'Growth & Operations' | 'Hardware Systems';
  currentProject: string;
  projectSnippet: string;
  skills: string[];
  cohort: string;
  status: 'Shipping v1.0' | 'In Prototyping' | 'Seeking Feedback';
  image: string;
}

export interface ApplicationSubmission {
  id: string;
  name: string;
  email: string;
  concept: string;
  track: string;
  submittedAt: string;
  status: 'Pending Review' | 'Approved' | 'Interview Scheduled' | 'Archived';
  notes?: string;
}
