import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Customer {
  id: string;
  name: string;
  drink: string;
  patience: number;
  satisfaction: number;
  mood: 'happy' | 'neutral' | 'unhappy';
  type: 'regular' | 'vip' | 'cosmic';
  tip: number;
}

export interface Drink {
  name: string;
  ingredients: string[];
  brewTime: number;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
  price: number;
  unlockLevel: number;
}

export interface GameState {
  // Resources
  stardust: number;
  cosmicPoints: number;
  level: number;
  experience: number;
  
  // Game State
  customers: Customer[];
  brewingDrinks: {[key: string]: number};
  unlockedDrinks: string[];
  unlockedDecorations: string[];
  
  // Stats
  totalCustomersServed: number;
  totalTipsEarned: number;
  highestSatisfaction: number;
  
  // Actions
  addCustomer: (customer: Customer) => void;
  removeCustomer: (id: string) => void;
  startBrewing: (drink: Drink) => void;
  serveDrink: (customer: Customer, drink: Drink) => void;
  addStardust: (amount: number) => void;
  addCosmicPoints: (amount: number) => void;
  addExperience: (amount: number) => void;
  unlockDrink: (drinkName: string) => void;
  unlockDecoration: (decorationName: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Initial State
      stardust: 100,
      cosmicPoints: 0,
      level: 1,
      experience: 0,
      customers: [],
      brewingDrinks: {},
      unlockedDrinks: ['Stellar Brew', 'Nebula Nectar'],
      unlockedDecorations: [],
      totalCustomersServed: 0,
      totalTipsEarned: 0,
      highestSatisfaction: 0,

      // Actions
      addCustomer: (customer) => 
        set((state) => ({ customers: [...state.customers, customer] })),
      
      removeCustomer: (id) =>
        set((state) => ({ 
          customers: state.customers.filter(c => c.id !== id),
          totalCustomersServed: state.totalCustomersServed + 1
        })),
      
      startBrewing: (drink) =>
        set((state) => ({
          brewingDrinks: { ...state.brewingDrinks, [drink.name]: drink.brewTime },
          stardust: state.stardust - drink.price
        })),
      
      serveDrink: (customer, drink) =>
        set((state) => {
          const isCorrectDrink = customer.drink === drink.name;
          const satisfaction = isCorrectDrink ? 100 : 50;
          const tip = isCorrectDrink ? customer.tip : customer.tip / 2;
          const experience = isCorrectDrink ? 10 : 5;
          
          return {
            customers: state.customers.filter(c => c.id !== customer.id),
            brewingDrinks: { ...state.brewingDrinks, [drink.name]: 0 },
            stardust: state.stardust + tip,
            totalTipsEarned: state.totalTipsEarned + tip,
            experience: state.experience + experience,
            highestSatisfaction: Math.max(state.highestSatisfaction, satisfaction)
          };
        }),
      
      addStardust: (amount) =>
        set((state) => ({ stardust: state.stardust + amount })),
      
      addCosmicPoints: (amount) =>
        set((state) => ({ cosmicPoints: state.cosmicPoints + amount })),
      
      addExperience: (amount) =>
        set((state) => {
          const newExperience = state.experience + amount;
          const experienceNeeded = state.level * 100;
          
          if (newExperience >= experienceNeeded) {
            return {
              experience: newExperience - experienceNeeded,
              level: state.level + 1
            };
          }
          
          return { experience: newExperience };
        }),
      
      unlockDrink: (drinkName) =>
        set((state) => ({
          unlockedDrinks: [...state.unlockedDrinks, drinkName]
        })),
      
      unlockDecoration: (decorationName) =>
        set((state) => ({
          unlockedDecorations: [...state.unlockedDecorations, decorationName]
        }))
    }),
    {
      name: 'celestial-cafe-storage'
    }
  )
); 