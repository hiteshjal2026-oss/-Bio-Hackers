import React, { useState } from 'react';
import { EquipmentTool, SkilledWorker, Workplace } from '../../types';
import { SUPPORTED_LANGUAGES, MULTILINGUAL_TOOLS, SupportedLanguage } from '../../data/multilingualToolsData';
import {
  Globe2,
  Volume2,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  BookOpen,
  HelpCircle,
  Users,
  Sparkles,
  Layers,
  ArrowRight,
  Printer,
  RotateCcw,
  Check
} from 'lucide-react';

interface MultilingualToolLabProps {
  workers: SkilledWorker[];
  workplaces: Workplace[];
  onSelectWorker?: (worker: SkilledWorker) => void;
  initialToolId?: string;
  initialLangCode?: string;
}

export const MultilingualToolLab: React.FC<MultilingualToolLabProps> = ({
  workers,
  workplaces,
  onSelectWorker,
  initialToolId,
  initialLangCode = 'es',
}) => {
  const [selectedLangCode, setSelectedLangCode] = useState<string>(initialLangCode);
  const [selectedToolId, setSelectedToolId] = useState<string>(initialToolId || MULTILINGUAL_TOOLS[0].id);
  const [bilingualMode, setBilingualMode] = useState<boolean>(true);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [speakingTerm, setSpeakingTerm] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, number[]>>({});

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[0];
  const currentTool = MULTILINGUAL_TOOLS.find((t) => t.id === selectedToolId) || MULTILINGUAL_TOOLS[0];
  
  // Safe language content fallback to English if not present
  const langContent = currentTool.translations[selectedLangCode] || currentTool.translations['en'];
  const englishContent = currentTool.translations['en'];

  // Associated workers for this tool
  const toolMentors = workers.filter((w) => currentTool.associatedWorkerIds.includes(w.id));

  // Audio Pronunciation using browser Web Speech API
  const speakTerm = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const targetLang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
      if (targetLang) {
        utterance.lang = targetLang.speechCode;
      }
      utterance.rate = 0.9;
      setSpeakingTerm(text);
      utterance.onend = () => setSpeakingTerm(null);
      utterance.onerror = () => setSpeakingTerm(null);
      window.speechSynthesis.speak(utterance);
    } else {
      setSpeakingTerm(text);
      setTimeout(() => setSpeakingTerm(null), 1500);
    }
  };

  const toggleStep = (stepNum: number) => {
    const key = `${currentTool.id}-${selectedLangCode}`;
    const current = completedSteps[key] || [];
    if (current.includes(stepNum)) {
      setCompletedSteps({ ...completedSteps, [key]: current.filter((s) => s !== stepNum) });
    } else {
      setCompletedSteps({ ...completedSteps, [key]: [...current, stepNum] });
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Feature Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#007AFF]/10 via-[#AF52DE]/5 to-white dark:to-[#1C1C1E] border border-[#007AFF]/20 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF] text-white text-xs font-semibold mb-2">
              <Globe2 className="w-3.5 h-3.5" />
              <span>International Apprentice Program • 8 Languages</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] dark:text-white tracking-tight">
              Multilingual Tool Learning Lab
            </h2>
            <p className="text-xs sm:text-sm text-[#8E8E93] max-w-2xl mt-1 leading-relaxed">
              Master precision machinery, industrial robotics, and laboratory instruments in your native language. Includes native audio pronunciation, ISO/DIN safety protocols, and step-by-step workbench quickstarts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBilingualMode(!bilingualMode)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-2 shadow-sm ${
                bilingualMode
                  ? 'bg-[#007AFF] text-white border-transparent'
                  : 'bg-white dark:bg-[#2C2C2E] text-[#1C1C1E] dark:text-white border-black/10 dark:border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{bilingualMode ? 'Bilingual Mode (Active)' : 'Native View Only'}</span>
            </button>
            <button
              onClick={handlePrintCard}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#2C2C2E] border border-black/10 dark:border-white/10 text-[#1C1C1E] dark:text-white text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Print Workbench Study Card"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* LANGUAGE SELECTOR BAR - iOS Segmented Bar with Flags */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-[#007AFF]" />
            Choose Language for Tool Guides & Terminology
          </span>
          <span className="text-xs text-[#007AFF] font-medium">
            Active: {currentLang.flag} {currentLang.nativeName} ({currentLang.name})
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === selectedLangCode;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLangCode(lang.code);
                  setSelectedQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-[#1C1C1E] text-white dark:bg-white dark:text-[#1C1C1E] border-transparent shadow-md scale-105'
                    : 'bg-white dark:bg-[#1C1C1E] text-[#8E8E93] border-black/[0.06] dark:border-white/[0.08] hover:text-[#1C1C1E] dark:hover:text-white'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.nativeName}</span>
                <span className="text-[10px] opacity-60">({lang.code.toUpperCase()})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOOL SELECTION TABS */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#FF9500]" />
            Featured Workshop Instruments & Machinery
          </span>
          <span className="text-xs text-[#8E8E93]">Select a tool to explore localized curriculum</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MULTILINGUAL_TOOLS.map((tool) => {
            const isSelected = tool.id === selectedToolId;
            const toolTranslation = tool.translations[selectedLangCode] || tool.translations['en'];
            return (
              <div
                key={tool.id}
                onClick={() => {
                  setSelectedToolId(tool.id);
                  setSelectedQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className={`cursor-pointer rounded-2xl p-3.5 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-[#1C1C1E] border-[#007AFF] ring-2 ring-[#007AFF]/20 shadow-md'
                    : 'bg-white/80 dark:bg-[#1C1C1E]/80 border-black/[0.08] dark:border-white/[0.1] hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-[#007AFF] block truncate">
                      {tool.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#1C1C1E] dark:text-white line-clamp-1">
                      {toolTranslation.localizedName}
                    </h4>
                    <p className="text-[10px] text-[#8E8E93] truncate">{tool.name}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/[0.06] text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[#8E8E93] font-medium">
                    {tool.difficulty}
                  </span>
                  <span className="text-[#007AFF] font-semibold flex items-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED TOOL DETAILS IN CHOSEN LANGUAGE */}
      <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl border border-black/[0.08] dark:border-white/[0.12] p-6 sm:p-8 shadow-sm space-y-8">
        {/* Main Title & Pronunciation Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF]">
                {currentTool.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#34C759]/15 text-[#34C759] flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Verified in {currentLang.nativeName}</span>
              </span>
              <span className="text-xs text-[#8E8E93]">{currentLang.flag} {currentLang.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1C1C1E] dark:text-white">
                {langContent.localizedName}
              </h1>
              <button
                onClick={() => speakTerm(langContent.localizedName, selectedLangCode)}
                className={`p-2 rounded-full border transition-all ${
                  speakingTerm === langContent.localizedName
                    ? 'bg-[#007AFF] text-white border-transparent scale-110 animate-pulse'
                    : 'bg-black/5 dark:bg-white/10 text-[#007AFF] hover:bg-[#007AFF]/15 border-transparent'
                }`}
                title={`Listen in ${currentLang.nativeName}`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Bilingual Subtitle when active */}
            {bilingualMode && selectedLangCode !== 'en' && (
              <p className="text-xs text-[#8E8E93] font-mono italic">
                English Original: {englishContent.localizedName}
              </p>
            )}

            <p className="text-sm font-semibold text-[#007AFF]">
              {langContent.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#3C3C43] dark:text-[#D1D1D6] leading-relaxed">
              {langContent.overview}
            </p>
          </div>

          <div className="w-full md:w-56 shrink-0 space-y-3">
            <img
              src={currentTool.image}
              alt={currentTool.name}
              className="w-full h-36 rounded-2xl object-cover border border-black/10 dark:border-white/15 shadow-inner"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/[0.04] text-[11px] text-[#8E8E93] space-y-1">
              <div className="flex justify-between">
                <span>Certification Level:</span>
                <span className="font-bold text-[#1C1C1E] dark:text-white">{currentTool.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span>Lab Access:</span>
                <span className="font-bold text-[#34C759]">Open for Apprentices</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN SECTION: SAFETY PROTOCOLS & HANDS-ON WORKBENCH QUICKSTART */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Safety Protocols in Target Language */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#FF9500]/5 dark:bg-[#FF9500]/10 border border-[#FF9500]/20 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FF9500] text-white flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                  Workshop Safety Rules ({currentLang.nativeName})
                </h3>
                <p className="text-[11px] text-[#8E8E93]">ISO 13849 & OSHA compliant procedures</p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {langContent.safetyProtocols.map((protocol, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#3C3C43] dark:text-[#EBEBF5]">
                  <span className="w-5 h-5 rounded-full bg-[#FF9500]/20 text-[#FF9500] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span>{protocol}</span>
                    {bilingualMode && selectedLangCode !== 'en' && (
                      <p className="text-[10px] text-[#8E8E93] font-mono mt-0.5">
                        EN: {englishContent.safetyProtocols[idx] || ''}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Hands-On Quickstart Guide */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#007AFF]/5 dark:bg-[#007AFF]/10 border border-[#007AFF]/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center shadow-sm">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                    Workbench Quickstart Procedure
                  </h3>
                  <p className="text-[11px] text-[#8E8E93]">Step-by-step checklist in {currentLang.nativeName}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#007AFF] bg-[#007AFF]/10 px-2.5 py-1 rounded-full">
                Interactive Check
              </span>
            </div>

            <div className="space-y-2.5">
              {langContent.quickstartSteps.map((step) => {
                const stepKey = `${currentTool.id}-${selectedLangCode}`;
                const isDone = (completedSteps[stepKey] || []).includes(step.step);
                return (
                  <div
                    key={step.step}
                    onClick={() => toggleStep(step.step)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isDone
                        ? 'bg-[#34C759]/10 border-[#34C759]/30 text-[#1C1C1E] dark:text-white'
                        : 'bg-white dark:bg-[#1C1C1E] border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/30'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isDone ? 'bg-[#34C759] text-white' : 'border border-[#8E8E93] text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1C1C1E] dark:text-white">
                          Passo {step.step}: {step.title}
                        </span>
                        {isDone && <span className="text-[10px] font-bold text-[#34C759]">Done</span>}
                      </div>
                      <p className="text-[11px] text-[#3C3C43] dark:text-[#D1D1D6] mt-0.5">
                        {step.desc}
                      </p>
                      {bilingualMode && selectedLangCode !== 'en' && (
                        <p className="text-[10px] text-[#8E8E93] font-mono mt-1">
                          EN: {englishContent.quickstartSteps[step.step - 1]?.desc || ''}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TECHNICAL GLOSSARY & AUDIO PRONUNCIATION */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#007AFF]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white">
                Technical Vocabulary & Native Audio ({currentLang.nativeName})
              </h3>
            </div>
            <span className="text-xs text-[#8E8E93]">Tap any speaker icon to hear pronunciation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {langContent.glossary.map((item, idx) => {
              const isSpeaking = speakingTerm === item.translation;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] flex flex-col justify-between space-y-2 hover:border-[#007AFF]/30 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-mono font-semibold text-[#8E8E93] block uppercase">
                          EN: {item.term}
                        </span>
                        <h4 className="text-sm font-extrabold text-[#1C1C1E] dark:text-white">
                          {item.translation}
                        </h4>
                        <span className="text-[11px] font-mono text-[#007AFF] block">
                          [{item.phonetic}]
                        </span>
                      </div>
                      <button
                        onClick={() => speakTerm(item.translation, selectedLangCode)}
                        className={`p-2 rounded-xl transition-all ${
                          isSpeaking
                            ? 'bg-[#007AFF] text-white scale-110 shadow-sm'
                            : 'bg-black/5 dark:bg-white/10 text-[#007AFF] hover:bg-[#007AFF]/20'
                        }`}
                        title="Listen pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#3C3C43] dark:text-[#D1D1D6] mt-2 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INTERACTIVE OPERATOR KNOWLEDGE CHECK (QUIZ IN CHOSEN LANGUAGE) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#AF52DE]/5 to-[#007AFF]/5 border border-[#AF52DE]/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#AF52DE] text-white flex items-center justify-center shadow-sm">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
                  Machine Operator Comprehension Check ({currentLang.nativeName})
                </h3>
                <p className="text-[11px] text-[#8E8E93]">Test your understanding of tool operation in {currentLang.name}</p>
              </div>
            </div>
            {quizSubmitted && (
              <button
                onClick={() => {
                  setSelectedQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className="text-xs font-semibold text-[#007AFF] flex items-center gap-1 hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Question</span>
              </button>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#2C2C2E] border border-black/5 dark:border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white">
              {langContent.quizQuestion.question}
            </h4>

            <div className="space-y-2">
              {langContent.quizQuestion.options.map((option, idx) => {
                const isSelected = selectedQuizAnswer === idx;
                const isCorrect = idx === langContent.quizQuestion.correctIndex;
                let optStyle = 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5';
                if (quizSubmitted) {
                  if (isCorrect) {
                    optStyle = 'border-[#34C759] bg-[#34C759]/15 text-[#34C759] font-bold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'border-[#FF3B30] bg-[#FF3B30]/15 text-[#FF3B30]';
                  }
                } else if (isSelected) {
                  optStyle = 'border-[#007AFF] bg-[#007AFF]/10 text-[#007AFF] font-semibold';
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuizAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${optStyle}`}
                  >
                    <span>{option}</span>
                    {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#34C759]" />}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                disabled={selectedQuizAnswer === null}
                onClick={() => setQuizSubmitted(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedQuizAnswer !== null
                    ? 'bg-[#007AFF] text-white hover:bg-[#0071E3] shadow-sm'
                    : 'bg-black/10 dark:bg-white/10 text-[#8E8E93] cursor-not-allowed'
                }`}
              >
                Submit Operator Answer
              </button>
            ) : (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
                  selectedQuizAnswer === langContent.quizQuestion.correctIndex
                    ? 'bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/30'
                    : 'bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    {selectedQuizAnswer === langContent.quizQuestion.correctIndex ? 'Correct! ' : 'Incorrect: '}
                  </span>
                  <span>{langContent.quizQuestion.explanation}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MENTORS WHO SPECIALIZE IN THIS TOOL & THEIR LANGUAGES */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#007AFF]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1C1E] dark:text-white">
                Master Artisans Teaching This Tool
              </h3>
            </div>
            <span className="text-xs text-[#8E8E93]">Pair with a mentor who speaks your language</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolMentors.map((mentor) => (
              <div
                key={mentor.id}
                onClick={() => onSelectWorker && onSelectWorker(mentor)}
                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.08] hover:border-[#007AFF]/40 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-xl object-cover border border-black/10 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#1C1C1E] dark:text-white truncate">
                      {mentor.name}
                    </h4>
                    <p className="text-xs text-[#8E8E93] truncate">{mentor.role}</p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {mentor.languagesSpoken.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#007AFF]/10 text-[#007AFF]"
                        >
                          🌐 {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="px-3 py-1.5 rounded-full bg-[#007AFF] text-white text-xs font-semibold hover:bg-[#0071E3] shrink-0 ml-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectWorker) onSelectWorker(mentor);
                  }}
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
