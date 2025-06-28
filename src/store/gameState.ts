import { create } from 'zustand';
import { GameProgress } from '../services/firebase';

export interface GameState {
  // Player State
  level: number;
  experience: number;
  currency: number;
  unlockedRecipes: string[];
  achievements: string[];
  specialization: {
    id: string;
    name: string;
    bonus: number;
  } | null;
  
  // Game Settings
  isMuted: boolean;
  isPaused: boolean;
  currentScreen: string;
  
  // Actions
  setLevel: (level: number) => void;
  addExperience: (amount: number) => void;
  addCurrency: (amount: number) => void;
  unlockRecipe: (recipeId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  setSpecialization: (specialization: { id: string; name: string; bonus: number }) => void;
  toggleMute: () => void;
  togglePause: () => void;
  setCurrentScreen: (screen: string) => void;
  loadGameProgress: (progress: GameProgress) => void;
  resetGame: () => void;
}

const initialState = {
  level: 1,
  experience: 0,
  currency: 0,
  unlockedRecipes: [],
  achievements: [],
  specialization: null,
  isMuted: false,
  isPaused: false,
  currentScreen: 'specialization',
};

export const useGameState = create<GameState>()((set) => ({
  ...initialState,

  setLevel: (level: number) => set({ level }),
  
  addExperience: (amount: number) => set((state: GameState) => {
    const newExperience = state.experience + amount;
    const experienceToNextLevel = state.level * 1000;
    
    if (newExperience >= experienceToNextLevel) {
      return {
        level: state.level + 1,
        experience: newExperience - experienceToNextLevel,
      };
    }
    
    return { experience: newExperience };
  }),
  
  addCurrency: (amount: number) => set((state: GameState) => ({
    currency: state.currency + amount,
  })),
  
  unlockRecipe: (recipeId: string) => set((state: GameState) => ({
    unlockedRecipes: [...state.unlockedRecipes, recipeId],
  })),
  
  unlockAchievement: (achievementId: string) => set((state: GameState) => ({
    achievements: [...state.achievements, achievementId],
  })),
  
  setSpecialization: (specialization) => set({ specialization }),
  
  toggleMute: () => set((state: GameState) => ({
    isMuted: !state.isMuted,
  })),
  
  togglePause: () => set((state: GameState) => ({
    isPaused: !state.isPaused,
  })),
  
  setCurrentScreen: (screen: string) => set({
    currentScreen: screen,
  }),
  
  loadGameProgress: (progress: GameProgress) => set({
    level: progress.level,
    experience: progress.experience,
    currency: progress.currency,
    unlockedRecipes: progress.unlockedRecipes,
    achievements: progress.achievements,
  }),
  
  resetGame: () => set(initialState),
}));
