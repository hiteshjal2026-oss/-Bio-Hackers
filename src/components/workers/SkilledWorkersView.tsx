import React, { useState } from 'react';
import { SkilledWorker, Workplace } from '../../types';
import { WorkplacesMap } from './WorkplacesMap';
import { MultilingualToolLab } from './MultilingualToolLab';
import { 
  Search, 
  MapPin, 
  Award, 
  Wrench, 
  Star, 
  Mail, 
  Building2, 
  Briefcase, 
  Filter, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Globe2,
  BookOpen
} from 'lucide-react';

interface SkilledWorkersViewProps {
  workers: SkilledWorker[];
  workplaces: Workplace[];
}

export const SkilledWorkersView: React.FC<SkilledWorkersViewProps> = ({
  workers,
  workplaces,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedWorkplace, setSelectedWorkplace] = useState<Workplace | null>(workplaces[0] || null);
  const [activeWorkerModal, setActiveWorkerModal] = useState<SkilledWorker | null>(null);
  const [viewMode, setViewMode] = useState<'map-split' | 'grid-only' | 'map-full' | 'tool-lab'>('map-split');
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [selectedLabToolId, setSelectedLabToolId] = useState<string>('hermle-5axis');

  const categories = [
    'All',
    'Robotics & Automation',
    'Precision Machining',
    'Renewable Energy & IoT',
    'Industrial Fabrication',
    'Embedded Systems'
  ];

  const languageFilters = [
    'All',
    'English',
    'German (Deutsch)',
    'Spanish (Español)',
    'Mandarin (中文)',
    'Japanese (日本語)',
    'French (Français)',
    'Hindi (हिन्दी)'
  ];

  const filteredWorkers = workers.filter((worker) => {
    const matchesCategory = selectedCategory === 'All' || worker.tradeCategory === selectedCategory;
    const matchesLanguage = 
      selectedLanguage === 'All' || 
      worker.languagesSpoken?.some((lang) => lang.toLowerCase().includes(selectedLanguage.split(' ')[0].toLowerCase()));
    const matchesSearch = 
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.workplaceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (worker.languagesSpoken && worker.languagesSpoken.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      worker.toolsMastered.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLanguage && matchesSearch;
  });

  const handleSelectWorkplace = (wp: Workplace) => {
    setSelectedWorkplace(wp);
  };

  const handleConnectWorker = (worker: SkilledWorker, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveWorkerModal(worker);
  };

  const mapToolNameToId = (toolName: string): string => {
    const t = toolName.toLowerCase();
    if (t.includes('hermle') || t.includes('5-axis') || t.includes('mill') || t.includes('cnc')) return 'hermle-5axis';
    if (t.includes('ros') || t.includes('px4') || t.includes('cobot') || t.includes('moveit')) return 'ros2-robotics';
    if (t.includes('altium') || t.includes('cell') || t.includes('spectro') || t.includes('thermal')) return 'altium-pcb';
    if (t.includes('kuka') || t.includes('waterjet') || t.includes('tig') || t.includes('press')) return 'kuka-arm';
    return 'hermle-5axis';
  };

  const openToolInLab = (toolName: string) => {
    setSelectedLabToolId(mapToolNameToId(toolName));
    setViewMode('tool-lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Apple-Style Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] dark:bg-[#007AFF]/20 text-xs font-semibold tracking-wide uppercase mb-2">
            <Wrench className="w-3.5 h-3.5" />
            Verified Master Artisans & Engineers
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1E] dark:text-white">
            Skilled Workers & Studios
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E93] max-w-2xl mt-1">
            Connect with master craftspeople, hardware prototypers, and tooling leads across their respective innovation labs and fabrication workshops.
          </p>
        </div>

        {/* View Mode Segmented Switcher (iOS Segmented Control) */}
        <div className="flex items-center p-1 bg-black/[0.06] dark:bg-white/[0.1] rounded-full self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setViewMode('map-split')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              viewMode === 'map-split'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            Interactive Map & Directory
          </button>
          <button
            onClick={() => setViewMode('tool-lab')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              viewMode === 'tool-lab'
                ? 'bg-[#007AFF] text-white shadow-sm'
                : 'text-[#007AFF] hover:text-[#007AFF]/80'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Multilingual Tool Lab</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              viewMode === 'tool-lab' ? 'bg-white/20 text-white' : 'bg-[#007AFF]/15 text-[#007AFF]'
            }`}>
              8 Langs
            </span>
          </button>
          <button
            onClick={() => setViewMode('map-full')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              viewMode === 'map-full'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            Full Map
          </button>
          <button
            onClick={() => setViewMode('grid-only')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              viewMode === 'grid-only'
                ? 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white shadow-sm'
                : 'text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white'
            }`}
          >
            Grid Only
          </button>
        </div>
      </div>

      {/* MULTILINGUAL TOOL LAB VIEW */}
      {viewMode === 'tool-lab' && (
        <MultilingualToolLab
          workers={workers}
          workplaces={workplaces}
          initialToolId={selectedLabToolId}
          onSelectWorker={(w) => setActiveWorkerModal(w)}
        />
      )}

      {/* WORKPLACES MAP SECTION - Prominently featured as requested */}
      {viewMode !== 'grid-only' && viewMode !== 'tool-lab' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#007AFF]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#8E8E93]">
                Workplace Locations & Distributed Fabrication Centers
              </h2>
            </div>
            <span className="text-xs text-[#8E8E93]">
              Tap any pin to view respective craftspeople & equipment
            </span>
          </div>

          <WorkplacesMap
            workplaces={workplaces}
            workers={workers}
            selectedWorkplace={selectedWorkplace}
            onSelectWorkplace={handleSelectWorkplace}
            onSelectWorker={(w) => setActiveWorkerModal(w)}
          />
        </div>
      )}

      {/* Filter & Search Bar (Apple Search Field Style) */}
      {viewMode !== 'map-full' && viewMode !== 'tool-lab' && (
        <div className="space-y-4">
          {/* Quick Multilingual Lab Banner */}
          <div 
            onClick={() => setViewMode('tool-lab')}
            className="cursor-pointer p-4 rounded-2xl bg-gradient-to-r from-[#007AFF]/10 via-[#AF52DE]/10 to-transparent border border-[#007AFF]/20 hover:border-[#007AFF]/40 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                  <span>Learn Workshop Tools in Different Languages</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#007AFF] text-white text-[10px] font-semibold">
                    Interactive Audio & Glossaries
                  </span>
                </h4>
                <p className="text-[11px] text-[#8E8E93] mt-0.5">
                  Explore CNC mills, robotic arms, PCB tools, and safety protocols in English, Español, Deutsch, 中文, 日本語, Français, हिन्दी, and Português.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#007AFF] shrink-0 ml-3">
              <span>Open Tool Lab</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Apple-styled Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
              <input
                type="text"
                placeholder="Search by worker, language (e.g. Spanish, German), craft skill, or studio city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] text-sm text-[#1C1C1E] dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#007AFF] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white bg-black/5 dark:bg-white/10 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>

            {/* Quick Workplace Selector Pill */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-[#8E8E93] shrink-0 hidden lg:inline">Workplace:</span>
              <button
                onClick={() => setSelectedWorkplace(null)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl shrink-0 transition-all ${
                  selectedWorkplace === null
                    ? 'bg-[#007AFF] text-white shadow-sm'
                    : 'bg-white dark:bg-[#1C1C1E] text-[#8E8E93] border border-black/[0.08] dark:border-white/[0.12] hover:text-[#1C1C1E]'
                }`}
              >
                All Workplaces
              </button>
              {workplaces.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWorkplace(wp)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl shrink-0 transition-all flex items-center gap-1.5 ${
                    selectedWorkplace?.id === wp.id
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'bg-white dark:bg-[#1C1C1E] text-[#8E8E93] border border-black/[0.08] dark:border-white/[0.12] hover:text-[#1C1C1E]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]"></span>
                  {wp.city}
                </button>
              ))}
            </div>
          </div>

          {/* Trade Category Horizontal Pill Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider shrink-0 mr-1">
              Trade:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E] shadow-sm font-semibold'
                    : 'bg-white/80 dark:bg-[#1C1C1E]/80 text-[#8E8E93] border border-black/[0.06] dark:border-white/[0.08] hover:text-[#1C1C1E] dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Spoken Language Filter Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[11px] font-bold text-[#007AFF] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Globe2 className="w-3 h-3" />
              Language:
            </span>
            {languageFilters.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedLanguage === lang
                    ? 'bg-[#007AFF] text-white shadow-sm font-semibold'
                    : 'bg-white/80 dark:bg-[#1C1C1E]/80 text-[#8E8E93] border border-black/[0.06] dark:border-white/[0.08] hover:text-[#1C1C1E] dark:hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Worker Cards Grid (Apple Inset Grouped Aesthetic) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredWorkers
              .filter((w) => !selectedWorkplace || w.workplaceId === selectedWorkplace.id)
              .map((worker) => {
                const workplace = workplaces.find((wp) => wp.id === worker.workplaceId);
                return (
                  <div
                    key={worker.id}
                    onClick={() => setActiveWorkerModal(worker)}
                    className="group cursor-pointer bg-white dark:bg-[#1C1C1E] rounded-3xl p-5 border border-black/[0.08] dark:border-white/[0.12] shadow-sm hover:shadow-md hover:border-[#007AFF]/40 dark:hover:border-[#007AFF]/40 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Info Header */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <img
                          src={worker.avatar}
                          alt={worker.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-black/5 dark:border-white/10 shrink-0 shadow-inner group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-[#007AFF] uppercase tracking-wider">
                              {worker.tradeCategory}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-semibold text-[#FF9500]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{worker.rating}</span>
                              <span className="text-[#8E8E93] font-normal">({worker.reviewCount})</span>
                            </div>
                          </div>
                          <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white truncate mt-0.5">
                            {worker.name}
                          </h3>
                          <p className="text-xs text-[#8E8E93] truncate">
                            {worker.role}
                          </p>
                        </div>
                      </div>

                      {/* Mentorship Languages Pill */}
                      {worker.languagesSpoken && worker.languagesSpoken.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 mb-2.5">
                          <span className="text-[10px] text-[#8E8E93] font-semibold flex items-center gap-1">
                            <Globe2 className="w-3 h-3 text-[#007AFF]" />
                            Languages:
                          </span>
                          {worker.languagesSpoken.map((lang, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold text-[#007AFF] bg-[#007AFF]/10 dark:bg-[#007AFF]/20 px-1.5 py-0.5 rounded-md"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Workplace Link Pill */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (workplace) {
                            setSelectedWorkplace(workplace);
                            window.scrollTo({ top: 180, behavior: 'smooth' });
                          }
                        }}
                        className="mb-3 p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between hover:bg-[#007AFF]/5 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-lg bg-[#007AFF]/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-[#007AFF]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#1C1C1E] dark:text-white truncate">
                              {workplace?.name || worker.workplaceName}
                            </p>
                            <p className="text-[10px] text-[#8E8E93] truncate">
                              {workplace?.city}, {workplace?.state} • {worker.availability}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#8E8E93] shrink-0" />
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-[#3C3C43]/90 dark:text-[#EBEBF5]/90 line-clamp-2 leading-relaxed mb-3">
                        {worker.bio}
                      </p>

                      {/* Mastered Tools Tags with Multilingual Option */}
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center justify-between text-[10px] text-[#8E8E93]">
                          <span className="font-semibold">Tools Mastered:</span>
                          <span className="text-[#007AFF] font-medium flex items-center gap-0.5">
                            <Globe2 className="w-2.5 h-2.5" />
                            Tap tool to learn in language
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {worker.toolsMastered.slice(0, 3).map((tool, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                openToolInLab(tool);
                              }}
                              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[#1C1C1E] dark:text-[#D1D1D6] hover:bg-[#007AFF]/15 hover:text-[#007AFF] transition-colors flex items-center gap-1 group/btn"
                              title={`Learn ${tool} in your language`}
                            >
                              <span>{tool}</span>
                              <Globe2 className="w-2.5 h-2.5 text-[#007AFF] opacity-70 group-hover/btn:scale-110" />
                            </button>
                          ))}
                          {worker.toolsMastered.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-[#8E8E93]">
                              +{worker.toolsMastered.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between mt-auto">
                      <div className="text-[11px] text-[#8E8E93]">
                        <span className="font-semibold text-[#1C1C1E] dark:text-white">{worker.experienceYears} yrs</span> exp
                      </div>
                      <button
                        onClick={(e) => handleConnectWorker(worker, e)}
                        className="px-3.5 py-1.5 rounded-full bg-[#007AFF] text-white text-xs font-semibold hover:bg-[#0071E3] active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Request Mentor</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {filteredWorkers.length === 0 && (
            <div className="p-12 text-center bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.08] dark:border-white/[0.12]">
              <Wrench className="w-8 h-8 text-[#8E8E93] mx-auto mb-2" />
              <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">No craftspeople match your criteria</h3>
              <p className="text-xs text-[#8E8E93] mt-1">Try resetting the trade category or language filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLanguage('All');
                  setSearchQuery('');
                  setSelectedWorkplace(null);
                }}
                className="mt-4 px-4 py-2 rounded-full bg-[#007AFF] text-white text-xs font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* DETAIL MODAL / BOTTOM SHEET (Apple iOS Sheet Style) */}
      {activeWorkerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-xl bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/10 dark:border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-black/[0.06] dark:border-white/[0.08] relative">
              <button
                onClick={() => {
                  setActiveWorkerModal(null);
                  setContactSuccess(null);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/[0.06] dark:bg-white/[0.1] text-[#8E8E93] hover:text-[#1C1C1E] dark:hover:text-white flex items-center justify-center text-sm font-semibold transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={activeWorkerModal.avatar}
                  alt={activeWorkerModal.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-black/10 dark:border-white/20 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                      {activeWorkerModal.tradeCategory}
                    </span>
                    <span className="text-xs text-[#34C759] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]"></span>
                      {activeWorkerModal.availability}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#1C1C1E] dark:text-white mt-1">
                    {activeWorkerModal.name}
                  </h2>
                  <p className="text-xs text-[#8E8E93]">{activeWorkerModal.role}</p>
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Workplace Info */}
              <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">Assigned Innovation Workplace</span>
                  <span className="text-xs font-mono text-[#007AFF]">Verified Bench</span>
                </div>
                <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#007AFF]" />
                  {activeWorkerModal.workplaceName}
                </h4>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Bench access & apprentice hours covered by GenWorks Studio Fellowship.
                </p>
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-1.5">About & Craftsmanship</h4>
                <p className="text-sm text-[#3C3C43] dark:text-[#EBEBF5] leading-relaxed">
                  {activeWorkerModal.bio}
                </p>
              </div>

              {/* Mentorship Languages */}
              {activeWorkerModal.languagesSpoken && activeWorkerModal.languagesSpoken.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#007AFF] mb-1.5 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Languages for Technical Mentorship</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeWorkerModal.languagesSpoken.map((lang, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20 flex items-center gap-1"
                      >
                        🌐 {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Credentials */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-2">Verified Badges & Accreditations</h4>
                <div className="flex flex-wrap gap-2">
                  {activeWorkerModal.verifiedBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#34C759]/10 text-[#34C759] dark:bg-[#34C759]/20 text-xs font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Machinery Mastered with Multilingual Learning CTAs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93]">
                    Tools & Machinery Mastered
                  </h4>
                  <span className="text-[10px] text-[#007AFF] font-medium flex items-center gap-1">
                    <Globe2 className="w-3 h-3" />
                    Click tool to learn in 8 languages
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeWorkerModal.toolsMastered.map((tool, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const targetId = mapToolNameToId(tool);
                        setSelectedLabToolId(targetId);
                        setActiveWorkerModal(null);
                        setViewMode('tool-lab');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-black/[0.04] dark:bg-white/[0.08] hover:bg-[#007AFF]/15 text-[#1C1C1E] dark:text-white hover:text-[#007AFF] transition-all flex items-center gap-1.5 border border-black/5 dark:border-white/10 group"
                    >
                      <span>{tool}</span>
                      <span className="text-[10px] text-[#007AFF] opacity-80 group-hover:underline">
                        Learn 🌐
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Active Projects */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] mb-2">Current Studio Builds</h4>
                <div className="space-y-1.5">
                  {activeWorkerModal.currentProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-xs font-medium text-[#1C1C1E] dark:text-white flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF]"></span>
                      {proj}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentorship request success notice */}
              {contactSuccess && (
                <div className="p-3.5 rounded-2xl bg-[#34C759]/15 border border-[#34C759]/30 text-[#34C759] text-xs font-medium flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{contactSuccess}</span>
                </div>
              )}
            </div>

            {/* Modal Bottom Action */}
            <div className="p-5 border-t border-black/[0.06] dark:border-white/[0.08] bg-black/[0.01] dark:bg-white/[0.02] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#8E8E93] block">Tuition Coverage</span>
                <span className="text-xs font-bold text-[#34C759]">100% Studio Sponsored</span>
              </div>
              <button
                onClick={() => {
                  setContactSuccess(`Request transmitted to ${activeWorkerModal.name}. You will be paired during your upcoming studio sprint!`);
                  setTimeout(() => {
                    setActiveWorkerModal(null);
                    setContactSuccess(null);
                  }, 2200);
                }}
                className="px-5 py-2.5 rounded-full bg-[#007AFF] text-white text-xs font-bold hover:bg-[#0071E3] active:scale-95 transition-all shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confirm Apprenticeship Pairing</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
