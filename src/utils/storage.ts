export interface UserProgress {
  score: number;
  completedMissions: string[];
  answeredQuestions: Record<string, { selectedOption: string; isCorrect: boolean }>;
  unlockedBadges: string[];
  savedExplorations: string[];
}

const STORAGE_KEY = 'geo_depth_progress_v1';

export function getSavedProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        score: 0,
        completedMissions: [],
        answeredQuestions: {},
        unlockedBadges: [],
        savedExplorations: [],
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      score: 0,
      completedMissions: [],
      answeredQuestions: {},
      unlockedBadges: [],
      savedExplorations: [],
    };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save progress to localStorage', err);
  }
}

export function resetProgress(): UserProgress {
  const fresh: UserProgress = {
    score: 0,
    completedMissions: [],
    answeredQuestions: {},
    unlockedBadges: [],
    savedExplorations: [],
  };
  saveProgress(fresh);
  return fresh;
}
