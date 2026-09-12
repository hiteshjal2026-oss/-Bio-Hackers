import React, { useState } from 'react';
import { StudentBuilder } from '../../types';
import { Sparkles, Users, Search, ExternalLink, Code2, Cpu, Hammer, Rocket } from 'lucide-react';

interface StudentsViewProps {
  students: StudentBuilder[];
}

export const StudentsView: React.FC<StudentsViewProps> = ({ students }) => {
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = ['All', 'Hardware Systems', 'Creative & Brand', 'Research & Insight', 'Growth & Operations'];

  const filtered = students.filter((s) => {
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.currentProject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTrack && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9500]/10 text-[#FF9500] text-xs font-semibold tracking-wide uppercase mb-2">
            <Users className="w-3.5 h-3.5" />
            Active Builder Cohort
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1E] dark:text-white">
            Student Builders & Projects
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E93] max-w-2xl mt-1">
            Meet the fellows building visible hardware and software artifacts inside GenWorks studio sprints.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tracks.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTrack(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTrack === t
                  ? 'bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E] shadow-sm'
                  : 'bg-white dark:bg-[#1C1C1E] text-[#8E8E93] border border-black/[0.06] dark:border-white/[0.08]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((student) => (
          <div
            key={student.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#1C1C1E] border border-black/[0.08] dark:border-white/[0.12] shadow-sm flex flex-col justify-between hover:border-[#007AFF]/40 transition-all space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-13 h-13 rounded-2xl object-cover border border-black/5 dark:border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-base font-bold text-[#1C1C1E] dark:text-white">
                      {student.name}
                    </h3>
                    <p className="text-xs text-[#8E8E93]">{student.title}</p>
                    <span className="text-[10px] font-mono text-[#007AFF] uppercase">
                      {student.cohort}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  student.status === 'Shipping v1.0'
                    ? 'bg-[#34C759]/15 text-[#34C759]'
                    : student.status === 'In Prototyping'
                    ? 'bg-[#007AFF]/15 text-[#007AFF]'
                    : 'bg-[#FF9500]/15 text-[#FF9500]'
                }`}>
                  {student.status}
                </span>
              </div>

              {/* Project Card */}
              <div className="mt-4 p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1C1E] dark:text-white truncate">
                    {student.currentProject}
                  </span>
                </div>
                <p className="text-xs text-[#3C3C43]/90 dark:text-[#EBEBF5]/90 leading-relaxed">
                  {student.projectSnippet}
                </p>
                <div className="relative h-28 rounded-xl overflow-hidden mt-2">
                  <img
                    src={student.image}
                    alt={student.currentProject}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {student.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/[0.04] dark:bg-white/[0.06] text-[#8E8E93]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <span className="text-xs font-semibold text-[#007AFF] hover:underline cursor-pointer">
                View Spec ↗
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
