import { useState, useEffect } from 'react';
import { PageId } from '../types/satellite';
import { MISSIONS, ACHIEVEMENTS } from '../data/quizData';
import { getSavedProgress, saveProgress, resetProgress, UserProgress } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Compass,
  Radio,
  Layers,
  Cpu,
  Globe,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface MissionCenterPageProps {
  onNavigate: (page: PageId, targetId?: string) => void;
  onOpenEarthGuide: () => void;
}

export function MissionCenterPage({ onNavigate, onOpenEarthGuide }: MissionCenterPageProps) {
  const [userProgress, setUserProgress] = useState<UserProgress>(getSavedProgress());
  const [activeMissionId, setActiveMissionId] = useState<'m1' | 'm2' | 'm3' | 'm4'>('m1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);
  const [justUnlockedBadge, setJustUnlockedBadge] = useState<string | null>(null);

  const activeMission = MISSIONS.find((m) => m.id === activeMissionId) || MISSIONS[0];
  const currentQuestion = activeMission.questions[currentQuestionIndex];

  // Helper icons lookup
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio':
        return <Radio className="w-5 h-5 text-[#39D5F2]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#61DDAA]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#6C9EFF]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-amber-400" />;
      default:
        return <Globe className="w-5 h-5 text-white" />;
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (showAnswerFeedback) return;
    setSelectedOptionId(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return;

    const chosenOption = currentQuestion.options.find((o) => o.id === selectedOptionId);
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    // Update progress state
    const updatedAnswered = {
      ...userProgress.answeredQuestions,
      [currentQuestion.id]: { selectedOption: selectedOptionId, isCorrect },
    };

    let newScore = userProgress.score;
    if (isCorrect) {
      newScore += 100;
    }

    const updatedUnlocked = [...userProgress.unlockedBadges];

    // First Discovery badge unlock
    if (!updatedUnlocked.includes('first-discovery')) {
      updatedUnlocked.push('first-discovery');
      setJustUnlockedBadge('First Discovery');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    }

    const nextState: UserProgress = {
      ...userProgress,
      score: newScore,
      answeredQuestions: updatedAnswered,
      unlockedBadges: updatedUnlocked,
    };

    setUserProgress(nextState);
    saveProgress(nextState);
    setShowAnswerFeedback(true);
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setShowAnswerFeedback(false);

    if (currentQuestionIndex < activeMission.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed current mission!
      const updatedMissions = Array.from(new Set([...userProgress.completedMissions, activeMission.id]));
      const updatedBadges = [...userProgress.unlockedBadges];

      if (!updatedBadges.includes(activeMission.badgeId)) {
        updatedBadges.push(activeMission.badgeId);
        setJustUnlockedBadge(activeMission.badgeName);
      }

      // Check if all 4 missions complete for Earth Explorer badge
      if (updatedMissions.length === 4 && !updatedBadges.includes('earth-explorer')) {
        updatedBadges.push('earth-explorer');
        setJustUnlockedBadge('Earth Explorer (All Missions Complete!)');
      }

      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });

      const finalState: UserProgress = {
        ...userProgress,
        completedMissions: updatedMissions,
        unlockedBadges: updatedBadges,
      };
      setUserProgress(finalState);
      saveProgress(finalState);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all mission progress and achievements?')) {
      const fresh = resetProgress();
      setUserProgress(fresh);
      setCurrentQuestionIndex(0);
      setSelectedOptionId(null);
      setShowAnswerFeedback(false);
      setJustUnlockedBadge(null);
    }
  };

  const isMissionCompleted = userProgress.completedMissions.includes(activeMission.id);
  const answeredCountForMission = activeMission.questions.filter(
    (q) => userProgress.answeredQuestions[q.id]
  ).length;

  return (
    <div className="w-full flex flex-col space-y-12 pb-20">
      {/* 1. Header & Scoreboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2B48]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>INTERACTIVE FLIGHT ACADEMY</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              YOUR JOURNEY AS AN EARTH EXPLORER STARTS HERE.
            </h1>
            <p className="text-sm text-[#A0AEC0] max-w-2xl leading-relaxed">
              Investigate authentic radar observations, solve environmental mysteries, and test your comprehension of satellite remote sensing.
            </p>
          </div>

          {/* User Score & Badge Strip */}
          <div className="flex items-center gap-4 bg-[#080F20] p-3 rounded-xl border border-[#1C2B48]">
            <div className="text-center px-3 border-r border-[#1C2B48]">
              <div className="text-[10px] font-mono text-[#A0AEC0] uppercase">SCORE</div>
              <div className="text-2xl font-mono font-bold text-[#39D5F2] tabular-nums">
                {userProgress.score}
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-[10px] font-mono text-[#A0AEC0] uppercase">BADGES</div>
              <div className="text-2xl font-mono font-bold text-[#61DDAA] tabular-nums">
                {userProgress.unlockedBadges.length} / {ACHIEVEMENTS.length}
              </div>
            </div>
            <button
              onClick={handleResetAll}
              className="p-2 rounded-lg text-[#A0AEC0] hover:text-white hover:bg-[#101B30] border border-transparent hover:border-[#1C2B48] transition-colors cursor-pointer"
              title="Reset progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Just Unlocked Toast Banner */}
      {justUnlockedBadge && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="p-4 rounded-xl bg-[#101B30] border border-[#61DDAA] flex items-center justify-between shadow-lg animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#61DDAA]/20 border border-[#61DDAA] flex items-center justify-center text-[#61DDAA]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#61DDAA] uppercase font-bold">
                  New Achievement Unlocked!
                </span>
                <div className="font-display font-semibold text-white text-sm">
                  {justUnlockedBadge}
                </div>
              </div>
            </div>
            <button
              onClick={() => setJustUnlockedBadge(null)}
              className="text-xs text-[#A0AEC0] hover:text-white cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 2. Mission Selector Horizontal Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MISSIONS.map((mission) => {
            const isSelected = mission.id === activeMission.id;
            const isDone = userProgress.completedMissions.includes(mission.id);

            return (
              <button
                key={mission.id}
                onClick={() => {
                  setActiveMissionId(mission.id);
                  setCurrentQuestionIndex(0);
                  setSelectedOptionId(null);
                  setShowAnswerFeedback(false);
                }}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#101B30] border-[#39D5F2] shadow-[0_0_15px_rgba(57,213,242,0.15)]'
                    : 'bg-[#080F20] border-[#1C2B48] hover:border-[#39D5F2]/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#39D5F2] font-bold">MISSION {mission.number}</span>
                    <span className="text-[#A0AEC0]">{mission.difficulty}</span>
                  </div>
                  <h3 className="font-display font-semibold text-sm text-white line-clamp-2">
                    {mission.title}
                  </h3>
                  <p className="text-[11px] text-[#A0AEC0] line-clamp-2">
                    {mission.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1C2B48]/60 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    {getBadgeIcon(mission.badgeIcon)}
                    <span className="text-[11px] text-white">{mission.badgeName}</span>
                  </div>
                  {isDone ? (
                    <span className="text-[#61DDAA] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Done</span>
                    </span>
                  ) : (
                    <span className="text-[#A0AEC0]">
                      {answeredCountForMission}/{mission.questions.length}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Mission Investigation Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Question Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 rounded-2xl bg-[#080F20] border border-[#1C2B48] shadow-2xl space-y-6">
              {/* Question header info */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#39D5F2]">
                  <span>MISSION {activeMission.number}</span>
                  <span>·</span>
                  <span>QUESTION {currentQuestionIndex + 1} OF {activeMission.questions.length}</span>
                </div>
                <div className="text-xs font-mono text-[#61DDAA]">+100 PTS</div>
              </div>

              {/* Question text */}
              <div className="space-y-2">
                <h3 className="font-display font-semibold text-xl text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>
                {currentQuestion.context && (
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                    {currentQuestion.context}
                  </p>
                )}
              </div>

              {/* Options list */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optionStyles = 'bg-[#050B18] border-[#1C2B48] text-[#F5F8FF] hover:border-[#39D5F2]';

                  if (showAnswerFeedback) {
                    if (opt.isCorrect) {
                      optionStyles = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    } else if (isSelected && !opt.isCorrect) {
                      optionStyles = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-[#101B30] border-[#39D5F2] text-white shadow-md';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      disabled={showAnswerFeedback}
                      className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-[#101B30] border border-[#1C2B48] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="text-sm leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Submit or Next Question Action Bar */}
              <div className="pt-4 border-t border-[#1C2B48] flex items-center justify-between">
                <div className="text-xs text-[#A0AEC0]">
                  {showAnswerFeedback ? 'Scientific validation completed' : 'Select your answer and submit'}
                </div>

                {!showAnswerFeedback ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOptionId}
                    className="px-6 py-2.5 rounded-lg bg-[#39D5F2] text-[#050B18] font-bold text-xs hover:bg-[#2dc0dc] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Submit Investigation
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-lg bg-[#61DDAA] text-[#050B18] font-bold text-xs hover:bg-[#52c696] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentQuestionIndex < activeMission.questions.length - 1 ? 'Next Question' : 'Complete Mission'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Feedback explanation box */}
              {showAnswerFeedback && (
                <div className="p-4 rounded-xl bg-[#050B18] border border-[#1C2B48] space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold">
                    {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>CORRECT ANALYSIS (+100 PTS)</span>
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        <span>INCORRECT INTERPRETATION</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#A0AEC0] leading-relaxed">
                    <strong className="text-white">Scientific Rationale:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Earth Explorer Passport & Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-[#080F20] border border-[#1C2B48] shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#1C2B48]">
                <div className="flex items-center gap-2 text-xs font-mono text-[#39D5F2] uppercase font-bold">
                  <Award className="w-4 h-4" />
                  <span>EARTH EXPLORER PASSPORT</span>
                </div>
                <span className="text-[11px] font-mono text-[#A0AEC0]">Local Storage</span>
              </div>

              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                Complete radar analysis missions to unlock your official remote sensing credentials:
              </p>

              {/* Badge List */}
              <div className="space-y-3">
                {ACHIEVEMENTS.map((ach) => {
                  const isUnlocked = userProgress.unlockedBadges.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        isUnlocked
                          ? 'bg-[#101B30] border-[#39D5F2]/60 text-white'
                          : 'bg-[#050B18] border-[#1C2B48] opacity-50'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isUnlocked ? 'bg-[#050B18] border border-[#39D5F2]' : 'bg-[#0e182e]'
                        }`}
                      >
                        {getBadgeIcon(ach.icon)}
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-display font-semibold flex items-center gap-1.5">
                          <span>{ach.title}</span>
                          {isUnlocked && <CheckCircle2 className="w-3 h-3 text-[#61DDAA]" />}
                        </div>
                        <p className="text-[11px] text-[#A0AEC0] leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Direct Link to SAR Explorer for brushing up */}
              <div className="pt-3 border-t border-[#1C2B48] flex items-center justify-between">
                <span className="text-xs text-[#A0AEC0]">Need a refresher?</span>
                <button
                  onClick={() => onNavigate('sar-explorer')}
                  className="text-xs font-semibold text-[#39D5F2] hover:underline cursor-pointer"
                >
                  Review SAR Explorer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
