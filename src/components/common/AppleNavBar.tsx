import React from 'react';
import { ViewTab } from '../../types';
import { 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  ShieldAlert, 
  Sparkles, 
  GraduationCap, 
  Wrench, 
  Layers,
  CheckCircle2
} from 'lucide-react';

interface AppleNavBarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  enrolledCount: number;
  pendingAppsCount: number;
}

export const AppleNavBar: React.FC<AppleNavBarProps> = ({
  currentTab,
  onSelectTab,
  isDeviceFrame,
  onToggleDeviceFrame,
  isDarkMode,
  onToggleDarkMode,
  enrolledCount,
  pendingAppsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('studio')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0E1318] dark:bg-[#D4FF32] flex items-center justify-center text-white dark:text-[#0E1318] shadow-sm group-hover:scale-105 transition-transform">
              <span className="font-mono font-extrabold text-xs">GW</span>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                GENWORKS
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse"></span>
              </span>
              <span className="text-[10px] text-[#8E8E93] block -mt-0.5 tracking-wider font-mono">
                STUDIO &amp; EDTECH
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Quick Nav Links */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-full">
          <button
            onClick={() => onSelectTab('studio')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'studio'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => onSelectTab('courses')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              currentTab === 'courses'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            <span>EdTech Courses</span>
            {enrolledCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#007AFF] text-white text-[10px] font-bold">
                {enrolledCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onSelectTab('workers')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              currentTab === 'workers'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            <span>Skilled Workers &amp; Map</span>
          </button>
          <button
            onClick={() => onSelectTab('students')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
              currentTab === 'students'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-xs'
                : 'text-[#8E8E93] hover:text-[#1C1C1E]'
            }`}
          >
            Students
          </button>
        </div>

        {/* Action Controls (Device frame, dark mode, admin quick-switch) */}
        <div className="flex items-center gap-2">
          {/* Admin Mode Quick Switcher Button */}
          <button
            onClick={() => onSelectTab('admin')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'bg-[#AF52DE] text-white shadow-md ring-2 ring-[#AF52DE]/30'
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white border border-black/[0.05] dark:border-white/[0.08]'
            }`}
            title="Administrator Controls"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Portal</span>
            {pendingAppsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[10px] flex items-center justify-center font-bold">
                {pendingAppsCount}
              </span>
            )}
          </button>

          {/* iPhone Frame Simulator Toggle (Lets user preview Apple iOS Mobile look) */}
          <button
            onClick={onToggleDeviceFrame}
            className={`p-2 rounded-full border transition-all ${
              isDeviceFrame
                ? 'bg-[#007AFF] text-white border-[#007AFF] shadow-sm'
                : 'bg-black/[0.04] dark:bg-white/[0.06] text-[#8E8E93] border-black/[0.05] dark:border-white/[0.08] hover:text-[#1C1C1E]'
            }`}
            title={isDeviceFrame ? 'Switch to Fullscreen Canvas' : 'Preview Apple iPhone App Frame'}
          >
            {isDeviceFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white border border-black/[0.05] dark:border-white/[0.08] transition-colors"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#FF9500]" /> : <Moon className="w-4 h-4 text-[#5856D6]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
