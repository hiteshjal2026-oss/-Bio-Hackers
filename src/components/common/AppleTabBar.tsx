import React from 'react';
import { ViewTab } from '../../types';
import { 
  Home, 
  GraduationCap, 
  Wrench, 
  Users, 
  ShieldAlert,
  MapPin
} from 'lucide-react';

interface AppleTabBarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  enrolledCount: number;
  pendingAppsCount: number;
}

export const AppleTabBar: React.FC<AppleTabBarProps> = ({
  currentTab,
  onSelectTab,
  enrolledCount,
  pendingAppsCount,
}) => {
  const tabs: { id: ViewTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'studio',
      label: 'Studio',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'courses',
      label: 'Courses',
      icon: <GraduationCap className="w-5 h-5" />,
      badge: enrolledCount > 0 ? enrolledCount : undefined,
    },
    {
      id: 'workers',
      label: 'Workers & Map',
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      id: 'students',
      label: 'Students',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: <ShieldAlert className="w-5 h-5" />,
      badge: pendingAppsCount > 0 ? pendingAppsCount : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-[#1C1C1E]/85 backdrop-blur-2xl border-t border-black/[0.06] dark:border-white/[0.08] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center min-w-[56px] py-1 transition-all active:scale-90 ${
                isActive
                  ? 'text-[#007AFF] font-bold'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold leading-tight">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[68px]">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#007AFF] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
